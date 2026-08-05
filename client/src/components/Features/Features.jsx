import {
  FaTasks,
  FaComments,
  FaUsers,
  FaBell,
  FaChartLine,
  FaCloudUploadAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTasks />,
    title: "Task Management",
    desc: "Create, assign and track tasks with Kanban boards.",
  },
  {
    icon: <FaComments />,
    title: "Real-time Chat",
    desc: "Instant communication using Socket.io.",
  },
  {
    icon: <FaUsers />,
    title: "Team Collaboration",
    desc: "Invite members and manage permissions.",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
    desc: "Never miss project updates.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics",
    desc: "Track sprint progress and productivity.",
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "Cloud Storage",
    desc: "Upload files securely for your projects.",
  },
];

function Features() {
  return (
    <section className="bg-slate-100 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">

            Powerful Features

          </h2>

          <p className="text-gray-500 text-xl mt-6">

            Everything needed to manage modern development teams.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition duration-300"
            >

              <div className="text-blue-600 text-5xl">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">

                {feature.title}

              </h3>

              <p className="text-gray-500 mt-5 leading-8">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;