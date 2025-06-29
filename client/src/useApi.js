import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts, getCategories } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [postRes, catRes] = await Promise.all([getPosts(), getCategories()]);
      setPosts(postRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ posts, setPosts, categories, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);
