// client/src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/postService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPosts(currentPage);
                setPosts(Array.isArray(data?.posts) ? data.posts : []);
                setTotalPages(typeof data?.totalPages === 'number' ? data.totalPages : 0);
            } catch {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Blog Posts</h1>
            <Link to="/create">Create New Post</Link>
            <ul>
                {(Array.isArray(posts) ? posts : []).map(post => (
                    <li key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostList;
