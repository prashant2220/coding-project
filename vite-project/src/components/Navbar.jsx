import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/student-dashboard"
          className="text-2xl font-bold text-cyan-400"
        >
          Let'sLearning
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/student-dashboard"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Student Dashboard
          </Link>

          <Link
            to="/teacher-dashboard"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Teacher Dashboard
          </Link>

          <Link
            to="/students"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Students
          </Link>

          <Link
            to="/teachers"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Teachers
          </Link>

          <Link
            to="/attendance"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Attendance
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;