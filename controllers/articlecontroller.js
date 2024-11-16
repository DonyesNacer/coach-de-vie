import Article from '../models/article.js';  

/**
 * Créer un nouvel article
 */
export const createArticle = async (req, res) => {
  const { titre, sujet, image } = req.body;

  try {
    const newArticle = new Article({ titre, sujet, image });
    await newArticle.save();

    return res.status(201).json({
      message: 'Article créé avec succès',
      article: newArticle,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Erreur interne du serveur',
      error: err.message,
    });
  }
};

/**
 * Récupérer tous les articles
 */
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    return res.status(200).json({ articles });
  } catch (err) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des articles',
      error: err.message,
    });
  }
};

/**
 * Récupérer un article par son ID
 */
export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    return res.status(200).json({ article });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la récupération de l'article",
      error: err.message,
    });
  }
};

/**
 * Mettre à jour un article
 */
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { titre, sujet, image } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { titre, sujet, image },
      { new: true } // Renvoie l'article mis à jour
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    return res.status(200).json({
      message: 'Article mis à jour avec succès',
      article: updatedArticle,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la mise à jour de l'article",
      error: err.message,
    });
  }
};

/**
 * Supprimer un article
 */
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    return res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la suppression de l'article",
      error: err.message,
    });
  }
};
