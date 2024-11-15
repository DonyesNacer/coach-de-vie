import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, updateArticle } from '../controllers/articlecontroller.js';



let router = Router();

router.post('/createArticle', createArticle);
router.post('/getAllArticles',  getAllArticles);
router.post('/updateArticle', updateArticle);
router.putt('/deleteArticle ',  deleteArticle );
export default router;