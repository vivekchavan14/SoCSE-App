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

export const addPost = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer Error' });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { title, summary, content } = req.body;
     // const { filename: cover } = req.file;

      const cover =  req.files.map((file) => {
      return {
        data: file.buffer,
        contentType: file.mimetype,
      };
    });


      const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer your_token"
      const secret = process.env.JWT_SECRET || "fallback_secret_if_not_set_in_env"; // Replace with your actual secret or use process.env

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
      }

      jwt.verify(token, secret, {}, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        try {
          const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover,
            author: decoded.id
          });

          res.json(postDoc);
        } catch (error) {
          console.error('Error creating post:', error);
          res.status(500).json({ message: 'Error creating post' });
        }
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Error handling request' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author', ['username']);

    const postsWithImages = posts.map(post => {
      return {
        _id: post._id,
        title: post.title,
        summary: post.summary,
        content: post.content,
        cover: post.cover ? `/uploads/${post.cover}` : null,
        author: post.author
      };
    });

    res.status(200).json(postsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate('author', ['username']);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Error fetching post by ID' });
  }
};


export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, summary, content } = req.body;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, summary, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
};


export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId; // Extracting the post ID from the request parameters using req.params.postId
    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};
