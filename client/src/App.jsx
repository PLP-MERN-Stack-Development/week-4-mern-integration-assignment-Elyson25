import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList.jsx';
import SinglePost from './components/SinglePost.jsx';
import PostForm from './components/PostForm.jsx';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route path="/create" element={<PostForm />} />
                <Route path="/edit/:id" element={<PostForm />} />
            </Routes>
        </Router>
    );
}

export default App;
