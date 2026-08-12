import { SITE_URL } from "@/constants/seo";
import { NextResponse } from "next/server";

const routes = ["/"];

export function GET() {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
