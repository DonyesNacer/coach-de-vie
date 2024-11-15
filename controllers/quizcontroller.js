import quiz from '../models/quiz.js';



export const createquiz = async (req, res) => {
  const { titre, question,reponse } = req.body;

  try {
    const newquiz= new quiz ({ titre, question,reponse });
    await newquiz.save();  
    return res.status(201).json({ message: 'quiz créé avec succès', quiz: newquiz });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
  }
};


export const getAllquiz= async (req, res) => {
  try {
    const quizs = await quiz.find(); 

    return res.status(200).json({ quizs });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des quizs', error: err.message });
  }
};


export const getquizbyId = async (req, res) => {
  const { id } = req.params;  

  try {
    const quiz= await quiz.findById(id);  

    if (!quiz) {
      return res.status(404).json({ message: 'quiz non trouvé' });
    }

    return res.status(200).json({ quiz});
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la récupération de quiz', error: err.message });
  }
};


export const updatequiz = async (req, res) => {
  const { id } = req.params; 
  const { titre, question,reponse } = req.body;

  try {
    const updatequiz = await quiz.findByIdAndUpdate(id, { titre, question,reponse }, { new: true });

    if (!updatedquiz) {
      return res.status(404).json({ message: 'quiz non trouvé' });
    }

    return res.status(200).json({ message: 'quiz mis à jour avec succès', quiz: updatedquiez });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de quiz', error: err.message });
  }
};


export const deletequiz = async (req, res) => {
  const { id } = req.params;  
  try {
    const deleteauiz = await quiz.findByIdAndDelete(id);  

    if (!deletedquiz) {
      return res.status(404).json({ message: ' quiz non trouvé' });
    }

    return res.status(200).json({ message: '  quiz supprimé avec succès' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la suppression de quiz ', error: err.message });
  }
};
