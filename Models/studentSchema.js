import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  Student_name: String,
  presentmentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  previousmentor:{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }
});

const Student= mongoose.model("Student", studentSchema);

export default Student;
