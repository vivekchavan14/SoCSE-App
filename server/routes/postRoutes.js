import express from 'express';
import { addPost,getPosts } from '../controllers/postController';


const router = express.Router();

router.post('/create', addPost);
router.get('/post',getPosts)

export default router;