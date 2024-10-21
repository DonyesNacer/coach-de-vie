import { Router } from 'express';
import { login, signUp } from '../controllers/usercontrollers.js';

let router = Router();

router.post('/signup', signUp);
router.post('/login', login);
export default router;