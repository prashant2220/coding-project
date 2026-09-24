
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/teachers", formData);

      alert("Teacher added successfully ✅");

      navigate("/teacher-dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      <div className="mx-auto max-w-2xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/teacher-dashboard")}
          className="mb-6 text-cyan-400 font-medium transition hover:text-cyan-300"
        >
          ← Back to Dashboard
        </button>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold text-cyan-400">
            Add Teacher
          </h1>

          <p className="mb-8 text-slate-400">
            Add a new teacher to Let'sLearnCoding Institute.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Teacher Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter teacher email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding Teacher..." : "Add Teacher"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default AddTeacher;

