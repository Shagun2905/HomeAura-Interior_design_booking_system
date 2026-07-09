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
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold">HomeAura Interiors</h1>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-900/80 hover:text-zinc-950 transition-colors font-medium"
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
      className="w-10 h-10 rounded-full"
    />

    <span className="font-medium">
      {session.user?.name}
    </span>

    <button
      onClick={() => signOut()}
      className="bg-red-600 text-white px-5 py-2 rounded-xl"
    >
      Logout
    </button>

  </div>
) : (
  <div className="flex items-center gap-3">

    <button
      onClick={() => signIn("google")}
      className="rounded-xl border border-zinc-300 px-5 py-2.5"
    >
      Login
    </button>

    <button
      onClick={() => signIn("google")}
      className="rounded-xl bg-black px-5 py-2.5 text-white"
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
        <div className="md:hidden border-t border-zinc-100 bg-white">
          <div className="max-w-7xl mx-auto px-5 py-4 space-y-4">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-900/80 hover:text-zinc-950 transition-colors font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {session ? (

<div className="flex flex-col gap-3">

<div className="flex items-center gap-3">

<img
src={session.user?.image || ""}
className="w-10 h-10 rounded-full"
/>

<p>{session.user?.name}</p>

</div>

<button
onClick={() => signOut()}
className="bg-red-600 text-white py-3 rounded-xl"
>
Logout
</button>

</div>

) : (

<div className="flex gap-3">

<button
onClick={() => signIn("google")}
className="flex-1 rounded-xl border border-zinc-300 py-3"
>
Login
</button>

<button
onClick={() => signIn("google")}
className="flex-1 rounded-xl bg-black text-white py-3"
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

