import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegador from '../Navegador';
import Menu from '../Menu';
import '../Estilos/PaginaPrincipal.css'; // Importa tus estilos CSS aquí

function PaginaPrincipal() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  return (
    <div>
      <Navegador onSearch={setSearchResults} />
      <Menu />
      <div className="content">
        <div className="movie-search-container">
          {searchResults.length > 0 ? (
            <div className="search-results">
              <h2>Resultados de la búsqueda:</h2>
              <ul className="movie-list">
                {searchResults.map((movie) => (
                  <li
                    className="movie-item"
                    key={movie.id}
                    onClick={() => navigate(`/movies/${movie.id}`)}
                  >
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
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
