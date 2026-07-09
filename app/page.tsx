"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";

// Existing Data Arrays
const SERVICES = [
  {
    title: "Modular Kitchen",
    price: "Starting ₹1.79 Lakhs",
    desc: "Ergonomic culinary configurations with German soft-close fittings and premium acrylic finishes.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
  },
  {
    title: "Living Room",
    price: "Starting ₹1.25 Lakhs",
    desc: "Exquisite entertainment setups, premium wooden paneling, and curated ambient lighting grids.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
  },
  {
    title: "Bedroom",
    price: "Starting ₹1.10 Lakhs",
    desc: "Serene master sanctuaries integrated with pristine walk-in wardrobes and plush accent walls.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200",
  },
  {
    title: "Luxury Villa",
    price: "Starting ₹12.49 Lakhs",
    desc: "End-to-end bespoke luxury architectural makeovers tailored meticulously for elite lifestyles.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
  },
  {
    title: "Office Interior",
    price: "Starting ₹3.49 Lakhs",
    desc: "Productivity-focused ergonomic commercial hubs blending high utility with premium design statements.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
  },
  {
    title: "Dining Room",
    price: "Starting ₹1.45 Lakhs",
    desc: "Sophisticated gathering spaces featuring custom vanity layouts and premium marble accent details.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=1200",
  },
];

