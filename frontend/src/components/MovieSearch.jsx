import React, { useState, useEffect } from 'react';

function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = 'k_sat3m0dj'; // Reemplaza con tu clave de API

  useEffect(() => {
    console.log('searchResults actualizado:', searchResults);
  }, [searchResults]);


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
      console.log(data.d);
      if (data && data.d) {
        setSearchResults(data.d);
        console.log(searchResults)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {searchResults.length > 0 ? (
        <div>
            <h2>Resultados de la búsqueda:</h2>
            <ul>
            {searchResults.map((movie) => (
                <li className="lista-pelis-busqueda"key={movie.id}>
                <h3>{movie.l}</h3>
                {movie.i && movie.i.imageUrl && (
                    <img src={movie.i.imageUrl} alt={movie.l} />
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
