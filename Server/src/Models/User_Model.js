import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: async function (email) {
            const existingUser = await this.constructor.findOne({ email });
            return !existingUser;
          },
          message: "User already exists with this email",
        },
        {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
          },
          message: (props) => `${props.value} is not a valid email address!`,
        },
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    address: { type: String, required: true },
    phoneNo: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) =>
            `${props.value} must be 10 digit long & would not consists any characters!`,
        },
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"].map((g) => g.toLowerCase()),
      validate: {
        validator: function (v) {
          return this.enumValues.includes(v.toLowerCase());
        },
        message: (props) => `${props.value} is not a valid gender!`,
      },
    },

    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (v) {
          // Check if date is in the past
          return v < new Date();
        },
        message: (props) => `${props.value} is not a valid date of birth!`,
      },
    },
    picture: { type: String, default: "" },
    idProof: { type: String, default: "" },
    picturePath: { type: String, default: "" },
    idPath: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
