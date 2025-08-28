import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },  // nullable for Google signup
  provider: { type: String, default: "local" },
  profile: { type: Object },   // store Google profile if needed
}, { timestamps: true });

export default mongoose.model("User", userSchema);
