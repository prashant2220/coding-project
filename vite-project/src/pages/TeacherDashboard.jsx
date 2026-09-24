import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [totalStudents, setTotalStudents] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // =========================
        // GET STUDENTS
        // =========================
        const studentResponse = await api.get("/students");

        setTotalStudents(studentResponse.data.count || 0);

        // =========================
        // GET ATTENDANCE
        // =========================
        const attendanceResponse = await api.get("/attendance");

        setAttendance(attendanceResponse.data.attendance || []);
      } catch (error) {
        console.log(
          "TEACHER DASHBOARD ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // TODAY'S DATE
  // =========================
  const today = new Date();

  const isToday = (date) => {
    const attendanceDate = new Date(date);

    return (
      attendanceDate.getDate() === today.getDate() &&
      attendanceDate.getMonth() === today.getMonth() &&
      attendanceDate.getFullYear() === today.getFullYear()
    );
  };

  // =========================
  // TODAY'S ATTENDANCE
  // =========================
  const todayAttendance = attendance.filter((item) =>
    isToday(item.date)
  );

  // =========================
  // PRESENT TODAY
  // =========================
  const presentToday = todayAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  // =========================
  // ABSENT TODAY
  // =========================
  const absentToday = todayAttendance.filter(
    (item) => item.status === "Absent"
  ).length;

  // =========================
  // TOTAL ATTENDANCE
  // =========================
  const totalAttendance = attendance.length;

  // Latest 5 attendance records
  const recentAttendance = [...attendance]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to Let'sLearning Coding Institute
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students, teachers and attendance
          </p>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL STUDENTS */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Students
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {loading ? "..." : totalStudents}
            </h2>
          </div>

          {/* PRESENT TODAY */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Present Today
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {loading ? "..." : presentToday}
            </h2>
          </div>

          {/* ABSENT TODAY */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Absent Today
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {loading ? "..." : absentToday}
            </h2>
          </div>

          {/* TOTAL ATTENDANCE */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Attendance
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-600">
              {loading ? "..." : totalAttendance}
            </h2>
          </div>

        </div>

        {/* ================= MANAGEMENT SECTION ================= */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* STUDENT MANAGEMENT */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-800">
              Student Management
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add, view and manage institute students.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/add-student")}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                + Add Student
              </button>

              <button
                onClick={() => navigate("/students")}
                className="rounded-lg border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                Manage Students
              </button>

            </div>

          </div>

          {/* TEACHER MANAGEMENT */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-800">
              Teacher Management
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add, view and manage institute teachers.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/add-teacher")}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                + Add Teacher
              </button>

              <button
                onClick={() => navigate("/teachers")}
                className="rounded-lg border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                Manage Teachers
              </button>

            </div>

          </div>

        </div>

        {/* ================= ATTENDANCE SECTION ================= */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View recent student attendance
              </p>
            </div>

            <button
              onClick={() => navigate("/attendance")}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Mark Attendance
            </button>

          </div>

          {/* ================= TABLE ================= */}
          <div className="mt-6 overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">

                  <th className="px-4 py-3">
                    Student
                  </th>

                  <th className="px-4 py-3">
                    Date
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      Loading attendance...
                    </td>
                  </tr>
                ) : recentAttendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  recentAttendance.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-slate-100"
                    >

                      <td className="px-4 py-4 font-medium text-slate-700">
                        {item.student?.name || "Unknown Student"}
                      </td>

                      <td className="px-4 py-4 text-slate-500">
                        {new Date(item.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            item.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default TeacherDashboard;