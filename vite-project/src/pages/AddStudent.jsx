import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    rollNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/students", formData);

      console.log("STUDENT CREATED:", response.data);

      alert("Student added successfully!");

      navigate("/students");
    } catch (error) {
      console.log(
        "ADD STUDENT ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            Add Student
          </h1>

          <p className="text-gray-400 mt-2">
            Register a new student in the institute.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">
                Student Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter student email"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-gray-300 mb-2">
                Course
              </label>

              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-gray-300 mb-2">
                Roll Number
              </label>

              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-slate-950 font-bold py-3 rounded-lg transition"
              >
                {loading ? "Adding Student..." : "Add Student"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/students")}
                className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>

      </main>
    </div>
  );
}

export default AddStudent;