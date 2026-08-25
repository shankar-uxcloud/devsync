import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import API from "../../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid password reset link.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      if (response.data?.success) {
        setSuccess(true);
      } else {
        setError(
          response.data?.message ||
            "Unable to reset password."
        );
      }
    } catch (err) {
      console.error(
        "RESET PASSWORD ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Password reset link is invalid or has expired."
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

            {!success ? (
              <>

                {/* HEADER */}

                <div className="mb-8">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <FaLock />
                  </div>

                  <h1 className="text-2xl font-black">
                    Create new password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter a new password for your
                    DevSync account.
                  </p>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

                    <p className="text-xs leading-5 text-red-300">
                      {error}
                    </p>

                  </div>
                )}


                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* PASSWORD */}

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-400">
                      New password
                    </label>

                    <div className="relative">

                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-600" />

                      <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                          setPassword(
                            event.target.value
                          )
                        }
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
                      />

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-400">
                      Confirm password
                    </label>

                    <div className="relative">

                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-600" />

                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(
                            event.target.value
                          )
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
                      />

                    </div>

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Updating..."
                      : "Update password"}
                  </button>

                </form>

              </>
            ) : (

              /* SUCCESS */

              <div className="text-center">

                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <FaCheckCircle />
                </div>

                <h1 className="text-2xl font-black">
                  Password updated
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Your DevSync password has been
                  successfully changed.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
                  className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                >
                  Go to login
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}