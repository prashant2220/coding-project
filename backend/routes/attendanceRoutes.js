const express = require("express");

const router = express.Router();

const {
    markAttendance,
    getAllAttendance,
    getStudentAttendance,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Mark Attendance
router.post(
    "/",
    protect,
    authorizeRoles("teacher"),
    markAttendance
);

// Get All Attendance
router.get(
    "/",
    protect,
    authorizeRoles("teacher"),
    getAllAttendance
);

// Get Student Attendance
router.get(
    "/student/:studentId",
    protect,
    authorizeRoles("teacher","student"),
    getStudentAttendance
);

// Update Attendance
router.put(
    "/:id",
    protect,
    authorizeRoles("teacher"),
    updateAttendance
);

// Delete Attendance
router.delete(
    "/:id",
    protect,
    authorizeRoles("teacher"),
    deleteAttendance
);

module.exports = router;
