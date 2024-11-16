import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  sujet: { type: String, required: true },
  image: { type: String, required: false },
});

export default mongoose.model('article', articleSchema);
