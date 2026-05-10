import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import * as v from "valibot";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type FormRegister = {
  username: string;
  name: string;
  email: string;
  password: string;
};

const schemaRegister = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(6, "username minimum 6 character.."),
    v.maxLength(14, "username maximum 14 character.."),
  ),

  name: v.pipe(
    v.string(),
    v.minLength(3, "name minimum 3 character.."),
    v.maxLength(32, "name maximum 32 character.."),
  ),

  email: v.pipe(v.string(), v.minLength(1, "email is required..")),

  password: v.pipe(
    v.string(),
    v.minLength(8, "password at least 8 character.."),
  ),
});

const Register = () => {
  const [form, setForm] = useState<FormRegister>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError([]);

    const result = v.safeParse(schemaRegister, form, {
      abortPipeEarly: true,
    });

    if (!result.success) {
      const errors = result.issues.map((issue) => issue.message);

      setError(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseURL}/register`, {
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
          data.errors ? Object.values(data.errors).flat() : [data.message],
        );

        return;
      }

      toast.success("Register successfully...");
      navigate("/login");
    } catch (err: any) {
      setError([err.message]);
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
              Enter your data for create a account.
              <br />
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
              <div className="flex flex-col gap-2.5 mb-3">
                <label className="text-xs text-zinc-500">Username*</label>

                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5 mb-3">
                <label className="text-xs text-zinc-500">Name*</label>

                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5 mb-3">
                <label className="text-xs text-zinc-500">Email*</label>

                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5 mb-3">
                <label className="text-xs text-zinc-500">Password*</label>

                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="rounded-lg bg-zinc-900 px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-md bg-white py-2 text-sm font-semibold transition-colors hover:bg-zinc-300"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>

            <span className="text-zinc-400">
              already an account?{" "}
              <Link
                to="/login"
                className="cursor-pointer font-bold text-[#2d82bf]"
              >
                Sign in here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
