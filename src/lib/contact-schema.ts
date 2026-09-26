import * as z from "zod/mini";
import { services } from "@/content/services";

/**
 * Shared by the form (client-side UX) and the API route (the actual gate).
 * Uses zod/mini: same validation, far smaller client bundle than full zod.
 */

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "not-sure", label: "Not sure yet" },
];

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

const text = (min: number, max: number, minMsg: string, maxMsg: string) =>
  z.string(minMsg).check(z.trim(), z.minLength(min, minMsg), z.maxLength(max, maxMsg));

export const contactSchema = z.object({
  intent: z.enum(["consultation", "project"]),
  name: text(2, 100, "Please enter your name.", "Name is too long."),
  company: text(1, 150, "Please enter your company or organization.", "Company name is too long."),
  email: z.email("Please enter a valid work email.").check(z.maxLength(200, "Email is too long.")),
  phone: z
    .string()
    .check(
      z.trim(),
      z.maxLength(30, "Phone number is too long."),
      z.regex(/^$|^[+()\d\s.-]{6,30}$/, "Please enter a valid phone number, or leave it blank."),
    ),
  country: text(2, 80, "Please select your country.", "Country name is too long."),
  service: z.enum(serviceValues, "Please choose a service, or “Not sure yet”."),
  message: text(
    20,
    4000,
    "Please add a little more detail (at least 20 characters).",
    "Please keep your message under 4,000 characters.",
  ),
  // Spam protection — not shown to people
  website: z._default(z.string().check(z.maxLength(0)), ""),
  startedAt: z.coerce.number().check(z.positive()),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
