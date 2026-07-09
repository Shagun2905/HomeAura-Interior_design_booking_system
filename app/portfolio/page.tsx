"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data Structures ---

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "modern", label: "Modern" },
  { id: "luxury", label: "Luxury" },
  { id: "indian", label: "Indian" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedroom", label: "Bedroom" },
  { id: "living room", label: "Living Room" },
  { id: "office", label: "Office" },
];

const ALL_CATEGORIES_LIST = [
  "Modern Interiors", "Luxury Interiors", "Indian Traditional Interiors", 
  "Minimalist Designs", "Contemporary Homes", "Modular Kitchens", 
  "Living Rooms", "Bedrooms", "Bathrooms", "Office Interiors", "Villas & Bungalows"
];

const GALLERY_ITEMS = [
  { id: 1, tag: "modern", category: "Modern Interiors", src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900", title: "Sleek Minimal Living" },
  { id: 2, tag: "luxury", category: "Luxury Interiors", src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900", title: "Grand Marble Penthouse" },
  { id: 3, tag: "indian", category: "Indian Traditional Interiors", src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900", title: "Heritage Courtyard Lounge" },
  { id: 4, tag: "kitchen", category: "Modular Kitchens", src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900", title: "Charcoal & Walnut Kitchen" },
  { id: 5, tag: "bedroom", category: "Bedrooms", src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900", title: "Plush Velvet Bedroom" },
  { id: 6, tag: "living room", category: "Living Rooms", src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900", title: "Bright Scandinavian Lounge" },
  { id: 7, tag: "office", category: "Office Interiors", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900", title: "Corporate Executive Suite" },
  { id: 8, tag: "modern", category: "Contemporary Homes", src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900", title: "Urban Concrete Loft" },
  { id: 9, tag: "luxury", category: "Villas & Bungalows", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900", title: "Infinity Pool Villa" },
  { id: 10, tag: "indian", category: "Indian Traditional Interiors", src: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=900", title: "Jodhpur Blue Accent Room" },
  { id: 11, tag: "kitchen", category: "Modular Kitchens", src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900", title: "Seamless Quartz Island" },
  { id: 12, tag: "bedroom", category: "Bedrooms", src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900", title: "Warm Oak Master Suite" }
];

const FEATURED_PROJECTS = [
  { id: 1, title: "The Royal Crest Villa", location: "Mumbai", area: "4,500 sq.ft.", style: "Luxury Neo-Classical", budget: "₹75 Lakhs", time: "60 Days", src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900" },
  { id: 2, title: "Skyline Minimalist Duplex", location: "Delhi", area: "2,800 sq.ft.", style: "Modern Minimalist", budget: "₹38 Lakhs", time: "45 Days", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900" },
  { id: 3, title: "Nesta Heritage Manor", location: "Jaipur", area: "5,200 sq.ft.", style: "Indian Traditional Luxury", budget: "₹90 Lakhs", time: "75 Days", src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900" },
  { id: 4, title: "The Sovereign Penthouse", location: "Bangalore", area: "3,600 sq.ft.", style: "Contemporary Premium", budget: "₹55 Lakhs", time: "50 Days", src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=900" },
  { id: 5, title: "Serene Urban Oasis Apartment", location: "Pune", area: "2,100 sq.ft.", style: "Scandinavian Modern", budget: "₹28 Lakhs", time: "40 Days", src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=900" },
  { id: 6, title: "Elite Tech-Executive Pad", location: "Hyderabad", area: "3,100 sq.ft.", style: "High-End Transitional", budget: "₹48 Lakhs", time: "45 Days", src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900" }
];

const BEFORE_AFTER_DATA = [
  {
    id: 1,
    title: "Living Room Renovation",
    before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900",
    after: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900",
    desc: "Transformed a dated, dark lounge into a premium, light-flooded modern entertainment zone."
  },
  {
    id: 2,
    title: "Modular Kitchen Overhaul",
    before: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=900",
    after: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=900",
    desc: "Converted an unorganized traditional kitchen into an ergonomic culinary hub with acrylic cabinetry."
  }
];

const INSPIRATIONS = [
  { title: "Trending Indian Interior Designs", src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700", tags: ["Jali Work", "Brass Details"] },
  { title: "Luxury Villas", src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700", tags: ["Plunge Pools", "Double Height"] },
  { title: "Smart Apartments", src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700", tags: ["Space Savers", "Automation"] },
  { title: "Wooden Interiors", src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700", tags: ["Teak Finishes", "Warm Lights"] },
  { title: "Scandinavian Style", src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700", tags: ["Minimalist", "Monochrome"] },
  { title: "Bohemian Style", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700", tags: ["Rattan Furniture", "Pampas"] },
];

const REVIEWS = [
  { name: "Ananya Sharma", location: "Mumbai", text: "HomeAura completely redefined our living room layout. The 45-day execution guarantee was met precisely. Outstanding finishing!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { name: "Rajesh Malhotra", location: "Delhi", text: "The modular kitchen design is incredibly smart. Seamless hardware and premium materials make cooking a delightful experience.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Kiran & Vivek", location: "Bangalore", text: "We handed over our 3 BHK bare-shell apartment and got back a masterpiece villa-grade finish. Highly recommend their design aesthetic.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { name: "Arvind Kejriwal", location: "Jaipur", text: "Beautiful traditional accents integrated into a highly functional contemporary framework. Completely premium and stress-free process.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { name: "Priyanka Reddy", location: "Hyderabad", text: "Their transparent cost estimation tool matched the final quotation within a 2% margin. No hidden costs or stressful budget spikes.", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
  { name: "Siddharth Joshi", location: "Pune", text: "The hidden storage elements inside the bedroom wardrobes are genius. Excellent space optimization without compromising on elite styling.", rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" }
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "300+", label: "Happy Families" },
  { value: "25+", label: "Designers Team" },
  { value: "12", label: "Cities Served" }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.tag === activeFilter;
    const matchesSearch = item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-neutral-50/50 min-h-screen text-zinc-900 overflow-x-hidden">
        
        {/* Header Block */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-600 uppercase tracking-widest text-xs font-bold bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-4 border border-amber-200">
              Curation & Inspiration
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 mb-4">
              Our Architectural Portfolio
            </h1>
            <p className="text-zinc-600 max-w-2xl mx-auto text-base sm:text-lg">
              Explore spaces meticulously curated to integrate ergonomic modern living with grand luxury statements.
            </p>
          </motion.div>
        </div>

        {/* 1. Portfolio Categories Section */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Design Niches We Excel In</h3>
            <div className="flex flex-wrap gap-2.5">
              {ALL_CATEGORIES_LIST.map((cat, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="bg-zinc-100 hover:bg-amber-50 hover:text-amber-800 text-zinc-800 text-xs sm:text-sm px-4 py-2 rounded-xl font-medium transition cursor-default border border-zinc-200/50"
                >
                  {cat}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Search & Filter Controls Grid */}
        <section className="max-w-7xl mx-auto px-6 py-4 grid md:grid-cols-3 gap-6 items-center">
          {/* 3. Filter Buttons */}
          <div className="md:col-span-2 flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeFilter === cat.id
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80 shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 4. Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by niche or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-sm text-zinc-900 placeholder-zinc-400"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* 2. Large Responsive Gallery */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-zinc-200/80 group flex flex-col justify-between h-full"
                >
                  <div className="overflow-hidden relative aspect-[4/3] bg-zinc-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-zinc-950/70 text-white text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4 border-t border-zinc-100 bg-white">
                    <h4 className="font-bold text-zinc-900 group-hover:text-amber-700 transition duration-300 text-sm sm:text-base">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
              <p className="text-zinc-400 text-sm">No items match your search parameter.</p>
            </div>
          )}
        </section>

        {/* 5. Featured Luxury Projects */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">Featured Luxury Flagships</h2>
            <p className="text-zinc-500 text-sm mt-1">Stunning turn-key transformations across tier-1 cities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((proj) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl overflow-hidden border border-zinc-200/60 shadow-xl shadow-zinc-200/40 group flex flex-col h-full"
              >
                <div className="overflow-hidden relative aspect-[16/10] bg-zinc-100">
                  <img
                    src={proj.src}
                    alt={proj.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-zinc-200 text-zinc-950 font-black px-3 py-1 rounded-xl text-xs shadow-sm">
                    {proj.budget}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-2">
                      <span className="bg-amber-50 px-2.5 py-1 rounded-md">{proj.style}</span>
                      <span className="text-zinc-400 font-medium flex items-center gap-1">
                        <svg className="h-3.5 w-3.5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        {proj.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950 leading-snug group-hover:text-amber-700 transition">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                    <div>
                      <span className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Super Area</span>
                      <span className="font-semibold text-zinc-800 text-sm">{proj.area}</span>
                    </div>
                    <div>
                      <span className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Timeline</span>
                      <span className="font-semibold text-zinc-800 text-sm">{proj.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Before & After Section */}
        <section className="bg-zinc-900 text-white py-16 my-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-white tracking-tight">Drastic Canvas Changes</h2>
              <p className="text-zinc-400 text-sm mt-2">See how our meticulous space planning reclaims unoptimized layouts.</p>
            </div>

            <div className="space-y-12">
              {BEFORE_AFTER_DATA.map((item) => (
                <div key={item.id} className="grid lg:grid-cols-5 gap-8 items-center border-b border-zinc-800 pb-10 last:border-b-0 last:pb-0">
                  <div className="lg:col-span-2 space-y-3">
                    <h3 className="text-xl font-bold text-amber-400">{item.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                      <img src={item.before} alt="Before" className="object-cover w-full h-56 sm:h-64" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                        <span className="bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">Before Work</span>
                      </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                      <img src={item.after} alt="After" className="object-cover w-full h-56 sm:h-64" />
                      <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                        <span className="bg-emerald-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">After HomeAura</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Design Inspiration Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">Design Architecture Inspirations</h2>
            <p className="text-zinc-500 text-sm mt-1">Curated catalog of styles currently setting trends globally.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSPIRATIONS.map((insp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-md group flex flex-col justify-between"
              >
                <div className="overflow-hidden aspect-[16/11] relative bg-zinc-100">
                  <img src={insp.src} alt={insp.title} loading="lazy" className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-zinc-900 group-hover:text-amber-700 transition duration-300 text-base mb-3">
                    {insp.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {insp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-zinc-100 text-zinc-500 text-[11px] px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 9. Statistics Section */}
        <section className="bg-amber-500 py-12 my-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">{stat.value}</div>
                <div className="text-zinc-900/80 text-xs sm:text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Customer Reviews Section */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">Verified Client Experiences</h2>
            <p className="text-zinc-500 text-sm mt-1">Read how we align timelines and design quality seamlessly for families.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-xl shadow-zinc-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-600 text-sm italic leading-relaxed mb-6">"{rev.text}"</p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-100">
                  <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/20" />
                  <div>
                    <h4 className="font-bold text-zinc-950 text-sm">{rev.name}</h4>
                    <span className="text-zinc-400 text-xs">{rev.location} Resident</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 10. Call To Action Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-zinc-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="relative z-10 space-y-5">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to Craft Your Luxury Sanctuary?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Schedule a complimentary site consult session with our core architects today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/booking"
                  className="bg-amber-500 text-zinc-950 font-bold px-8 py-4 rounded-xl text-sm transition hover:bg-amber-400 shadow-lg shadow-amber-500/10"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/booking"
                  className="border border-zinc-700 bg-zinc-800/40 text-white font-semibold px-8 py-4 rounded-xl text-sm transition hover:bg-zinc-800"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 blur-3xl rounded-full" />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}