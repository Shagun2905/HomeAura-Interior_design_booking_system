"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  phone: string;
  room: string;
  service: string;
  appointmentDate: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt?: string;
}

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Show temporary toast notification helper
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth Guard Gatekeeper Check
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      router.push("/admin/login");
    } else {
      fetchBookings();
    }
  }, [router]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/booking");
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showToast("Failed to fetch recent bookings.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Memoized Search Logic
  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter(
      (b) =>
        b.clientName?.toLowerCase().includes(query) ||
        b.clientEmail?.toLowerCase().includes(query) ||
        b.service?.toLowerCase().includes(query)
    );
  }, [search, bookings]);

  // Memoized Analytics Metrics Computations
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const revenue = total * 25000; // Legacy math preserved exactly
    return { total, confirmed, revenue };
  }, [bookings]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/booking/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus as Booking["status"] } : b))
        );
        showToast(`Status updated to ${newStatus} successfully.`);
      } else {
        showToast(data.message || "Status update failed.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Server communication breakdown occurred.", "error");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking?")) return;
    try {
      const response = await fetch(`/api/booking/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        showToast("Booking permanently purged.", "success");
      } else {
        showToast("Delete operation failed.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to process request.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const getStatusBadgeStyles = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Completed": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "Cancelled": return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default: return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Toast Alert Element Block */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl border text-sm transition-all duration-300 animate-bounce ${
          toast.type === "error" ? "bg-rose-950 border-rose-800 text-rose-200" : "bg-stone-900 border-stone-800 text-amber-400"
        }`}>
          {toast.message}
        </div>
      )}

      {/* Top Header Controls Architecture Panel */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-stone-800/80 pb-8 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            Home Aura Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Displaying {filteredBookings.length} filtered results out of {stats.total} total system parameters.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by client, email, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900/60 border border-stone-800 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none transition duration-200"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-2.5 text-xs text-stone-500 hover:text-stone-300">
                Clear
              </button>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-rose-400 border border-stone-800 text-sm font-medium px-4 py-2.5 rounded-xl transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Grid Summary Analytics Stat Blocks Section */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
        {[
          { label: "Total Operations Booked", value: stats.total, color: "text-white" },
          { label: "Confirmed Pipelines", value: stats.confirmed, color: "text-emerald-400" },
          { label: "Estimated System Revenue", value: `\u20B9${stats.revenue.toLocaleString("en-IN")}`, color: "text-amber-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-stone-900/40 border border-stone-800/60 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">{stat.label}</p>
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mt-3 tracking-tight ${stat.color}`}>
              {stat.value}
            </h2>
          </div>
        ))}
      </section>

      {/* Data Presentation Table Matrix Wrap Box */}
      <section className="bg-stone-900/30 border border-stone-800/70 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-stone-800">
          <table className="w-full border-collapse text-left text-sm text-stone-300">
            <thead className="bg-stone-900/80 border-b border-stone-800/80 text-stone-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                {["Client / Contact", "Room Classification", "Interior Service Focus", "Target Schedule", "Status State", "Management Actions"].map((h, idx) => (
                  <th key={idx} className={`p-4 font-semibold ${idx >= 4 ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-900">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-12 text-stone-500 font-medium">
                    Querying secure database arrays...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-12 text-stone-500 font-medium">
                    No matching booking objects discovered.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-stone-900/40 transition-colors duration-150">
                    <td className="p-4">
                      <div className="font-semibold text-white">{b.clientName}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{b.clientEmail}</div>
                      <div className="text-xs text-stone-400 font-mono mt-0.5">{b.phone}</div>
                    </td>
                    <td className="p-4 align-middle text-stone-200">{b.room}</td>
                    <td className="p-4 align-middle font-medium text-stone-300 max-w-[180px] truncate">{b.service}</td>
                    <td className="p-4 align-middle text-stone-400 whitespace-nowrap">{b.appointmentDate}</td>
                    <td className="p-4 align-middle text-center">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateStatus(b._id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-3 py-1.5 focus:outline-none border cursor-pointer transition ${getStatusBadgeStyles(b.status)}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-stone-950 text-stone-300">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 align-middle text-center">
                      <button
                        onClick={() => handleDeleteBooking(b._id)}
                        className="bg-transparent hover:bg-rose-500/10 text-stone-500 hover:text-rose-400 border border-stone-800 hover:border-rose-500/20 text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-12 text-center text-xs tracking-widest text-stone-600 uppercase font-medium">
        Home Aura Interior Design &copy; 2026 Admin Management Portal
      </footer>
    </main>
  );
}