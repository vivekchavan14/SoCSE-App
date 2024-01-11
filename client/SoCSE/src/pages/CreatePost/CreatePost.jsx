import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const getToken = () => {
    return localStorage.getItem('access_token'); // Retrieve the token from localStorage
  };
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    
    // Remove HTML tags from summary and content
    const sanitizedSummary = summary.replace(/<[^>]+>/g, '');
    const sanitizedContent = content.replace(/<[^>]+>/g, '');
    
    formData.append('summary', sanitizedSummary); // Use sanitized summary
    formData.append('content', sanitizedContent); // Use sanitized content

    if (files) {
      formData.append('file', files[0]);
    }

    const token = getToken(); // Get the token from localStorage

    try {
      const response = await fetch('http://localhost:8000/api/posts/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        console.log('Post created successfully:', response);
        setRedirect(true);
      } else if (response.status === 401) {
        // Handle unauthorized error (e.g., expired token)
        throw new Error('Unauthorized');
      } else if (response.status === 400) {
        // Handle specific client-side errors
        throw new Error('Bad request');
      } else {
        // Handle other server-side errors
        throw new Error('Failed to create post');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Error creating post:', error.message);
      // You can set an error state here to display a message to the user
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='create-post-container'>
      <h1>Create New Post</h1>
      <form className='post-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add Blog Title'
          value={title}
          onChange={handleTitleChange}
          className='post-input'
        />
        <input
          type='text'
          placeholder='Add Summary'
          value={summary}
          onChange={handleSummaryChange}
          className='post-input'
        />
        <input
          type='file'
          onChange={event => setFiles(event.target.files)}
          className='file-input'
        />
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          className='quill-editor'
        />
        <button type='submit' className='post-button'>Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
