import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import CreatePost from './components/CreatePost';

function MainApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route path="/create" element={<CreatePost />} />
            </Routes>
        </Router>
    );
}

export default App;
