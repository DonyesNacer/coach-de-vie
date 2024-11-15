import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
    titre: { type: String, required: true },
  question: { type: String, required: true },
  reponse : { type: String, required: true },
  
});

export default mongoose.model('quiz', quizSchema);

