import './App.css';
import { useState, useEffect } from 'react';
import Movie from './component/Movie';
import Filter from './component//Filter';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGener, setActiveGenre] = useState(0);
  const APIURL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(APIURL);
    const movies = await data.json();
    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className='App'>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGener={activeGener}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className='popular-movies'>
        <AnimatePresence>
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
