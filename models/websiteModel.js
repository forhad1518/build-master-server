import websiteSchema from "./schemas/websiteSchema.js";
import mongoose from "mongoose";

const Website = mongoose.model("website", websiteSchema);

export default Website;
