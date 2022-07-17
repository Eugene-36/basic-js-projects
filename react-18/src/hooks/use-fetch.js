import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data.results);
      })
      .catch((err) => {
        setError('Something went wrong with the request');
        console.log(err);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
