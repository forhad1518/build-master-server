import mongoose from "mongoose";

mongoose;
// component schema
const componentSchema = mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  cssClasses: { type: String, default: "" },
  componentOrder: { type: Number, default: 1 },
});

export default componentSchema;
