import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: String,
  content: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

noteSchema.index({ title: "text", content: "text" });

export default model("Note", noteSchema);
