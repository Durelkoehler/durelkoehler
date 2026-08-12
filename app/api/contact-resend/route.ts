import { NextResponse } from "next/server";
import { sendEmail } from "../../actions/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, message } = body || {};

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const result = await sendEmail({ email, message });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to send" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err || "Unexpected error");
    console.error("/api/contact-resend error", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
