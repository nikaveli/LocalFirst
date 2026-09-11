import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import SiteChoreography from "@/components/SiteChoreography";
import JsonLd from "@/components/JsonLd";
import { businessSchema, siteUrl } from "@/lib/seo";
import "./scrollcraft.css";
import "./globals.css";
import "./subpages.css";

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
  title: "LocalFirst | On-Site Google Profile Photography",
  description:
    "On-site photography, video, and Google Business Profile optimization for Colorado brick-and-mortar businesses.",
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
        <JsonLd data={businessSchema} />
        <a className="lf-skip-link" href="#main-content">Skip to content</a>
        {children}
        <SiteChoreography />
      </body>
    </html>
  );
}
