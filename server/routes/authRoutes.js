import express from 'express';
import { signup, signin, profile, logout } from '../controllers/authController.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', profile);
router.post('/logout', logout);

export default router;