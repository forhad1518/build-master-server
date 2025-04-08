import mongoose from "mongoose";
import sectionSchema from "./sectionSchema.js";

// website schema
const websiteSchema = mongoose.Schema({
  websiteName: { type: String, required: true },
  sections: [sectionSchema],
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  metaKeyword: { type: String, default: "" },
  createDate: { type: Date, default: Date.now },
});

export default websiteSchema;
