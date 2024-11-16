import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, updateArticle , getArticleById} from '../controllers/articlecontroller.js';



let articleRouter = Router();

articleRouter.post('/createArticle', createArticle);
articleRouter.get('/getAllArticles',  getAllArticles);
articleRouter.get('/:id', getArticleById); 
articleRouter.put('/updateArticle/:id', updateArticle);
articleRouter.delete('/deleteArticle/:id',deleteArticle);
export default articleRouter;