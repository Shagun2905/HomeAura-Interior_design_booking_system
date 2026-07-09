"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={session.user?.image || ""}
          className="w-10 h-10 rounded-full"
        />

        <p>{session.user?.name}</p>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
  signIn("google", {
    callbackUrl: "/",
  })
}
      className="bg-black text-white px-5 py-2 rounded-lg"
    >
      Sign in with Google
    </button>
  );
}