import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["Not started", "In Progress", "Completed" , "Deadline is over"],
    default: "Not started",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  deadline: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Task", taskSchema);

