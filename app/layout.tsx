import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { businessSchema, siteUrl } from "@/lib/seo";
import "locomotive-scroll/locomotive-scroll.css";
import "./base.css";
import "./globals.css";
import "./subpages.css";
import "./restaurant-home.css";
import "./site-uniform.css";

const inter = Inter({
  variable: "--font-localfirst-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-localfirst-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LocalFirst | Google Business Profile Visual Refresh",
  description:
    "Help people who are already searching find your business, trust it, and take the next step. On-site photos, video, and Google profile visual refreshes.",
  authors: [{ name: "Nicholas Molina" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <noscript><style>{`.rh-zoom .rh-zoom-end{display:none}.rh-zoom .rh-zoom-story{min-height:0;padding:5rem 1.5rem;margin-top:3rem}`}</style></noscript>
        <JsonLd data={businessSchema} />
        <a className="lf-skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
