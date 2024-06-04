import express from "express";
import {
  assignStudentToMentor,
  changeMentor,
  createMentor,
  createStudent,
  getallMentor,
  getallStudent,
  getmentorById,
  getpreviousMentor,
} from "../Controllers/mentorStudentController.js";

const router = express.Router();

router.post("/createMentor", createMentor);//to create Mentor
router.post("/createStudent", createStudent);//to create student
router.get("/studentAll", getallStudent);//getting all student details
router.get("/mentorAll", getallMentor);//getting all mentor details
router.put('/updateMentor/:mentorid/:studentid',assignStudentToMentor);// Assigning a student to Mentor
router.put('/changementor',changeMentor)
//Assign or Change Mentor for particular Student
router.get("/particularmentor/:id", getmentorById);//to show all students for a particular mentor
router.get("/previousMentor/:id", getpreviousMentor);//the previously assigned mentor for a particular student.

export default router;
