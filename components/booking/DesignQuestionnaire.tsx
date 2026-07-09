export default function DesignQuestionnaire() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Tell Us About Your Project
      </h2>

      <div className="grid gap-5">

        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 rounded-xl"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="City (e.g. Mumbai, Delhi, Pune)"
          className="border p-3 rounded-xl"
        />

        <select className="border p-3 rounded-xl">

          <option>Room Type</option>

          <option>Living Room</option>

          <option>Bedroom</option>

          <option>Kitchen</option>

          <option>Office</option>

          <option>Entire Home</option>

        </select>

        <select className="border p-3 rounded-xl">

          <option>Preferred Style</option>

          <option>Modern</option>

          <option>Minimal</option>

          <option>Contemporary</option>

          <option>Luxury</option>

          <option>Traditional Indian</option>

          <option>Bohemian</option>

        </select>

        <select className="border p-3 rounded-xl">

          <option>Budget Range</option>

          <option>₹50,000 - ₹1 Lakh</option>

          <option>₹1 Lakh - ₹3 Lakhs</option>

          <option>₹3 Lakhs - ₹5 Lakhs</option>

          <option>Above ₹5 Lakhs</option>

        </select>

        <textarea
          placeholder="Tell us about your dream home..."
          className="border p-3 rounded-xl h-32"
        ></textarea>

      </div>

    </div>
  );
}