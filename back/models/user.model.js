import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "is required"],
    minlength: [3, "must be at least 3 characters long"],
    maxlength: [50, "must be at most 50 characters long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name! Only letters are allowed.`,
    },
  },
  lastName: {
    type: String,
    required: [true, "is required"],
    minlength: [3, "must be at least 3 characters long"],
    maxlength: [50, "must be at most 50 characters long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]+$/.test(v); // Only letters allowed
      },
      message: (props) =>
        `${props.value} is not a valid name! Only letters are allowed.`,
    },
  },

  email: {
    type: String,
    required: [true, "is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email format!`,
    },
  },
  password: {
    type: String,
    required: [true, "is required"],
    minlength: [8, "length should be 8 character or more"],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  manage: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});
export default mongoose.model("User", userSchema);
