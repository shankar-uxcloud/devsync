import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import API from "../../api/axios";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(
    searchParams.get("email") || ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/auth/forgot-password",
        {
          email: cleanEmail,
        }
      );

      setMessage(
        response.data?.message ||
          "If an account exists with this email, a password reset link has been sent."
      );
    } catch (err) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] px-6 py-10 text-white">

      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* BACK */}

          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-white"
          >
            <FaArrowLeft />
            Back to login
          </Link>


          {/* CARD */}

          <div className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-8 shadow-2xl">

            <div className="mb-8">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <FaEnvelope />
              </div>

              <h1 className="text-2xl font-black">
                Forgot password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the email address associated with
                your DevSync account and we'll send you
                a password reset link.
              </p>

            </div>


            {/* SUCCESS */}

            {message && (
              <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

                <div className="flex gap-3">

                  <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-400" />

                  <p className="text-xs leading-5 text-emerald-300">
                    {message}
                  </p>

                </div>

              </div>
            )}


            {/* ERROR */}

            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

                <p className="text-xs leading-5 text-red-300">
                  {error}
                </p>

              </div>
            )}


            {!message && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-400">
                    Email address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-600" />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Sending..."
                    : "Send reset link"}
                </button>

              </form>
            )}


            {message && (
              <Link
                to="/login"
                className="block w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-black text-white transition hover:bg-blue-500"
              >
                Return to login
              </Link>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}