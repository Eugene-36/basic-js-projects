import { useEffect } from 'react';

function Filter({ popular, setFiltered, activeGener, setActiveGenre }) {
  useEffect(() => {
    if (activeGener === 0) {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((movie) =>
      movie.genre_ids.includes(activeGener)
    );

    setFiltered(filtered);
  }, [activeGener]);

  return (
    <div className='filter-container'>
      <button
        className={activeGener === 0 ? 'active' : ''}
        onClick={() => setActiveGenre(0)}
      >
        All
      </button>
      <button
        className={activeGener === 35 ? 'active' : ''}
        onClick={() => setActiveGenre(35)}
      >
        Comedy
      </button>
      <button
        className={activeGener === 28 ? 'active' : ''}
        onClick={() => setActiveGenre(28)}
      >
        Action
      </button>
    </div>
  );
}

export default Filter;
