import React, { useState, useEffect } from 'react';
import Menu from '../Menu';
import MovieSearch from '../MovieSearch';
import AddFriendsModal from '../AgnadirAmigos'; // Importa el nuevo componente
import '../Estilos/Social.css'; // Importa el archivo de estilos CSS

const SocialPage = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);

  const openAddFriendsModal = () => {
    setShowAddFriendsModal(true);
  };
  const handleKeyDown = (event) => {
    // Cierra el modal si la tecla presionada es la tecla 'Esc' (código 27)
    if (event.keyCode === 27) {
      closeAddFriendsModal();
    }
  };
  const closeAddFriendsModal = () => {
    setShowAddFriendsModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { idusuario: localStorage.getItem('idUser') };
        const response = await fetch('http://localhost:3001/user/social', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        setFollowingCount(parseRes.seguidos);
        setFollowersCount(parseRes.seguidores);
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };
    const fetchData3 = async () => {
      try {
        const body = { idusuario: localStorage.getItem('idUser') };
        const response = await fetch('http://localhost:3001/publicacion/conseguirPublicaciones', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes)
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };

    fetchData(); // Llamamos a la función asíncrona dentro de useEffect
    fetchData3();
    return () => {
      // Código de limpieza si es necesario
    };
  }, []);

  return (
    <div className="social-page">
      <MovieSearch />
      <Menu />
      <div className="main-content">
        <div className="user-info">
          <h2>{localStorage.getItem('username')}</h2>
          <div className="user-stats">
            <p>Seguidores: {followersCount}</p>
            <p>Siguiendo: {followingCount}</p>
          </div>
          <button className="add-friends-button" onClick={openAddFriendsModal}>
            Añadir Amigos
          </button>
        </div>
        <div className="header">
          <h1>Red Social de Películas</h1>
        </div>
        <div className="posts">
          {/* ... */}
        </div>
      </div>
      {showAddFriendsModal && <AddFriendsModal onClose={closeAddFriendsModal} />}
    </div>
  );
};

export default SocialPage;
