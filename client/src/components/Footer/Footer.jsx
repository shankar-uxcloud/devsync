function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h1 className="text-4xl font-bold">

              DevSync

            </h1>

            <p className="mt-6 text-gray-400 leading-8">

              Build software together with powerful project management
              and real-time collaboration.

            </p>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-6">

              Product

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Features</li>

              <li>Pricing</li>

              <li>Roadmap</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-6">

              Company

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>About</li>

              <li>Blog</li>

              <li>Careers</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-6">

              Support

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Help Center</li>

              <li>Privacy</li>

              <li>Contact</li>

            </ul>

          </div>

        </div>

        <hr className="border-slate-700 my-12" />

        <div className="text-center text-gray-500">

          © 2026 DevSync. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;