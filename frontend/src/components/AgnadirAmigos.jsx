import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilos/AgnadirAmigos.css';

function AddFriendsModal({ onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followStatus, setFollowStatus] = useState(null);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para realizar la búsqueda y actualizar los resultados
  const searchFriends = async () => {
    setFollowStatus(null);
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

      if (parseRes === 'Existe') {
        const filteredResults = [{ username: searchTerm }].filter(
          (result) => result.username !== localStorage.getItem('username')
        );
        setSearchResults(filteredResults);
      } else if (parseRes === 'No existe') {
        setSearchResults([]);
      } else {
        console.log(parseRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el evento de teclado
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Agrega un event listener para el evento de teclado
    document.addEventListener('keydown', handleKeyDown);
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  const handleFollow = async (seguido) => {
    try {
      const body = {
        seguidor_id: localStorage.getItem('username'),
        seguido_id: seguido,
      };
      const response = await fetch('http://localhost:3001/user/seguir', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes === 'seguido') {
        setFollowStatus('seguido');
        setTimeout(() => {
          onClose();
        }, 1000);
        navigate('/social');
      } else if (parseRes === 'ya se siguen') {
        setFollowStatus('ya se siguen');
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
          <button className='buscar' onClick={searchFriends}>Buscar</button>
        </div>
        <div className="friends-list">
          {searchResults.map((result) => (
            <div key={result.username} className="seguir">
              {result.username}
              <button className="seguir" onClick={() => handleFollow(result.username)}>Seguir</button>
            </div>
          ))}

          {followStatus === 'seguido' && (
            <p className="confirmation-message">¡Usuario seguido con éxito!</p>
          )}

          {followStatus === 'ya se siguen' && (
            <p className="warning-message">Ya sigues a este usuario.</p>
          )}

          {searchResults.length === 0 && searchTerm !== '' && <p>No existe ese nombre de usuario</p>}
        </div>
      </div>
    </div>
  );
}

export default AddFriendsModal;
