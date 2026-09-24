  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import Navbar from "../components/Navbar";
  import api from "../services/api";

  function StudentDashboard() {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          
          // GET STUDENT DATA
          
          const studentResponse = await api.get("/students");

          const studentList = studentResponse.data.students || [];

          setStudents(studentList);

          // Find logged-in student
          const student = studentList.find(
            (item) =>
              item.email?.toLowerCase() === user.email?.toLowerCase()
          );

          
//  GET ATTENDANCE

if (student?.userId) {
  const userId =
    typeof student.userId === "object"
      ? student.userId._id
      : student.userId;

  console.log("STUDENT USER ID:", userId);

  const attendanceResponse = await api.get(
    `/attendance/student/${userId}`
  );

  console.log(
    "ATTENDANCE RESPONSE:",
    attendanceResponse.data
  );

  setAttendance(
    attendanceResponse.data.attendance || []
  );
} else if (user?._id) {
  const attendanceResponse = await api.get(
    `/attendance/student/${user._id}`
  );

  console.log(
    "ATTENDANCE RESPONSE:",
    attendanceResponse.data
  );

  setAttendance(
    attendanceResponse.data.attendance || []
  );
}
        } catch (error) {
          console.log(
            "STUDENT DASHBOARD ERROR:",
            error.response?.data || error.message
          );
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }, []);

    
    // CURRENT STUDENT
    
    const currentStudent =
      students.find(
        (student) =>
          student.email?.toLowerCase() === user.email?.toLowerCase()
      ) || students[0];

    
    // ATTENDANCE CALCULATION
    
    const presentCount = attendance.filter(
      (item) =>
        item.status?.toLowerCase() === "present"
    ).length;

    const absentCount = attendance.filter(
      (item) =>
        item.status?.toLowerCase() === "absent"
    ).length;

    const totalAttendance = attendance.length;

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 0;

    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10">

              WELCOME

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
              Welcome to Let'sLearn Coding Institute
            </h1>

            <p className="text-gray-400 mt-2">
              Student Dashboard
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-10">
              Loading student data...
            </div>
          ) : currentStudent ? (
            <>
                  {/* STUDENT PROFILE */}

              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  Student Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <p className="text-gray-400 text-sm">
                      Name
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {currentStudent.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Email
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {currentStudent.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Phone
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {currentStudent.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Course
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {currentStudent.course}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Roll Number
                    </p>

                    <p className="text-lg font-semibold mt-1 text-cyan-400">
                      {currentStudent.rollNumber}
                    </p>
                  </div>

                </div>
              </div>

              
                  {/* ATTENDANCE STATS */}
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                {/* PRESENT */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">
                    Present
                  </p>

                  <h2 className="text-4xl font-bold text-green-400 mt-2">
                    {presentCount}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Classes Present
                  </p>
                </div>

                {/* ABSENT */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">
                    Absent
                  </p>

                  <h2 className="text-4xl font-bold text-red-400 mt-2">
                    {absentCount}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Classes Absent
                  </p>
                </div>

                {/* TOTAL */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">
                    Total Attendance
                  </p>

                  <h2 className="text-4xl font-bold text-cyan-400 mt-2">
                    {totalAttendance}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Total Classes
                  </p>
                </div>

                {/* PERCENTAGE */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <p className="text-gray-400 text-sm">
                    Attendance %
                  </p>

                  <h2 className="text-4xl font-bold text-yellow-400 mt-2">
                    {attendancePercentage}%
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Overall Attendance
                  </p>
                </div>

              </div>

                  {/* DASHBOARD CARDS */}
                  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Link
                  to="/attendance"
                  className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 transition"
                >
                  <h3 className="text-xl font-bold text-cyan-400">
                    Attendance
                  </h3>

                  <p className="text-gray-400 mt-2">
                    View your attendance records
                  </p>
                </Link>

                <Link
                  to="/students"
                  className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 transition"
                >
                  <h3 className="text-xl font-bold text-cyan-400">
                    Students
                  </h3>

                  <p className="text-gray-400 mt-2">
                    View student information
                  </p>
                </Link>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-cyan-400">
                    Course
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {currentStudent.course}
                  </p>
                </div>

              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold">
                Student data not found
              </h2>

              <p className="text-gray-400 mt-2">
                Please contact your teacher.
              </p>
            </div>
          )}

        </main>
      </div>
    );
  }

  export default StudentDashboard;