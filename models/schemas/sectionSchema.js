import mongoose from "mongoose";
import componentSchema from "./componentSchema.js";

// section schema
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sectionOrder: { type: Number, default: 1 },
  backgroundColor: { type: String, default: "#ffffff" },
  padding: { type: String, default: "" },
  margin: { type: String, default: "" },
  components: [componentSchema],
});

export default sectionSchema;
