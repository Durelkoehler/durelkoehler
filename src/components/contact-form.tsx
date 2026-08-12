"use client";

import React, { useState } from "react";

type Result = { success: boolean; error?: string };

/**
 * Client Contact Form
 * - Sends JSON to `/api/contact-resend` which uses the Server Action `sendEmail`
 * - Displays basic success / error messages and a loading state
 */
export default function ContactForm(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Result | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!email || !message) {
      setStatus({ success: false, error: "Please fill both fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact-resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const payload: Result = await res.json();
      setStatus(payload);
      if (payload.success) {
        setEmail("");
        setMessage("");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : String(err || "Unexpected error");
      setStatus({ success: false, error: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#111827] border border-[#2b2b2b] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="name@company.com"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 rounded-lg bg-[#111827] border border-[#2b2b2b] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your project..."
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center px-6 py-2 rounded-md text-sm font-semibold transition disabled:opacity-60 ${loading ? "bg-indigo-600" : "bg-indigo-500 hover:bg-indigo-400"} text-white`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status && (
          <p
            className={`text-sm ${status.success ? "text-green-400" : "text-rose-400"}`}
          >
            {status.success ? "Message sent" : status.error}
          </p>
        )}
      </div>
    </form>
  );
}
