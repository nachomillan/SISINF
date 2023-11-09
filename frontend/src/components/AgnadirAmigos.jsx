import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilos/AgnadirAmigos.css';

function AddFriendsModal({ onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para realizar la búsqueda y actualizar los resultados
  const searchFriends = async () => {
      try {
        const body = { nombreusuario: searchTerm };
        const response = await fetch('http://localhost:3001/user/buscar', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        // Verifica la respuesta de la API
        if (parseRes === 'Existe') {
           const filteredResults = [{ username: searchTerm }].filter(
              (result) => result.username !== localStorage.getItem('username')
            );
            setSearchResults(filteredResults);
        } else if (parseRes === 'No existe') {
          setSearchResults([]);
        } else {
          console.log(parseRes); // Maneja otros casos si es necesario
        }
      } catch (error) {
        console.error(error);
      }
  };
  const handleFollow = async (seguido) => {
      try {
        const body = { seguidor_id: localStorage.getItem('username'), seguido_id:seguido};
       const response = await fetch('http://localhost:3001/user/seguir', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error('Error en la respuesta de la API:', response.statusText);
          // Manejar el error de manera apropiada, según sea necesario
        } else {
          const parseRes = await response.json();
          console.log(parseRes);
          navigate('/social');
        }
      } catch (error) {
         console.error('Error al seguir al usuario:', error);
      }
  };

  return (
  <div className="add-friends-modal">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Buscar Amigos por Nombre de usuario</h2>
        <button onClick={onClose} className="close-button">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar amigos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={searchFriends}>Buscar</button>
      </div>
      <div className="friends-list">
        {/* Muestra los resultados de la búsqueda aquí */}
        {searchResults.map((result) => (
          <div key={result.username} className="friend-result">
            {result.username}
            <button onClick={() => handleFollow(result.username)}>Seguir</button>
          </div>
        ))}
        {/* Mostrar mensaje si no hay resultados */}
        {searchResults.length === 0 && searchTerm !== ''  && <p>No existe ese nombre de usuario</p>}
      </div>
    </div>
  </div>
);

}

export default AddFriendsModal;
