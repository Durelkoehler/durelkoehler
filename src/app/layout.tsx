import type { Metadata } from "next";
import { Cormorant_Garamond, Sora } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  BRAND_NAME,
  META_TITLE,
  META_DESCRIPTION,
  JOB_TITLE,
  KNOWS_ABOUT,
} from "@/constants/seo";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,

  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  keywords: [
    "KOEHLER Durel",
    "Durel Koehler",
    "UI/UX Designer",
    "Web Developer",
    "WordPress Developer",
    "Graphic Designer",
    "Web Designer",
    "Frontend Developer",
    "UI UX Designer Benin",
    "Web Developer Benin",
    "WordPress Developer Benin",
    "Graphic Designer Benin",
    "Web Design",
    "UI UX Design",
    "WordPress Development",
    "Digital Experiences",
  ],

  authors: [
    {
      name: "KOEHLER Durel",
      url: SITE_URL,
    },
  ],

  creator: "KOEHLER Durel",
  publisher: "KOEHLER Durel",

  category: "technology",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KOEHLER Durel — UI/UX Designer, Web Developer, WordPress Developer and Graphic Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",

    "@id": `${SITE_URL}/#person`,

    name: "KOEHLER Durel",
    alternateName: "Durel Koehler",

    url: SITE_URL,

    image: `${SITE_URL}/profile.jpg`,

    jobTitle:
      "UI/UX Designer, Web Developer, WordPress Developer & Graphic Designer",

    description:
      "KOEHLER Durel is a UI/UX Designer, Web Developer, WordPress Developer and Graphic Designer creating modern digital experiences, websites and visual identities.",

    knowsAbout: [
      "UI/UX Design",
      "User Interface Design",
      "User Experience Design",
      "Web Design",
      "Web Development",
      "Frontend Development",
      "WordPress",
      "WordPress Development",
      "Graphic Design",
      "Digital Experiences",
      "Responsive Web Design",
    ],

    sameAs: [
      // Add only your real social/profile URLs here.
      // "https://www.linkedin.com/in/...",
      // "https://github.com/...",
      // "https://www.behance.net/...",
      // "https://www.instagram.com/...",
    ],
  },

  {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name: "Koehler Durel",

    alternateName: "KOEHLER Durel",

    url: SITE_URL,

    description:
      "Portfolio of KOEHLER Durel — UI/UX Designer, Web Developer, WordPress Developer and Graphic Designer.",

    inLanguage: "en-US",

    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${displaySerif.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#121212] text-white"
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
