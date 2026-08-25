import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaMapMarkerAlt,
  FaUser,
  FaEdit,
  FaTimes,
  FaSave,
  FaBriefcase,
} from "react-icons/fa";

const defaultProfile = {
  name: "Alex Morgan",
  age: "24",
  gender: "Male",
  profession: "Full Stack Developer",
  domain: "Web Development",
  category: "Software Development",
  experience: "2–4 years",
  location: "Bengaluru, India",
  email: "alex@devsync.demo",
  github: "@alexmorgan",
  workspace: "Developer Workspace",
  availability: "Available for collaboration",
  bio: "Full Stack Developer working across React, Node.js, MongoDB and modern collaboration workflows inside DevSync.",
};

const options = {
  gender: ["Male", "Female", "Non-binary", "Prefer not to say"],
  profession: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Engineer",
    "AI/ML Engineer",
    "UI/UX Designer",
    "Product Manager",
    "Student",
    "Other",
  ],
  domain: [
    "Web Development",
    "Mobile Development",
    "Software Engineering",
    "AI & Machine Learning",
    "Data Science",
    "Cloud & DevOps",
    "Cybersecurity",
    "Game Development",
    "UI/UX",
    "Other",
  ],
  category: [
    "Software Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "AI / ML",
    "Data",
    "Cloud",
    "Cybersecurity",
    "Design",
    "Management",
    "Other",
  ],
  experience: [
    "Fresher",
    "Less than 1 year",
    "1–2 years",
    "2–4 years",
    "4–7 years",
    "7+ years",
  ],
  availability: [
    "Available for collaboration",
    "Available part-time",
    "Busy",
    "Not available",
  ],
};

function DemoProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("devsync-demo-profile");
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [draft, setDraft] = useState(profile);
  const [showEdit, setShowEdit] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("devsync-demo-profile", JSON.stringify(profile));
  }, [profile]);

  const openEditor = () => {
    setDraft(profile);
    setShowEdit(true);
    setSavedMessage("");
  };

  const closeEditor = () => {
    setDraft(profile);
    setShowEdit(false);
  };

  const updateField = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const saveProfile = (event) => {
    event.preventDefault();

    setProfile(draft);
    setShowEdit(false);
    setSavedMessage("Profile updated successfully.");

    window.setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* TOP BAR */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-5 backdrop-blur md:px-8">
        <Link to="/demo" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <FaCode />
          </div>

          <span className="text-xl font-black">
            Dev<span className="text-blue-500">Sync</span>
          </span>
        </Link>

        <Link
          to="/demo"
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <FaArrowLeft />
          <span className="hidden sm:block">Back to Workspace</span>
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">

        {/* PROFILE HERO */}
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

          <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 md:h-48" />

          <div className="relative px-6 pb-7 md:px-10">

            <div className="-mt-16 flex flex-col gap-5 md:-mt-20 md:flex-row md:items-end md:justify-between">

              <div className="flex flex-col gap-5 md:flex-row md:items-end">

                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-8 border-slate-900 bg-gradient-to-br from-blue-500 to-indigo-600 text-5xl font-black shadow-2xl md:h-40 md:w-40 md:text-6xl">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div className="pb-1">

                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black md:text-4xl">
                      {profile.name}
                    </h1>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400">
                      ONLINE
                    </span>
                  </div>

                  <p className="mt-2 text-lg text-slate-400">
                    {profile.profession}
                  </p>

                </div>

              </div>

              <button
                onClick={openEditor}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <FaEdit />
                Edit Profile
              </button>

            </div>

          </div>
        </section>

        {/* SUCCESS MESSAGE */}
        {savedMessage && (
          <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-400">
            ✓ {savedMessage}
          </div>
        )}

        {/* QUICK INFO */}
        <section className="mt-7 grid gap-5 md:grid-cols-3">

          <InfoCard
            icon={<FaEnvelope />}
            label="EMAIL"
            value={profile.email}
            iconClass="text-blue-400"
          />

          <InfoCard
            icon={<FaGithub />}
            label="GITHUB"
            value={profile.github}
            iconClass="text-white"
          />

          <InfoCard
            icon={<FaMapMarkerAlt />}
            label="LOCATION"
            value={profile.location}
            iconClass="text-red-400"
          />

        </section>

        {/* ABOUT */}
        <section className="mt-7 rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-8">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FaUser />
            </div>

            <div>
              <h2 className="text-xl font-black">About {profile.name.split(" ")[0]}</h2>
              <p className="text-sm text-slate-500">Developer profile</p>
            </div>
          </div>

          <p className="mt-7 text-base leading-8 text-slate-300">
            {profile.bio}
          </p>

        </section>

        {/* PROFESSIONAL DETAILS */}
        <section className="mt-7 rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-8">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FaBriefcase />
            </div>

            <div>
              <h2 className="text-xl font-black">Professional Details</h2>
              <p className="text-sm text-slate-500">
                Information about your developer identity
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Detail label="Profession" value={profile.profession} />
            <Detail label="Domain" value={profile.domain} />
            <Detail label="Category" value={profile.category} />
            <Detail label="Experience" value={profile.experience} />
            <Detail label="Gender" value={profile.gender} />
            <Detail label="Age" value={`${profile.age} years`} />
            <Detail label="Workspace" value={profile.workspace} />
            <Detail label="Availability" value={profile.availability} />

          </div>

        </section>

      </main>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >

          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 md:px-8">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                  Profile
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your developer information.
                </p>
              </div>

              <button
                onClick={closeEditor}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={saveProfile}
              className="max-h-[calc(92vh-170px)] overflow-y-auto px-6 py-6 md:px-8"
            >

              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label="Full Name"
                  value={draft.name}
                  onChange={(value) => updateField("name", value)}
                  placeholder="Enter your name"
                />

                <InputField
                  label="Age"
                  type="number"
                  min="13"
                  max="100"
                  value={draft.age}
                  onChange={(value) => updateField("age", value)}
                  placeholder="Enter your age"
                />

                <SelectField
                  label="Gender"
                  value={draft.gender}
                  options={options.gender}
                  onChange={(value) => updateField("gender", value)}
                />

                <SelectField
                  label="Profession"
                  value={draft.profession}
                  options={options.profession}
                  onChange={(value) => updateField("profession", value)}
                />

                <SelectField
                  label="Domain"
                  value={draft.domain}
                  options={options.domain}
                  onChange={(value) => updateField("domain", value)}
                />

                <SelectField
                  label="Category"
                  value={draft.category}
                  options={options.category}
                  onChange={(value) => updateField("category", value)}
                />

                <SelectField
                  label="Experience"
                  value={draft.experience}
                  options={options.experience}
                  onChange={(value) => updateField("experience", value)}
                />

                <SelectField
                  label="Availability"
                  value={draft.availability}
                  options={options.availability}
                  onChange={(value) => updateField("availability", value)}
                />

                <InputField
                  label="Location"
                  value={draft.location}
                  onChange={(value) => updateField("location", value)}
                  placeholder="e.g. Bengaluru, India"
                />

                <InputField
                  label="Email"
                  type="email"
                  value={draft.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="you@example.com"
                />

                <InputField
                  label="GitHub"
                  value={draft.github}
                  onChange={(value) => updateField("github", value)}
                  placeholder="@username"
                />

                <InputField
                  label="Workspace"
                  value={draft.workspace}
                  onChange={(value) => updateField("workspace", value)}
                  placeholder="Developer Workspace"
                />

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-300">
                    About / Bio
                  </label>

                  <textarea
                    rows="4"
                    value={draft.bio}
                    onChange={(event) => updateField("bio", event.target.value)}
                    placeholder="Tell your team about yourself..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

              </div>

              {/* ACTIONS */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  <FaSave />
                  Save Changes
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

function InfoCard({ icon, label, value, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
      <div className={`text-lg ${iconClass}`}>{icon}</div>
      <p className="mt-4 text-xs font-black tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 truncate text-base font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-300">
        {label}
      </label>

      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DemoProfile;