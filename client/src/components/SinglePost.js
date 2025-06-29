// client/src/components/SinglePost.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../api/postService';
import axios from 'axios';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
                const commentsResponse = await axios.get(`/api/comments/${id}`);
                setComments(commentsResponse.data);
            } catch {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const newComment = { post: id, content: commentContent };
            await axios.post('/api/comments', newComment);
            setComments([...comments, newComment]);
            setCommentContent('');
        } catch {
            setError('Failed to add comment');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Link to={`/edit/${post._id}`}>Edit Post</Link>
            <br />
            <Link to="/">Back to Posts</Link>

            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>{comment.content}</li>
                ))}
            </ul>

            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default SinglePost;
