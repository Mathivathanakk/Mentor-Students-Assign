import Mentor from "../Models/mentorSchema.js";
import Student from "../Models/studentSchema.js";


//getting all student details
export const getallStudent = async (req, res) => {
  try {
    const studentAll = await Student.find().populate("presentmentor");
    res
      .status(200)
      .json({ message: "student data fetched successfully", data: studentAll });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in student getall method" });
  }
};
//getting all mentor details
export const getallMentor = async (req, res) => {
  try {
    const mentorAll = await Mentor.find().populate("StudentsDetails");

    res
      .status(200)
      .json({ message: "mentor data fetched successfully", data: mentorAll});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in mentor getall method" });
  }
};

//to create student
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "student created successfully", data: newStudent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in student create method" });
  }
};

//to create mentor

export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res
      .status(200)
      .json({ message: "Mentor created successfully", data: newMentor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in mentor create method" });
  }
};

// Assigning a student to Mentor

export const assignStudentToMentor = async (req, res) => {
  try {
    //geeting the id of mentor and students
    const mentorId = req.params.mentorid;
    const studentId = req.params.studentid;

    const { Mentor_name, StudentsDetails, presentmentor } = req.body;
    //finding the id of mentor and updating the student in studentsdetails
    const mentordata = await Mentor.findByIdAndUpdate(mentorId, {
      StudentsDetails: studentId
    });
    if(!mentorId){
      res.status(404).send("mentor not found")
    }
    // mentordata.StudentsDetails = [... mentordata.StudentsDetails, req.body.studentid];
    mentordata.save();

   
    //finding the student id  and updating the mentor in the present mentor
    const studentdata = await Student.findByIdAndUpdate(studentId, { presentmentor: mentorId });

    studentdata.save();
    if(!studentId){
      res.status(404).send("student not found")
    }
    
    res.status(200).json({ message: "mentor updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error in assign a student to mentor put method",
    });
  }
};

//Assign or Change Mentor for particular Student


export const changeMentor = async (req, res) => {
  try {
   // getting the studentId by request
const studentdetail=await Student.findById(req.body.studentId)
const previousmentorId=studentdetail.presentmentor
//console.log(previousmentorId)
//getting the new mentor id by request that's equal to student's present mentor id
studentdetail.presentmentor=req.body.newteacherId
//if the stdent had mentor presentmentor updated in the previous mentor 
studentdetail.previousmentor=previousmentorId
studentdetail.save()

//getting the new mentor id by request and updating the studentsdetails
const teacher=await Mentor.findByIdAndUpdate(req.body.newteacherId,{StudentsDetails:req.body.studentId})
teacher.save()


res.status(200).json({message:"changed new mentor and updated in previous mentor"})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error in change mentor put method",
    });
  }
};

//to show all students for a particular mentor
export const getmentorById = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentorDetail = await Mentor.findById(mentorId).populate(
      "StudentsDetails"
    );


    res.status(200).json({
      message: "getting particular  mentor and their students successfully",
      data: mentorDetail
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Internal server error in getting particular  mentor and their students method",
    });
  }
};

//the previously assigned mentor for a particular student.

export const getpreviousMentor = async (req, res) => {
  try {
    const studentId = req.params.id;
    const preMentorDetail = await Student.findById(studentId).populate("previousmentor");
    res.status(200).json({
      message: "getting previous mentor detail successfully",
      data: preMentorDetail
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error in getting previous mentor method",
    });
  }
};
