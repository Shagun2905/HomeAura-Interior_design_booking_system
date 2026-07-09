"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, Paintbrush, Calendar, Clock, User, Mail, Phone, MapPin, 
  Layers, Wallet, FileText, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles 
} from "lucide-react";

const services = [
  { name: "1 BHK Interior Design", basePrice: 24999, description: "Smart and space-optimized interior setup for compact homes." },
  { name: "2/3 BHK Complete Interior", basePrice: 79999, description: "Premium end-to-end custom interiors designed for modern families." },
  { name: "Modular Kitchen Design", basePrice: 39999, description: "Ergonomic, sleek kitchen concepts with high-grade modular fittings." },
];

const homeTypes = ["1 BHK", "2/3 BHK", "Villa", "Penthouse"];
const quickAreas = [500, 1000, 1500, 2000];
const interiorStyles = [
  { name: "Modern", multiplier: 1.0, desc: "Clean lines & bold patterns" },
  { name: "Luxury", multiplier: 1.4, desc: "Premium finishes & textures" },
  { name: "Minimal", multiplier: 0.9, desc: "Clutter-free & functional" },
  { name: "Classic", multiplier: 1.2, desc: "Timeless & elegant details" },
];

const budgets = ["₹2L - ₹5L", "₹5L - ₹10L", "₹10L - ₹15L", "15L+"];
const cities = ["Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Chennai"];

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const steps = [
  { id: 1, title: "Service & Style" },
  { id: 2, title: "Property Details" },
  { id: 3, title: "Schedule & Contact" }
];

