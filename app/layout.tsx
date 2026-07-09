import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Aura Interiors",
  description: "Luxury Interior Design Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-[#F8F3EC]">
        <Providers>
          {/* Dynamic Unified Navigation Bar */}
          <Navbar />

          {/* Core Page Content */}
          <main className="relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}