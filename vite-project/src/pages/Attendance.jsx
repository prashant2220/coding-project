import { useEffect, useState } from "react";
import api from "../services/api";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    teacher: "",
    status: "Present",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data.students || []);
    } catch (error) {
      console.error("Students error:", error.response?.data || error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await api.get("/teachers");
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Teachers error:", error.response?.data || error);
    }
  };

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

      const response = await api.post("/attendance", formData);

      alert(
        response.data.message ||
        "Attendance marked successfully ✅"
      );

      setFormData({
        student: "",
        teacher: "",
        status: "Present",
      });

    } catch (error) {
      console.error(
        "Attendance error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to mark attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      <div className="mx-auto max-w-2xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            Attendance Management
          </h1>

          <p className="mt-2 text-slate-400">
            Mark student attendance
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Student */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Select Student
              </label>

              <select
                name="student"
                value={formData.student}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.name} - {student.rollNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Select Teacher
              </label>

              <select
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="">
                  Select Teacher
                </option>

                {teachers.map((teacher) => (
                  <option
                    key={teacher._id}
                    value={teacher._id}
                  >
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block font-medium text-slate-300">
                Attendance Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Marking Attendance..."
                : "Mark Attendance"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Attendance;