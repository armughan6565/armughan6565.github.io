import "server-only";
import type { ContactInput } from "./contact-schema";

/**
 * Delivery adapter for contact enquiries. Swap the body of `deliverEnquiry`
 * for an email provider SDK (Resend, Postmark, SES, SendGrid…) or a CRM call.
 *
 * Configuration (server-side env only — never NEXT_PUBLIC_):
 *   CONTACT_WEBHOOK_URL    — endpoint that receives the enquiry as JSON
 *   CONTACT_WEBHOOK_TOKEN  — optional bearer token for that endpoint
 */
export class DeliveryNotConfiguredError extends Error {}

export async function deliverEnquiry(enquiry: Omit<ContactInput, "website" | "startedAt">) {
  const url = process.env.CONTACT_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No CONTACT_WEBHOOK_URL set — enquiry logged in development only:", enquiry);
      return;
    }
    // Refuse rather than silently dropping enquiries in production
    throw new DeliveryNotConfiguredError("Contact delivery is not configured");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_TOKEN && { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }),
    },
    body: JSON.stringify({ ...enquiry, receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Delivery failed with status ${res.status}`);
}
