"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, Sparkles, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin") === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate network delay for better user experience
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin", "true");
      toast.success("Welcome back! Redirecting...");
      router.push("/admin");
    } else {
      toast.error("Invalid Username or Password");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-950 px-4 select-none relative overflow-hidden">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { background: "#1c1917", color: "#f5f5f4", borderRadius: "12px", border: "1px solid #2e2a24" }
        }} 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-md bg-stone-900/40 border border-stone-800/80 p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10 mb-4">
            <Sparkles className="w-6 h-6 text-stone-950 animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Home Aura</h1>
          <p className="text-sm text-stone-400 mt-1">Management Portal Control Deck</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              <input
                type="text"
                placeholder="Enter system username"
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-amber-500/50 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition duration-200"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter secret passcode"
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-amber-500/50 rounded-xl pl-10 pr-10 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition duration-200"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-3 text-stone-500 hover:text-stone-300 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] text-stone-950 text-sm font-semibold py-3.5 rounded-xl shadow-lg shadow-amber-500/5 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </motion.div>
              ) : (
                <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Access Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </main>
  );
}