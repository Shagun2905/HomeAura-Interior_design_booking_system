"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/booking", label: "Booking" },
      { href: "/admin/login", label: "Admin" },
    ],
    []
  );

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-[#F8F3EC] z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Traditional, Luxury Royal Logo Element */}
        <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
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

          <div className="flex flex-col text-left">
            <span className="text-2xl font-bold tracking-wide text-[#2E2E2E] leading-tight">
              Home<span className="text-[#8B5E3C] group-hover:text-[#D4AF37] transition-colors duration-300">Aura</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#8B5E3C] -mt-0.5">
              Heritage & Design
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-900/80 hover:text-[#8B5E3C] transition-colors font-medium text-sm"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {session ? (
            <div className="flex items-center gap-3">
              <img
                src={session.user?.image || ""}
                alt="User"
                className="w-10 h-10 rounded-full border border-zinc-200"
              />
              <span className="font-medium text-sm text-[#2E2E2E]">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => signIn("google")}
                className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-[#2E2E2E] hover:bg-zinc-50 transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => signIn("google")}
                className="rounded-xl bg-black hover:bg-zinc-850 px-5 py-2.5 text-white text-sm font-semibold transition duration-300"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-zinc-200 w-11 h-11 transition hover:bg-zinc-50"
        >
          <span className="sr-only">Menu</span>
          <div className="w-5">
            <div
              className={`h-0.5 bg-zinc-900 transition-transform ${
                open ? "translate-y-1.5 rotate-45" : "-translate-y-0.5"
              }`}
            />
            <div
              className={`h-0.5 bg-zinc-900 mt-1 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`h-0.5 bg-zinc-900 transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : "translate-y-0.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-zinc-100 bg-white shadow-lg animate-in fade-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-900/80 hover:text-[#8B5E3C] transition-colors font-medium text-sm py-1"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {session ? (
              <div className="flex flex-col gap-3 pt-3 border-t border-zinc-100">
                <div className="flex items-center gap-3">
                  <img
                    src={session.user?.image || ""}
                    className="w-10 h-10 rounded-full border border-zinc-200"
                    alt="User"
                  />
                  <p className="font-medium text-sm text-[#2E2E2E]">{session.user?.name}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-3 border-t border-zinc-100">
                <button
                  onClick={() => signIn("google")}
                  className="flex-1 rounded-xl border border-zinc-300 py-3 text-sm font-semibold text-[#2E2E2E] hover:bg-zinc-50 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="flex-1 rounded-xl bg-black hover:bg-zinc-800 text-white py-3 text-sm font-semibold transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}