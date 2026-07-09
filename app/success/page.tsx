"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, User, Briefcase, Hash, ShieldCheck, ArrowRight, Home, Compass, PlusCircle } from "lucide-react";

const summaryItems = [
  { label: "Booking ID", value: "HAI-2026-8942", icon: Hash },
  { label: "Customer Name", value: "Premium Client", icon: User },
  { label: "Service", value: "Complete Interior Consultation", icon: Briefcase },
  { label: "Consultation Date", value: "Scheduled (Check Email Slot)", icon: Calendar },
  { label: "Status", value: "Confirmed", icon: ShieldCheck, isBadge: true },
];

const timelineSteps = [
  { title: "Booking Confirmed", desc: "Your request is securely locked in.", active: true },
  { title: "Designer Assigned", desc: "Matching with your style expert.", active: false },
  { title: "Consultation Call", desc: "Reviewing your aesthetic vision.", active: false },
  { title: "Site Visit", desc: "Laser scanning and space mapping.", active: false },
  { title: "Design Proposal", desc: "Revealing your bespoke 3D layout.", active: false },
];

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 text-stone-100 p-4 md:p-8 selection:bg-amber-500/30 selection:text-amber-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-stone-900/40 backdrop-blur-xl border border-stone-800 rounded-3xl shadow-2xl p-6 md:p-10 grid md:grid-cols-5 gap-8 md:gap-12 relative overflow-hidden"
      >
        {/* Subtle Decorative Ambient Lighting Background Effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stone-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Grid Section: Branding Header and Summary Information Panel */}
        <div className="md:col-span-3 flex flex-col justify-between space-y-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5 shadow-inner"
            >
              <CheckCircle2 className="w-9 h-9" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-white mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              Thank you for choosing <span className="text-white font-medium">Home Aura Interiors</span>. Your premium design journey is underway, and a specialized luxury consultant will connect with you shortly.
            </p>
          </div>

          {/* Core Booking Summary Data Matrix Block */}
          <div className="bg-stone-950/50 border border-stone-800/60 rounded-2xl p-5 space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Appointment Specifications</h2>
            {summaryItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm py-0.5">
                <span className="text-stone-400 flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-stone-500 shrink-0" />
                  {item.label}
                </span>
                {item.isBadge ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse">
                    {item.value}
                  </span>
                ) : (
                  <span className="text-stone-200 font-medium text-right truncate max-w-[180px] md:max-w-xs">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons Row Section */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/" className="flex items-center justify-center gap-2 bg-white hover:bg-stone-200 text-stone-950 text-sm font-semibold px-5 py-3 rounded-xl transition duration-200 shadow-sm">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/portfolio" className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium px-5 py-3 rounded-xl border border-stone-700/60 transition duration-200">
              <Compass className="w-4 h-4" /> View Portfolio
            </Link>
            <Link href="/booking" className="flex items-center justify-center gap-2 text-stone-400 hover:text-amber-400 text-sm font-medium px-2 py-3 transition duration-200 sm:ml-auto">
              <PlusCircle className="w-4 h-4" /> Book Another
            </Link>
          </div>
        </div>

        {/* Right Grid Section: Interactive Next Phase Step Timeline Flow */}
        <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-stone-800/80 pt-8 md:pt-0 md:pl-8 flex flex-col justify-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
            What's Next? <span className="h-[1px] flex-grow bg-stone-800" />
          </h3>
          <div className="space-y-6 relative">
            {/* Visual Continuity Guide Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-stone-800" />
            
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 relative group">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold z-10 shrink-0 transition-all ${
                  step.active 
                    ? "bg-amber-500 border-amber-500 text-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-110" 
                    : "bg-stone-900 border-stone-700 text-stone-500"
                }`}>
                  {idx + 1}
                </div>
                <div className="space-y-0.5">
                  <h4 className={`text-sm font-medium transition-colors ${step.active ? "text-white" : "text-stone-300"}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-normal">{step.desc}</p>
                </div>
                {step.active && (
                  <ArrowRight className="absolute right-0 top-1 w-4 h-4 text-amber-500/40 animate-pulse hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}