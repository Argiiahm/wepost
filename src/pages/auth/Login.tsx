import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import * as v from "valibot";
import useAuth from "../../hooks/useAuth";

type Login = {
  email: string;
  password: string;
};

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, "Email is required"),
    v.email("Please enter a valid email address"),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters long"),
  ),
});

const Login = () => {
  const { getMe } = useAuth();
  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });

  // State for error messages & loading state
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //   handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = v.safeParse(LoginSchema, form, {
      abortPipeEarly: true,
    });

    if (!result.success) {
      const errors = result.issues.map((issue) => issue.message);
      setError(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.errors
            ? Object.values(data.errors)
            : [data.message || "Login failed"],
        );
        return;
      }

      localStorage.setItem("token", data.token);
      await getMe();
      await navigate("/", { replace: true });
    } catch (err: any) {
      setError([err.message || "An error occurred during login"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-8 space-y-3">
            <p className="text-xl font-semibold text-white">Welcome Weposts!</p>
            <p className="text-zinc-500">
              Enter your registered email address and password. <br />
              Good luck! ~ BisaHebat.
            </p>
            {error.length > 0 && (
              <div className="mb-4 rounded-md bg-zinc-800 p-4">
                {error.map((err, index) => (
                  <p key={index} className="text-white">
                    {err}
                  </p>
                ))}
              </div>
            )}
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-10 space-y-3">
              <div className="space-y-1">
                <div className="space-y-2">
                  <div className="flex flex-col gap-2.5 mb-3">
                    <label className="text-xs text-zinc-500">Email*</label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="bg-zinc-900 border border-none  rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-400 outline-none focus:outline-0 focus:border-zinc-900 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 mb-3">
                    <label className="text-xs text-zinc-500">Password*</label>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="bg-zinc-900 border border-none  rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-400 outline-none focus:outline-0 focus:border-zinc-900 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-white w-full py-2 mt-2 rounded-,md text-sm font-semibold hover:bg-zinc-300 transition-colors cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <span className="text-zinc-400">
              already have an account?{" "}
              <Link
                to="/register"
                className="text-[#2d82bf] font-bold cursor-pointer"
              >
                Sign up here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
