import React, { useState, useEffect } from 'react';
import './Estilos/VerSeguidos.css';

function VerSeguidos({ onClose }) {
  const [followingList, setFollowingList] = useState([]);

  const handleUnfollow = async (friend) => {
    try {
      const body = {
        idusuario: localStorage.getItem('idUser'),
        friend: friend,
      };

      const response = await fetch('http://localhost:3001/user/dejar-de-seguir', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes === 'dejado de seguir') {
        setFollowingList((prevList) => prevList.filter((item) => item.username !== friend.username));
      }
    } catch (error) {
      console.error('Error al dejar de seguir al usuario:', error);
    }
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/seguidos/${localStorage.getItem('idUser')}`, {
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
  useEffect(() => {
    fetchData();
  }, []);
    // Función para manejar el evento de teclado
  const handleKeyDown = (event) => {
     console.log('Key pressed:', event.key);
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
          <h2>Tus Seguidos</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="friends-list">
          {followingList.map((follower) => (
            <div key={follower.idusuario} className="friend-result">
              {follower.nombreusuario}
              <button onClick={() => handleUnfollow(follower.idusuario)}>Dejar de seguir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerSeguidos;
