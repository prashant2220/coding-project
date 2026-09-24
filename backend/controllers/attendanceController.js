const Attendance = require("../models/Attendance");

// ================= MARK ATTENDANCE =================
const markAttendance = async (req, res) => {
    try {
        const { student, teacher, date, status } = req.body;

        // Check required fields
        if (!student || !teacher || !status) {
            return res.status(400).json({
                message: "Student, teacher and status are required"
            });
        }

        // Check valid status
        if (!["Present", "Absent"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Present or Absent"
            });
        }

                const selectedDate = date ? new Date(date) : new Date();

                        // Start of day
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

         // End of day
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Check if attendance already exists for same student and date
        const existingAttendance = await Attendance.findOne({
            student,
           date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (existingAttendance) {
             existingAttendance.status = status;
            existingAttendance.teacher = teacher;

              await existingAttendance.save();

                return res.status(200).json({
                message: "Attendance updated successfully",
                attendance: existingAttendance
            });
        }

        const attendance = await Attendance.create({
            student,
            teacher,
            date: selectedDate,
            status
        });

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= GET ALL ATTENDANCE =================
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("student")
            .populate("teacher");

        res.status(200).json({
            message: "Attendance fetched successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= GET STUDENT ATTENDANCE =================
const getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({
            student: req.params.studentId
        })
            .populate("student")
            .populate("teacher")
            .sort({ date: -1 });

        res.status(200).json({
            message: "Student attendance fetched successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= UPDATE ATTENDANCE =================
const updateAttendance = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Present", "Absent"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Present or Absent"
            });
        }

        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        res.status(200).json({
            message: "Attendance updated successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= DELETE ATTENDANCE =================
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(
            req.params.id
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    markAttendance,
    getAllAttendance,
    getStudentAttendance,
    updateAttendance,
    deleteAttendance
};