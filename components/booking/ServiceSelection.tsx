const services = [
  {
    id: 1,
    name: "1 BHK Interior Design",
    price: "₹24,999",
    duration: "2 Weeks",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },

  {
    id: 2,
    name: "2/3 BHK Complete Home Interior",
    price: "₹79,999",
    duration: "4-6 Weeks",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
  },

  {
    id: 3,
    name: "Modular Kitchen Design",
    price: "₹39,999",
    duration: "3 Weeks",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
  },
];

export default function ServiceSelection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={service.image}
            alt={service.name}
            className="h-56 w-full object-cover"
          />

          <div className="p-5">
            <h2 className="text-xl font-bold">
              {service.name}
            </h2>

            <p className="text-gray-500 mt-2">
              Duration: {service.duration}
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-4">
              {service.price}
            </p>

            <button className="mt-5 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-700">
              Select Service
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}