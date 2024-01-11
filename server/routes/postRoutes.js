import express from 'express';
import { addPost, getPosts, updatePost, deletePost, getPostById } from '../controllers/postController.js';

const router = express.Router();


router.post('/create', addPost);
router.get('/post', getPosts);
router.get('/post/:id', getPostById); // New route to fetch a single post
router.put('/posts/:id/update', updatePost);
router.delete('/posts/:id/delete', deletePost);


export default router;
