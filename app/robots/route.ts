import { SITE_URL } from "@/constants/seo";
import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
}
