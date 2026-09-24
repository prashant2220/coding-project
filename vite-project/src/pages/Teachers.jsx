import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const response = await api.get("/teachers");

      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.log("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/teachers/${id}`);

      alert("Teacher deleted successfully ✅");

      fetchTeachers();
    } catch (error) {
      console.log("Delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete teacher"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Teacher Management
            </h1>

            <p className="mt-2 text-slate-500">
              View and manage all teachers
            </p>
          </div>

          <button
            onClick={() => navigate("/add-teacher")}
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            + Add Teacher
          </button>
        </div>

        {/* TEACHER TABLE */}
        <div className="overflow-hidden rounded-xl bg-white shadow">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-slate-700">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-slate-700">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-center text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      Loading teachers...
                    </td>
                  </tr>
                ) : teachers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No teachers found.
                    </td>
                  </tr>
                ) : (
                  teachers.map((teacher) => (
                    <tr
                      key={teacher._id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        {teacher.name}
                      </td>

                      <td className="px-6 py-4">
                        {teacher.email}
                      </td>

                      <td className="px-6 py-4">
                        {teacher.phone}
                      </td>

                      <td className="px-6 py-4">
                        {teacher.subject}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            handleDelete(teacher._id)
                          }
                          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
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

export default Teachers;