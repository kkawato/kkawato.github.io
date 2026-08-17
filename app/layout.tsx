import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sites.google.com/view/kentaro-kawato";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kentaro Kawato | Econometrics & Statistics",
    template: "%s | Kentaro Kawato",
  },
  description:
    "Kentaro Kawato is an economics M.A. student at the University of Tokyo researching econometrics, statistics, causal inference, and experimental design.",
  applicationName: "Kentaro Kawato — Academic Homepage",
  authors: [{ name: "Kentaro Kawato", url: siteUrl }],
  creator: "Kentaro Kawato",
  publisher: "Kentaro Kawato",
  keywords: [
    "Kentaro Kawato",
    "川戸健太竜",
    "川戸 健太竜",
    "econometrics",
    "statistics",
    "causal inference",
    "experimental design",
    "causal mediation analysis",
    "The University of Tokyo",
    "東京大学",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Kentaro Kawato | Econometrics & Statistics",
    description:
      "Academic homepage of Kentaro Kawato, M.A. student at the University of Tokyo.",
    siteName: "Kentaro Kawato",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kentaro Kawato — Econometrics & Statistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kentaro Kawato | Econometrics & Statistics",
    description:
      "Econometrics and statistics research at the University of Tokyo.",
    images: ["/og.png"],
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
    icon: "/kentaro-kawato.jpg",
    apple: "/kentaro-kawato.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2ede2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
