const express = require("express");

const router = express.Router();

const {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacherController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Teacher APIs
router.post("/", protect, authorizeRoles("teacher"), createTeacher);

router.get("/", protect, authorizeRoles("teacher"), getTeachers);

router.get("/:id", protect, authorizeRoles("teacher"), getTeacherById);

router.put("/:id", protect, authorizeRoles("teacher"), updateTeacher);

router.delete("/:id", protect, authorizeRoles("teacher"), deleteTeacher);

module.exports = router;