const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
  },
  role: {
    type: String,
    enum: ["jobSeeker", "recruiter"],
    required: [true, "Role is required"],
    default: "jobSeeker",
  },
  active: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    //if user updates profile info then this will be updated to current date and time automatically else it will be null
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
