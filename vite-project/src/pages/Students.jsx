import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");

      setStudents(response.data.students || []);
    } catch (error) {
      console.log(
        "STUDENTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);

      alert("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      console.log(
        "DELETE STUDENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to delete student"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-cyan-400">
              Students
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all registered students.
            </p>
          </div>

          <Link
            to="/add-student"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-3 rounded-lg transition text-center"
          >
            + Add Student
          </Link>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-400 py-10">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-bold">
              No students found
            </h2>

            <p className="text-gray-400 mt-2">
              Add a student to see the student list.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-slate-800">
                  <tr>
                    <th className="text-left px-6 py-4">
                      #
                    </th>

                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4">
                      Course
                    </th>

                    <th className="text-left px-6 py-4">
                      Roll Number
                    </th>

                    <th className="text-left px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-t border-slate-700 hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4 text-gray-400">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {student.name}
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {student.course}
                      </td>

                      <td className="px-6 py-4 text-cyan-400 font-semibold">
                        {student.rollNumber}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleDelete(student._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Students;