const Teacher = require("../models/Teacher");

// ================= CREATE TEACHER =================
const createTeacher = async (req, res) => {
    try {
        const { name, email, phone, subject } = req.body;

        if (!name || !email || !phone || !subject) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({
                message: "Teacher already exists"
            });
        }

        const teacher = await Teacher.create({
            name,
            email,
            phone,
            subject
        });

        res.status(201).json({
            message: "Teacher created successfully",
            teacher
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= GET ALL TEACHERS =================
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json({
            message: "Teachers fetched successfully",
            teachers
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= GET TEACHER BY ID =================
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            teacher
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= UPDATE TEACHER =================
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            teacher
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= DELETE TEACHER =================
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Teacher deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};