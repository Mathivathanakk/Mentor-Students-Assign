import mongoose from "mongoose";



const mentorSchema = mongoose.Schema({
  Mentor_name: String,
  StudentsDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});


 const Mentor = mongoose.model("Mentor", mentorSchema);

 export default Mentor;