
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Estilos/MovieSearch.css'; // Importa tu archivo de estilos CSS

function MovieSearch({onSearch}) {
  const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchQuery}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '48ae2480a4msh6d2031485ea1a36p11f14bjsn2a0c39c5d01a',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data && data.d) {
        const filteredResults = data.d.filter(movie => movie.qid === "movie" || movie.qid === "tvSeries");
        // setSearchResults(filteredResults);
        onSearch(filteredResults);
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

    </div>
  );
}

export default MovieSearch;
