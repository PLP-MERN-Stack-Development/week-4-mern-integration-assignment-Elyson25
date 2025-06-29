import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url, runOnMount = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(runOnMount);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (runOnMount) fetchData();
  }, [fetchData, runOnMount]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
