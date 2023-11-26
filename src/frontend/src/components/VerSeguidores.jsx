import React, { useState, useEffect } from 'react';
import './Estilos/VerSeguidos.css';

function VerSeguidores({ onClose }) {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/seguidores/${localStorage.getItem('idUser')}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const parseRes = await response.json();
        setFollowingList(parseRes);
        console.log(parseRes)
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };
    fetchData();
    
  }, []);
    // Función para manejar el evento de teclado
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
    const handleClickOutside = (event) => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    // Agrega un event listener para el evento de teclado
    document.addEventListener('keydown', handleKeyDown);
     document.addEventListener('mousedown', handleClickOutside);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente
  return (
    <div className="friends-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Tus Seguidores</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="friends-list">
          {followingList.map((follower) => (
            <div key={follower.nombreusuario} className="friend-result">
              {follower.nombreusuario}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerSeguidores;
