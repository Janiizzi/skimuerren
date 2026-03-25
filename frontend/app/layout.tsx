import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/Header";
import DemoBanner from "@/components/DemoBanner";

config.autoAddCss = false;
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swiss Snow Happening 2026",
  description: "A raffle appliction for the Swiss Snow Happening 2026 in Mürren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DemoBanner show={isDemoMode} />
        <Header />
        {children}
      </body>
    </html>
  );
}
