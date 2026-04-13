// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEntries, createEntry, deleteEntry } from "../api";
import type { Entry, Genre } from "../types";

const GENRES: Genre[] = [
  "Rock", "Pop", "Jazz", "Hip-Hop", "Classical",
  "R&B", "Electronic", "Country", "Metal", "Folk"
];

const emptyForm = { title: "", artist: "", genre: "Rock" as Genre, rating: "", note: "" };

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getEntries()
      .then(data => {
        setEntries(data);
      })
      .catch(() => setError("Failed to load entries"))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newEntry = await createEntry({
        title: form.title,
        artist: form.artist,
        genre: form.genre,
        rating: form.rating ? Number(form.rating) : undefined,
        note: form.note || undefined,
      });
      setEntries((prev) => [newEntry, ...prev]);
      setShowModal(false);
      setForm(emptyForm);
    } catch (err: any) {
      setError(err.message || "Failed to create entry");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <h1 className="text-xl font-bold text-teal-400">Music Journal</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Your Entries</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + New Entry
          </button>
        </div>

        {loading && <p className="text-slate-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && entries.length === 0 && (
          <p className="text-slate-400">No entries yet. Add your first one.</p>
        )}

        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => navigate(`/entries/${entry.id}`)}
              className="bg-slate-900 rounded-xl px-6 py-4 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{entry.title}</h3>
                  <p className="text-slate-400 text-sm">{entry.artist}</p>
                </div>
                <div className="text-right">
                  <span className="text-teal-400 text-sm">{entry.genre}</span>
                  <p className="text-slate-500 text-xs mt-1">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-6">New Entry</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-400">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-400">Artist</label>
                <input
                  type="text"
                  value={form.artist}
                  onChange={(e) => setForm({ ...form, artist: e.target.value })}
                  required
                  className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-400">Genre</label>
                <select
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value as Genre })}
                  className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-400">Rating (1–10, optional)</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-400">Note (optional)</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  className="bg-slate-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setForm(emptyForm); }}
                  className="flex-1 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg py-2.5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}