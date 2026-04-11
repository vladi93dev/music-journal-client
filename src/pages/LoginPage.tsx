// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="w-full max-w-sm p-8 bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-teal-400 mb-1">Music Journal</h1>
      <p className="text-slate-400 text-sm mb-8">Sign in to your account</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  </div>
);
}