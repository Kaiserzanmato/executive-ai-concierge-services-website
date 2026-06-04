import type { Metadata } from "next";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AIConciergeWidget from "@/components/AIConciergeWidget";

export const metadata: Metadata = {
  title: {
    default: "Executive AI Concierge Services",
    template: "%s | Executive AI Concierge Services",
  },
  description:
    "Private AI operations for leaders whose time cannot be replaced. We design, deploy, and manage discreet AI systems for C-suite executives, founders, UHNWIs, family offices, and private figures.",
  keywords: [
    "executive AI",
    "AI concierge",
    "private AI operations",
    "C-suite automation",
    "executive productivity",
    "AI assistant integration",
    "family office AI",
    "UHNWI technology",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Executive AI Concierge Services",
    title: "Executive AI Concierge Services",
    description:
      "Private AI operations for leaders whose time cannot be replaced.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 text-ivory-50 font-display antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <AIConciergeWidget />
      </body>
    </html>
  );
}
