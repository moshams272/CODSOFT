import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title name must be at most 50 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description must be at least 20 characters long"],
    maxlength: [500, "Description name must be at most 500 characters long"],
  },
  status: {
    type: String,
    enum: ["Unassigned", "In Progress", "Completed"],
    default: "Unassigned",
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
