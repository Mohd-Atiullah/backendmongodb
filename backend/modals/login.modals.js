import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ... other fields
});

export const Login = mongoose.model("Login", LoginSchema);
