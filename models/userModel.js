import mongoose from "mongoose";
import userSchema from "./schemas/userSchema.js";

const User = mongoose.model("user", userSchema);

export default User;
