import mongoose from "mongoose";
const signupSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}); 
export const Signup = mongoose.model("Signup", signupSchema);            