const PORTFOLIO = [
  { title: "Indian Living Room", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800", span: "md:col-span-2 md:row-span-2" },
  { title: "Modular Kitchen", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "Luxury Bedroom", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", span: "md:col-span-1 md:row-span-2" },
  { title: "Wooden TV Unit", img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "Dining Area", img: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "False Ceiling", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "Pooja Room", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "Villa Interior", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", span: "md:col-span-2 md:row-span-1" },
];

const REVIEWS = [
  { name: "Ananya Sharma", city: "Mumbai", text: "HomeAura completely converted our 3 BHK flat into an ethereal sanctuary. The design team matched our vibe exactly, and delivered 4 days ahead of schedule!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { name: "Vikram Malhotra", city: "Bangalore", text: "The modular kitchen quality is outstanding. Completely handles absolute heavy usage. Zero hidden costs, incredible glass finish transparency throughout.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Rohan Deshmukh", city: "Pune", text: "The premium warranty framework gave us absolute confidence. The materials used feel significantly more premium than standard alternatives in the market. Highly professional!", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
];

const STEPS = [
  { num: "01", name: "Consultation", desc: "Detailed discussion mapping lifestyle workflows and spatial design intents." },
  { num: "02", name: "Design", desc: "Curating premium color boards, mood themes, and detailed layouts." },
  { num: "03", name: "3D Preview", desc: "Immersive photo-realistic rendering check before any material execution." },
  { num: "04", name: "Execution", desc: "Rigorous factory manufacturing alongside precision on-site installations." },
  { num: "05", name: "Delivery", desc: "Quality checks pass and dynamic deep cleaning before final keys handover." },
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const num = parseInt(value);
    if (isNaN(num)) {
      let done = false;
      const timer = setInterval(() => {
        if (done) return;
        done = true;
        setDisplayVal(value);
        clearInterval(timer);
      }, 0);
      return () => {
        done = true;
        clearInterval(timer);
      };
    }
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / num));
    const timer = setInterval(() => {
      start += 1;
      setDisplayVal(String(start));
      if (start >= num) {
        clearInterval(timer);
        setDisplayVal(value);
      }
    }, Math.max(stepTime, 20));
    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayVal}{suffix}</span>;
}

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="bg-[#F8F3EC] text-[#2E2E2E] selection:bg-[#D4AF37] selection:text-white overflow-x-hidden antialiased">
        
        {/* PREMIUM SPLIT SCREEN HERO SECTION */}
        <section className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#25231F] text-white pt-16 overflow-hidden">
          
          {/* Left Column: Full Bleed Image with Soft Gradient Mask */}
          <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full group">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
              alt="HomeAura Bespoke Indian Living Room"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              loading="eager"
            />
            {/* Edge blending gradient overlays to blend seamlessly into the dark right column */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#25231F]/90 hidden lg:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25231F] via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Right Column: Premium Architectural Content Layout */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-10 lg:py-0 space-y-6 relative z-10 bg-[#25231F]">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-1.5 text-[#D4AF37] text-xs sm:text-sm tracking-wide self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              Architectural Opulence • Crafted Across India
            </div>

            <h1 className="font-serif leading-[1.15] tracking-tight text-4xl sm:text-5xl xl:text-6xl font-bold">
              Elevating Spaces.<br />
              <span className="bg-gradient-to-r from-[#F8F3EC] via-[#D4AF37] to-amber-200 bg-clip-text text-transparent">
                Defining Lifestyles.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              HomeAura orchestrates premium warm woods, seamless bespoke modular frameworks, and absolute budget transparency to curate custom luxury Indian homes that tell your heritage narrative.
            </p>

            {/* CTA Interaction Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-lg bg-[#B38446] hover:bg-[#966D37] px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 text-sm"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 hover:border-zinc-500 bg-transparent px-6 py-3.5 font-semibold text-zinc-300 hover:text-white transition-all duration-300 text-sm"
              >
                Explore Portfolio
              </Link>
            </div>

            {/* Picture 2 Architecture Stats Footer */}
            <div className="pt-8 grid grid-cols-4 gap-2 sm:gap-4 border-t border-zinc-800">
              {[
                { 
                  v: "500", s: "+", k: "Homes Completed", 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  )
                },
                { 
                  v: "1000", s: "+", k: "Happy Clients", 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A4.672 4.672 0 0112 21a4.672 4.672 0 01-3-1.016v-.106m0-3.073.78-1.341m0 0A4.125 4.125 0 002.108 17c0 1.187.5 2.257 1.306 3.037m5.344-3.218a4.125 4.125 0 003.541-3.54M9.75 8.25a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
                    </svg>
                  )
                },
                { 
                  v: "45", s: "", k: "Days Delivery", 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3v18.75h18V5.25H3v15.5z" />
                    </svg>
                  )
                },
                { 
                  v: "4.9", s: "★", k: "Customer Rating", 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.439.817-.439.99 0l3.07 6.242 6.88 1.002c.478.07.67.659.324.998l-4.98 4.856 1.176 6.853c.082.477-.418.841-.847.616L12 20.323l-6.143 3.232c-.429.225-.928-.139-.847-.616l1.175-6.853-4.98-4.856c-.346-.339-.153-.929.325-.998l6.88-1.002 3.07-6.242z" />
                    </svg>
                  )
                },
              ].map((stat, idx) => (
                <div key={stat.k} className="flex flex-col items-center text-center px-1 relative group">
                  {/* Subtle vertical divider between column items */}
                  {idx > 0 && <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-zinc-800" />}
                  
                  {/* Circular Thin Outlined Icon Wrapper */}
                  <div className="w-10 h-10 rounded-full border border-zinc-700 text-[#D4AF37] flex items-center justify-center mb-2 bg-zinc-900/30">
                    {stat.icon}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                    <AnimatedCounter value={stat.v} suffix={stat.s} />
                  </div>
                  <div className="text-zinc-500 text-[10px] sm:text-xs font-light leading-tight mt-0.5">{stat.k}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 2: Our Premium Services */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">Our Premium Services</h2>
            <div className="h-1 w-20 bg-[#8B5E3C] mx-auto rounded" />
            <p className="text-zinc-600 font-light text-base sm:text-lg">
              Tailored architectural masterplans, end-to-end management execution, and unmatched raw material perfection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((item) => (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#F8F3EC] shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-[#2E2E2E] group-hover:text-[#8B5E3C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 text-sm font-light leading-relaxed min-h-[40px]">
                    {item.desc}
                  </p>
                  <div className="pt-4 flex items-center justify-between border-t border-zinc-100">
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase tracking-widest">Premium Estimation</span>
                      <span className="text-base font-bold text-[#8B5E3C]">{item.price}</span>
                    </div>
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center rounded-lg bg-[#2E2E2E] text-white hover:bg-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-wide transform transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#F8F3EC] via-white to-[#F8F3EC]">
          <div className="absolute top-12 left-[-10%] w-[45rem] h-[45rem] bg-gradient-to-tr from-[#D4AF37]/10 via-[#8B5E3C]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-12 right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-bl from-[#8B5E3C]/10 via-[#D4AF37]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8B5E3C] bg-[#8B5E3C]/5 px-3 py-1 rounded-full border border-[#8B5E3C]/10">
                The HomeAura Standard
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#2E2E2E]">
                Why Discriminating Homeowners <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#8B5E3C] via-[#D4AF37] to-[#8B5E3C] bg-clip-text text-transparent">
                  Choose HomeAura
                </span>
              </h2>
              <div className="relative h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#8B5E3C]" />
              </div>
              <p className="text-zinc-500 font-light text-base sm:text-lg max-w-2xl mx-auto pt-2">
                Setting uncompromised execution standards across elite Indian developments through global design metrics and end-to-end transparent logistics.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {[
                {
                  title: "500+ Luxury Homes Completed",
                  stat: "500+ Homes",
                  desc: "Successfully conceptualized and executed ultra-premium structural makeovers across premier high-rises and custom private sanctuaries.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  ),
                  gradient: "from-[#8B5E3C] to-[#5C3E27]",
                  delay: "translate-y-0"
                },
                {
                  title: "10+ Years of Design Masterclass",
                  stat: "10+ Years",
                  desc: "A decorated decade of architectural evolution, creating bespoke luxury design languages and custom furniture patents.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.439.817-.439.99 0l3.07 6.242 6.88 1.002c.478.07.67.659.324.998l-4.98 4.856 1.176 6.853c.082.477-.418.841-.847.616L12 20.323l-6.143 3.232c-.429.225-.928-.139-.847-.616l1.175-6.853-4.98-4.856c-.346-.339-.153-.929.325-.998l6.88-1.002 3.07-6.242z" />
                    </svg>
                  ),
                  gradient: "from-[#D4AF37] to-[#AA841A]",
                  delay: "lg:translate-y-6"
                },
                {
                  title: "Assured 45-Day Delivery Guarantee",
                  stat: "45-Day Delivery",
                  desc: "Rigorous industrial milestone tracking linked to ironclad penalties ensures absolute execution pace without timeline shifts.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: "from-[#2E2E2E] to-[#1A1A1A]",
                  delay: "translate-y-0"
                },
                {
                  title: "Premium Handpicked Materials",
                  stat: "Premium Materials",
                  desc: "Assembled exclusively with genuine European joinery elements, sustainable marine boards, and hyper-durable safe finishes.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  gradient: "from-[#8B5E3C] to-[#AA841A]",
                  delay: "translate-y-0"
                },
                {
                  title: "Comprehensive 5-Year Structural Warranty",
                  stat: "5-Year Warranty",
                  desc: "Backed by an extensive post-handover support framework that ensures continuous material resilience and peace of mind.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  gradient: "from-[#2E2E2E] to-[#5C3E27]",
                  delay: "lg:translate-y-6"
                },
                {
                  title: "Stellar 4.9★ Client Satisfaction",
                  stat: "4.9★ Rating",
                  desc: "Meticulously rated by transparent verified homeowners as the supreme premium turnkey solution across modern Indian metropolises.",
                  svg: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.601M5.904 18.75c-.38-.89-.596-1.866-.596-2.9c0-1.24.312-2.407.862-3.435M5.904 18.75H4.5a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 014.5-1.5h1.366" />
                    </svg>
                  ),
                  gradient: "from-[#D4AF37] to-[#8B5E3C]",
                  delay: "translate-y-0"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative p-8 rounded-3xl bg-white/70 border border-white/80 shadow-[0_10px_30px_-15px_rgba(139,94,60,0.1)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.2)] hover:bg-white/90 hover:border-[#D4AF37]/30 ${item.delay}`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#8B5E3C]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#8B5E3C]/5 transition-all duration-500 pointer-events-none" />
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6`}>
                        {item.svg}
                      </div>
                      <span className="text-xs font-serif font-bold tracking-wide text-[#8B5E3C] bg-[#8B5E3C]/5 px-3 py-1 rounded-md border border-[#8B5E3C]/10">
                        {item.stat}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-[#2E2E2E] tracking-tight group-hover:text-[#8B5E3C] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed min-h-[72px]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center text-xs font-semibold tracking-widest uppercase text-[#2E2E2E] group-hover:text-[#D4AF37] transition-colors duration-300">
                      <span>Learn More</span>
                      <svg 
                        className="w-4 h-4 ml-1.5 transform transition-transform duration-300 ease-out translate-x-0 group-hover:translate-x-2" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: How We Work */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">How We Work</h2>
            <div className="h-1 w-20 bg-[#8B5E3C] mx-auto rounded" />
            <p className="text-zinc-600 font-light text-base sm:text-lg">
              Our step-by-step flawless execution map leading to customized interior reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-zinc-300 z-0" />
            
            {STEPS.map((step) => (
              <div key={step.num} className="relative bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-md text-center space-y-3 z-10">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#8B5E3C] text-white flex items-center justify-center font-bold text-sm border-4 border-[#F8F3EC]">
                  {step.num}
                </div>
                <h4 className="font-serif font-bold text-base text-[#2E2E2E]">{step.name}</h4>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Featured Projects Layout */}
        <section className="py-24 bg-[#F1EAE0] border-y border-zinc-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">Featured Projects</h2>
              <div className="h-1 w-20 bg-[#8B5E3C] mx-auto rounded" />
              <p className="text-zinc-600 font-light text-base sm:text-lg">
                Glance over our newly completed luxury design portfolios across premium Indian residences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {PORTFOLIO.map((project, idx) => (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-2xl relative group border border-zinc-200/60 bg-zinc-800 shadow-sm ${project.span}`}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 p-2">
                    <p className="text-white text-sm font-serif tracking-wide font-medium">{project.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-400 hover:border-[#8B5E3C] px-8 py-3.5 text-sm font-semibold text-[#2E2E2E] hover:text-[#8B5E3C] bg-transparent transition-all duration-300"
              >
                View Complete Portfolio →
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6: Customer Reviews Testimonials */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">Customer Reviews</h2>
            <div className="h-1 w-20 bg-[#8B5E3C] mx-auto rounded" />
            <p className="text-zinc-600 font-light text-base sm:text-lg">
              Hear from homeowners who entrusted us to conceptualize their luxury dream spaces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="p-8 rounded-2xl bg-white border border-zinc-100 shadow-md flex flex-col justify-between space-y-6 transform transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex text-[#D4AF37] space-x-0.5 text-base">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-zinc-600 font-light italic text-sm leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                  <img
                    src={rev.img}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#2E2E2E] font-serif">{rev.name}</h4>
                    <p className="text-xs text-zinc-400 font-medium">{rev.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Luxury Call-To-Action Block */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#2E2E2E] to-[#1F2E26] text-white text-center">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#8B5E3C]/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 space-y-6 z-10">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Ready to Design Your Dream Home?
            </h2>
            <p className="text-zinc-300 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Book a free consultation with India's trusted interior designers. Let us translate your spatial imagination into absolute physical grandeur.
            </p>
            <div className="pt-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] px-8 py-4 font-semibold text-white shadow-xl shadow-black/30 transform transition-all duration-300 hover:-translate-y-1 hover:brightness-110 focus:outline-none text-sm"
              >
                Schedule Free Consultation Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}