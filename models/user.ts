import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      minLength: 1,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      index: true,
      lowercase: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    image: String,
    resetPassword: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // Default value 10 mins
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "User Already Exists!" });

export default mongoose.models.User || mongoose.model("User", userSchema);
