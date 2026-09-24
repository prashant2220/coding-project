const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= AUTH ROUTES =================
app.use("/api/auth", authRoutes);

// ================= STUDENT ROUTES =================
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);

// ================= JWT PROTECTED ROUTE =================
app.get("/api/protected", protect, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});

// ================= TEACHER ONLY =================
app.get(
    "/api/teacher",
    protect,
    authorizeRoles("teacher"),
    (req, res) => {
        res.status(200).json({
            message: "Teacher route accessed successfully",
            user: req.user
        });
    }
);

// ================= ADMIN ONLY =================
app.get(
    "/api/admin",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Admin route accessed successfully",
            user: req.user
        });
    }
);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
    res.status(200).send(
        "Let'sLearning Attendance Management API is running"
    );
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});