import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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
          {/* Section 1: Navigation Bar with Traditional Logo */}
          <nav className="relative z-50 bg-white/90 backdrop-blur-md border-b border-[#F8F3EC] px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Traditional, Luxury Royal Logo Element */}
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5E3C] to-[#2E2E2E] border border-[#D4AF37]/40 shadow-inner overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  {/* Background Traditional Geometric Accent */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px]" />
                  
                  {/* Heritage Jali / Traditional Icon Geometry */}
                  <svg className="w-7 h-7 text-[#D4AF37] relative z-10 transform transition-transform duration-700 ease-out group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                    <circle cx="12" cy="12" r="2" fill="#D4AF37" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-wide text-[#2E2E2E] leading-tight">
                    Home<span className="text-[#8B5E3C] group-hover:text-[#D4AF37] transition-colors duration-300">Aura</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#8B5E3C] -mt-0.5">
                    Heritage & Design
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8 text-sm font-medium text-[#2E2E2E]">
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">Home</a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">Gallery</a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">Services</a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">Contact</a>
              </div>

            </div>
          </nav>

          {/* Core Page Content */}
          <main className="relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}