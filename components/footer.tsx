import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-4 gap-10">

        {/* Company */}

        <div>

          <h2 className="text-3xl font-bold mb-4">
            HomeAura Interiors
          </h2>

          <p className="text-gray-300 leading-7">
            Premium Interior Design Services for Homes,
            Apartments and Modular Kitchens across India.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <Link href="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>

            <li>
              <Link href="/portfolio" className="hover:text-yellow-400">
                Portfolio
              </Link>
            </li>

            <li>
              <Link href="/booking" className="hover:text-yellow-400">
                Booking
              </Link>
            </li>

          </ul>

        </div>

        {/* Services */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-3">

            <li>1 BHK Interior</li>

            <li>2/3 BHK Interior</li>

            <li>Modular Kitchen</li>

            <li>Wardrobe Design</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p>Email: contact@homeaura.com</p>

          <p className="mt-2">
            Phone: +91 98765 43210
          </p>

          <p className="mt-2">
            Delhi, India
          </p>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center text-gray-400">

        © 2026 HomeAura Interiors. All Rights Reserved.

      </div>

    </footer>
  );
}