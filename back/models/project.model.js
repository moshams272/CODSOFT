import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "is required"],
    minlength: [3, "must be at least 3 characters long"],
    maxlength: [50, "name must be at most 50 characters long"],
  },
  description: {
    type: String,
    required: [true, "is required"],
    minlength: [20, "must be at least 20 characters long"],
    maxlength: [500, "name must be at most 500 characters long"],
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed","Deadline is over"],
    default: "Pending",
  },
  deadline: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Project", projectSchema);
