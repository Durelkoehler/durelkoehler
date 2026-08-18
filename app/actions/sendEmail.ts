"use server";

import { Resend } from "resend";

type Payload = {
  email: string;
  message: string;
};

/**
 * Server Action: sendEmail
 * - Uses the Resend SDK to send an email server-side.
 * - Returns { success: boolean, error?: string }
 *
 * Notes:
 * - Ensure RESEND_API_KEY is set in `.env.local`.
 * - In local development the `from` address uses onboarding@resend.dev
 */
export async function sendEmail(
  payload: Payload,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { email, message } = payload;

    if (!email || !message) {
      return { success: false, error: "Missing fields" };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { success: false, error: "Missing RESEND_API_KEY env var" };
    }

    const resend = new Resend(apiKey);

    const from =
      process.env.EMAIL_FROM || "Durel Koehler <onboarding@resend.dev>";
    const to = process.env.EMAIL_TO || "durelkoehler26@gmail.com";

    const subject = `New contact request from ${email}`;
    const text = `From: ${email}\n\nMessage:\n${message}`;
    const html = `
      <div>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div>${String(message).replace(/\n/g, "<br />")}</div>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err || "Unexpected error");
    console.error("sendEmail error", err);
    return { success: false, error: message };
  }
}
