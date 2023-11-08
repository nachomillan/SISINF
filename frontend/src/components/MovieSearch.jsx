
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilos/MovieSearch.css'; // Importa tu archivo de estilos CSS

function MovieSearch() {
    const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = 'k_sat3m0dj'; // Reemplaza con tu clave de API

  const handleSearch = async () => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchQuery}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7dd80bde07msh88ad6b073887de1p14a7c1jsna825d0f3ff22',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data && data.d) {
        const filteredResults = data.d.filter(movie => movie.qid === "movie" || movie.qid === "tvSeries");
        setSearchResults(filteredResults);
        console.log(filteredResults)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="movie-search-container">
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Resultados de la búsqueda:</h2>
          <ul className="movie-list">
            {searchResults.map((movie) => (
              <li className="movie-item" key={movie.id} onClick={() =>  navigate(`/movies/${movie.id}`)}>
                <h3>{movie.l}</h3>
                {movie.i && movie.i.imageUrl && (
                  <img
                    src={movie.i.imageUrl}
                    alt={movie.l}
                    className="movie-image"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Realiza una búsqueda para ver los resultados.</p>
      )}
    </div>
  );
}

export default MovieSearch;
