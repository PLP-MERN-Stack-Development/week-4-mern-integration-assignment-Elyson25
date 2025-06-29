// client/src/components/PostForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/api/posts/${id}`);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            };
            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };

        try {
            if (id) {
                await axios.put(`/api/posts/${id}`, postData);
            } else {
                await axios.post('/api/posts', postData);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to submit post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
        </form>
    );
};

export default PostForm;
