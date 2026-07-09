const projects = [
  {
    id: 1,
    title: "Modern Living Room",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },
  {
    id: 2,
    title: "Luxury Bedroom",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600",
  },
  {
    id: 3,
    title: "Minimal Kitchen",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Our Portfolio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}