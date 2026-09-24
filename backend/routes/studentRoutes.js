const express = require("express");

const router = express.Router();

const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


// CREATE STUDENT
router.post(
    "/",
    protect,
    authorizeRoles("teacher"),
    createStudent
);


// GET ALL STUDENTS
router.get(
    "/",
    protect,
    authorizeRoles("teacher", "student"),
    getStudents
);


// GET SINGLE STUDENT
router.get(
    "/:id",
    protect,
    authorizeRoles("teacher", "student"),
    getStudentById
);


// UPDATE STUDENT
router.put(
    "/:id",
    protect,
    authorizeRoles("teacher"),
    updateStudent
);


// DELETE STUDENT
router.delete(
    "/:id",
    protect,
    authorizeRoles("teacher"),
    deleteStudent
);


module.exports = router;