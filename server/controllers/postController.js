import PostModel from "../models/postModel.js";
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage }).single('file');

export const addPost = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer Error' });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { title, summary, content } = req.body;
      const { filename: cover } = req.file;

      const token = req.cookies.access_token; // Assuming the token is sent via cookies
      const secret = "fallback_secret_if_not_set_in_env";// Replace with your actual secret

      jwt.verify(token, secret, {}, async (err, decoded) => {
        if (err) throw err;

        const postDoc = await PostModel.create({
          title,
          summary,
          content,
          cover,
          author: decoded.id
        });

        res.json(postDoc);
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post' });
    }
  });
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author', ['username']);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
