import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= STUDENT DASHBOARD ================= */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TEACHER DASHBOARD ================= */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENTS ================= */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        {/* ================= ADD STUDENT ================= */}
        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        {/* ================= TEACHERS ================= */}
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        {/* ================= ADD TEACHER ================= */}
        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />

        {/* ================= ATTENDANCE ================= */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
              <h1 className="text-3xl font-bold">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;