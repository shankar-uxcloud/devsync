import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGithub,
  FaUsers,
  FaTasks,
  FaCode,
  FaCheckCircle,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-8">
            <FaCode />
            AI Powered Developer Collaboration
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
            Build Better
            <br />

            <span className="text-blue-600">
              Software Together.
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 leading-9 max-w-xl">
            Manage projects, assign tasks, collaborate with your
            development team, chat in real-time and track every sprint
            from one beautiful dashboard.
          </p>

          {/* Features */}

          <div className="mt-10 grid grid-cols-2 gap-5">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <span>Project Management</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <span>Kanban Board</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <span>Real-time Chat</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <span>JWT Authentication</span>
            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-12">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              to="/dashboard"
              className="bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition px-8 py-4 rounded-xl"
            >
              Live Demo
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          {/* Floating Badge */}

          <div className="absolute -top-6 -left-8 bg-white shadow-xl rounded-2xl p-5">

            <h3 className="text-3xl font-bold text-blue-600">
              12K+
            </h3>

            <p className="text-gray-500">
              Developers
            </p>

          </div>

          {/* Floating Badge */}

          <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-5">

            <h3 className="text-3xl font-bold text-green-600">
              99.9%
            </h3>

            <p className="text-gray-500">
              Uptime
            </p>

          </div>

          {/* Dashboard */}

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Top */}

            <div className="bg-slate-900 p-5 flex justify-between items-center">

              <h2 className="text-white font-bold text-xl">
                DevSync Dashboard
              </h2>

              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                Online
              </span>

            </div>

            <div className="p-8 space-y-6">

              {/* Card */}

              <div className="bg-slate-100 rounded-2xl p-5 flex justify-between items-center">

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center">

                    <FaTasks />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">

                      Tasks Completed

                    </h3>

                    <p className="text-gray-500">

                      124 Finished

                    </p>

                  </div>

                </div>

                <span className="text-green-600 font-bold">
                  +18%
                </span>

              </div>

              {/* Card */}

              <div className="bg-slate-100 rounded-2xl p-5 flex justify-between items-center">

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-purple-600 text-white flex items-center justify-center">

                    <FaUsers />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">

                      Team Members

                    </h3>

                    <p className="text-gray-500">

                      32 Active

                    </p>

                  </div>

                </div>

                <span className="text-green-600 font-bold">
                  +6
                </span>

              </div>

              {/* Card */}

              <div className="bg-slate-100 rounded-2xl p-5 flex justify-between items-center">

                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-xl bg-black text-white flex items-center justify-center">

                    <FaGithub />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">

                      GitHub Sync

                    </h3>

                    <p className="text-gray-500">

                      Connected Successfully

                    </p>

                  </div>

                </div>

                <span className="text-green-600 font-bold">
                  ✓
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;