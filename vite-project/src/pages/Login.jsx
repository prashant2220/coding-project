
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

    
      
      // Save login data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Role based dashboard
      if (user.role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "student") {
        navigate("/student-dashboard");
      } else {
        setError("Invalid user role");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            LET'S LEARNING CODING
          </h1>

          <p className="text-slate-400 mt-2">
            Attendance Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back 👋
          </h2>

          <p className="text-slate-400 text-center mt-2 mb-6">
            Login to your account
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          © 2026 Let's Learning Coding
        </p>

      </div>
    </div>
  );
}

export default Login;
