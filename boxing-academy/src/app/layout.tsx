import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCTA } from "@/components/shared/sticky-mobile-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { healthClubSchema } from "@/lib/seo";

// Body: readable geometric sans. Display: bold condensed (docs/UI_UX_GUIDELINES.md §3).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} | Boxing Classes in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Boxing Classes in ${site.city}`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={healthClubSchema()} />
        <Header />
        {/* pb-20 keeps content clear of the mobile sticky CTA bar */}
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
