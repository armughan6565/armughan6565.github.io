/**
 * Contact API route, parked outside `src/app` so it is NOT part of the static
 * (GitHub Pages) export — static hosting cannot run server code.
 *
 * To restore on a Node host (Vercel, Netlify, a container…):
 *   1. move this file back to `src/app/api/contact/route.ts`
 *   2. remove `output: "export"` from next.config.ts
 *   3. build with NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact and set CONTACT_WEBHOOK_URL
 */
import { flattenError } from "zod/mini";
import { contactSchema } from "@/lib/contact-schema";
import { deliverEnquiry, DeliveryNotConfiguredError } from "@/lib/contact-delivery";

const MIN_FILL_MS = 3000; // humans don't complete this form in under 3s
const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

// ponytail: in-memory rate limit is per server instance and resets on deploy;
// move to Redis/Upstash or a platform WAF rule if abuse appears.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear(); // bound memory
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  // Same-origin only: reject cross-site form posts
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return json({ ok: false, error: "Invalid origin." }, 403);
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many requests. Please try again later." }, 429);
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    // Honeypot filled → pretend success so bots learn nothing
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return json({ ok: true });
    return json({ ok: false, error: "Please check the highlighted fields.", fields: flattenError(parsed.error).fieldErrors }, 422);
  }

  // Explicit allow-list of what gets forwarded (drops honeypot + timing fields)
  const { intent, name, company, email, phone, country, service, message, startedAt } = parsed.data;
  const enquiry = { intent, name, company, email, phone, country, service, message };
  if (Date.now() - startedAt < MIN_FILL_MS) return json({ ok: true });

  try {
    await deliverEnquiry(enquiry);
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    const status = err instanceof DeliveryNotConfiguredError ? 503 : 502;
    return json({ ok: false, error: "We couldn't send your message just now. Please try again or email us directly." }, status);
  }
}