export default function BookingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Unified State Object matching expectations and backward compatibility logic
  const [formData, setFormData] = useState({
    service: "",
    homeType: "2/3 BHK",
    area: 1000,
    style: "Modern",
    budget: "₹5L - ₹10L",
    city: "Bangalore",
    date: "",
    slot: "",
    name: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const clean = { ...prev };
        delete clean[field];
        return clean;
      });
    }
  };

  // Live Pricing and Duration Calculations
  const selectedServiceObj = services.find(s => s.name === formData.service);
  const selectedStyleObj = interiorStyles.find(st => st.name === formData.style);
  
  const baseCost = selectedServiceObj ? selectedServiceObj.basePrice : 50000;
  const styleMultiplier = selectedStyleObj ? selectedStyleObj.multiplier : 1.0;
  const areaFactor = formData.area / 1000;
  const estimatedCost = Math.round(baseCost * styleMultiplier * areaFactor);
  
  const estimatedDuration = formData.area > 1500 ? "6-8 Weeks" : formData.area > 800 ? "4-6 Weeks" : "3-4 Weeks";

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !formData.service) newErrors.service = "Please select an interior service to continue.";
    if (step === 2 && (!formData.area || formData.area < 100)) newErrors.area = "Please provide a valid square footage area.";
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = "Full name is required.";
      if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Please enter a valid email address.";
      if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit mobile number.";
      if (!formData.date) newErrors.date = "Please select a consultation date.";
      if (!formData.slot) newErrors.slot = "Please select a preferred time slot.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleBooking = async () => {
    if (!validateStep()) return;

    setLoading(true);

    // Map new custom states seamlessly into existing required backend contract variables
    const bookingData = {
      clientName: formData.name,
      clientEmail: formData.email,
      phone: formData.phone,
      room: `${formData.homeType} (${formData.area} sq.ft, ${formData.style} Style, ${formData.city})`,
      service: formData.service,
      appointmentDate: `${formData.date} ${formData.slot}`,
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/success");
        }, 1800);
      } else {
        alert(data.message || "Booking submission failed.");
      }
    } catch (error) {
      alert("Something went wrong connecting to our servers.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-stone-100 flex flex-col items-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Consultation Reserved!</h2>
          <p className="text-stone-500 mb-4">Your design journey with our interior premium experts is officially booked.</p>
          <div className="w-full bg-stone-50 rounded-lg p-3 text-stone-600 text-sm font-medium">
            Redirecting to confirmation portal...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50/60 pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <span className="text-amber-800 tracking-widest text-xs uppercase font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Premium Design Experience
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 mt-4 mb-3">
          Book Your Dream Consultation
        </h1>
        <p className="text-stone-600 text-sm md:text-base">
          Collaborate with top-tier interior experts to configure bespoke aesthetics tailored completely around your lifestyle.
        </p>
      </div>

      {/* Progress Multi-step Tracker */}
      <div className="max-w-xl mx-auto mb-12 relative flex justify-between items-center px-4">
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-stone-200 -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 top-1/2 h-[2px] bg-amber-800 -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((item) => (
          <div key={item.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
              step >= item.id ? "bg-amber-800 text-white shadow-md scale-105" : "bg-white border-2 border-stone-300 text-stone-500"
            }`}>
              {step > item.id ? <CheckCircle2 className="w-5 h-5" /> : item.id}
            </div>
            <span className={`text-[11px] font-semibold tracking-tight mt-2 whitespace-nowrap ${step >= item.id ? "text-amber-900 font-bold" : "text-stone-400"}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Core Segment Area */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Dynamic Interactive Left Layout Form Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8 min-h-[500px] flex flex-col justify-between transition-all duration-300">
          <div>
            {/* STEP 1: SERVICE & STYLE CONFIGURATION */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-4">
                    <Paintbrush className="w-5 h-5 text-amber-800" /> Choose Interior Premium Service
                  </h3>
                  {errors.service && <p className="text-red-500 text-xs font-medium mb-3">{errors.service}</p>}
                  <div className="grid md:grid-cols-3 gap-4">
                    {services.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => updateField("service", item.name)}
                        className={`group relative border rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                          formData.service === item.name 
                            ? "border-amber-800 bg-amber-50/30 ring-1 ring-amber-800" 
                            : "border-stone-200 hover:border-stone-400 bg-white"
                        }`}
                      >
                        <div>
                          <h4 className="font-semibold text-stone-800 text-base mb-1 group-hover:text-amber-900">{item.name}</h4>
                          <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
                        </div>
                        <p className="text-amber-800 font-mono font-bold text-xl mt-4 pt-3 border-t border-stone-100">
                          ₹{item.basePrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-800" /> Select Visual Theme & Aesthetics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interiorStyles.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => updateField("style", item.name)}
                        className={`border rounded-xl p-4 cursor-pointer text-center transition-all duration-200 ${
                          formData.style === item.name 
                            ? "border-amber-800 bg-amber-800 text-white shadow-sm" 
                            : "border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-700"
                        }`}
                      >
                        <span className="font-medium text-sm block">{item.name}</span>
                        <span className={`text-[10px] block mt-0.5 ${formData.style === item.name ? "text-amber-100" : "text-stone-400"}`}>
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROPERTY ATTRIBUTES ENTRY */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-4">
                    <Home className="w-5 h-5 text-amber-800" /> Configuration Floor Plan
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {homeTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("homeType", type)}
                        className={`p-3 text-sm font-medium rounded-xl border transition-all ${
                          formData.homeType === type 
                            ? "bg-stone-900 border-stone-900 text-white shadow-sm" 
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <label className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-amber-800" /> Total Built-Up Carpet Area (sq.ft.)
                  </label>
                  {errors.area && <p className="text-red-500 text-xs font-medium mb-2">{errors.area}</p>}
                  <div className="flex gap-3 mb-3">
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      value={formData.area}
                      onChange={(e) => updateField("area", Number(e.target.value))}
                      className="border border-stone-200 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800 font-medium"
                      placeholder="e.g. 1200"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickAreas.map((sqft) => (
                      <button
                        key={sqft}
                        type="button"
                        onClick={() => updateField("area", sqft)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                          formData.area === sqft 
                            ? "bg-amber-50 border-amber-800 text-amber-900" 
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        {sqft === 2000 ? "2000+ sq.ft." : `${sqft} sq.ft.`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                  <div>
                    <h3 className="text-base font-medium text-stone-900 flex items-center gap-2 mb-3">
                      <Wallet className="w-4 h-4 text-amber-800" /> Anticipated Investment Budget
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => updateField("budget", b)}
                          className={`p-2.5 text-xs font-semibold rounded-lg border transition-all ${
                            formData.budget === b 
                              ? "bg-stone-900 border-stone-900 text-white" 
                              : "bg-white border-stone-200 hover:border-stone-300 text-stone-600"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-stone-900 flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-amber-800" /> Operational Metro Location
                    </h3>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full border border-stone-200 rounded-xl px-3 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-700 font-medium"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONSULTATION SCHEDULING & CUSTOMER CONTRACT */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-stone-900 flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-amber-800" /> Contact Identity Credentials
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <input
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Full Name"
                        className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 ${errors.name ? 'border-red-500' : 'border-stone-200'}`}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Email Address"
                        type="email"
                        className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 ${errors.email ? 'border-red-500' : 'border-stone-200'}`}
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                      <input
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="10-Digit Mobile"
                        type="tel"
                        className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 ${errors.phone ? 'border-red-500' : 'border-stone-200'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-800 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-800" /> Target Meeting Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 ${errors.date ? 'border-red-500' : 'border-stone-200'}`}
                    />
                    {errors.date && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-800 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-800" /> Priority Hours Window
                    </label>
                    <select
                      value={formData.slot}
                      onChange={(e) => updateField("slot", e.target.value)}
                      className={`w-full border rounded-xl p-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 ${errors.slot ? 'border-red-500' : 'border-stone-200'}`}
                    >
                      <option value="">Choose Timing Slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.slot && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.slot}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <label className="block text-sm font-medium text-stone-800 mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-800" /> Additional Style Directives & Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => updateField("requirements", e.target.value)}
                    placeholder="Describe specific preferences (e.g. walk-in wardrobe needed, balcony seating, open kitchen approach...)"
                    className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-800 placeholder-stone-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigational Step Footprint Triggers */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-stone-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm font-medium transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition ml-auto shadow-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleBooking}
                className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-7 py-3 rounded-xl text-sm font-semibold transition ml-auto shadow-md disabled:opacity-55"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Finalizing Booking...
                  </>
                ) : "Confirm Professional Consultation"}
              </button>
            )}
          </div>
        </div>

        {/* Live Estimator Dashboard & Booking Summary Card Panel */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl shadow-xl border border-stone-800 p-6 space-y-6 sticky top-28">
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-1">Live Calculation Matrix</h3>
            <h2 className="text-xl font-serif font-semibold text-white">Project Estimator</h2>
          </div>

          <div className="space-y-3 font-medium text-sm border-b border-stone-800 pb-5">
            <div className="flex justify-between">
              <span className="text-stone-400">Selected Scope</span>
              <span className="text-stone-200 text-right max-w-[180px] truncate">{formData.service || "None Selected"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Theme Aesthetic</span>
              <span className="text-stone-200">{formData.style} Theme</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Built-up Scale</span>
              <span className="text-stone-200">{formData.homeType} / {formData.area} sq.ft.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Location Center</span>
              <span className="text-stone-200">{formData.city}</span>
            </div>
          </div>

          {/* Dynamic Calculated Matrices Output blocks */}
          <div className="bg-stone-800/60 rounded-xl p-4 border border-stone-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-stone-400 block uppercase font-bold tracking-wider mb-0.5">Duration Target</span>
              <span className="text-base font-semibold text-white">{estimatedDuration}</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block uppercase font-bold tracking-wider mb-0.5">Est. Total Cost</span>
              <span className="text-base font-mono font-bold text-amber-400">
                ₹{estimatedCost.toLocaleString("en-IN")}*
              </span>
            </div>
          </div>

          {/* Current Milestone Appointment Schedule Overview Block */}
          <div className="border-t border-stone-800 pt-4 space-y-2.5 text-xs text-stone-400">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Meeting Date: <strong className="text-stone-200">{formData.date || "Not set yet"}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Time Horizon: <strong className="text-stone-200">{formData.slot || "Not designated"}</strong></span>
            </p>
          </div>

          <div className="text-[10px] text-stone-500 leading-normal pt-2">
            *This estimation provides standard turnkey variables framework metrics. Actual material layout quotes might adapt following detailed architecture measurements.
          </div>
        </div>
      </div>
    </main>
  );
}