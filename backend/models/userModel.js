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
    enum: ["Job Seeker", "Recruiter"],
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
    type: Date,
    default: null,
  },
  // Job Seeker Fields
  education: {
    type: String,
    default: null,
  },
  skills: {
    type: [String],
    default: null,
  },
  experience: {
    type: String,
    default: null,
  },
  contactInfo: {
    phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    zip: {
      type: String,
      default: null,
    },
  },
  // Recruiter Fields
  companyInfo: {
    name: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    zip: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    industry: {
      type: String,
      default: null,
    },
    companyLogo: {
      type: String,
      default: null,
    },
  },
  //Common Fields
  profilePicture: {
    type: String,
    default: null,
  },
  resume: {
    type: String,
    default: null,
  },
  coverLetter: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
