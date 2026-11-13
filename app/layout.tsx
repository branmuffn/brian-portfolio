import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "./content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} | Portfolio`;

// Link-preview images come from app/opengraph-image.png and app/twitter-image.png (plus .alt.txt files);
// the Apple touch icon from app/apple-icon.png. Next adds those tags automatically.
// Canonical and og:url point at "/" because this is a one-page site.
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy font-sans text-body">{children}</body>
    </html>
  );
}
