import PostModel from '../models/postModel.js';
import jwt from 'jsonwebtoken';
import expressFileUpload from 'express-fileupload';

export const addPost = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, summary, content } = req.body;
    const coverFile = req.files.cover;

    if (!coverFile) {
      return res.status(400).json({ error: 'Cover file is required' });
    }

    // Verify token and handle authorization
    const token = req.headers.authorization?.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'fallback_secret_if_not_set_in_env';

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
          cover: { data: coverFile.data, contentType: coverFile.mimetype },
          author: decoded.id,
        });

        return res.status(201).json(postDoc);
      } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Error creating post' });
      }
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Error handling request' });
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
        cover: post.cover ? `data:${post.cover.contentType};base64,${post.cover.data.toString('base64')}` : null,
        author: post.author,
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
    const updatedPost = await PostModel.findByIdAndUpdate(postId, { title, summary, content }, { new: true });

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
    const postId = req.params.postId;
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
