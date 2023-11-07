import React, { useState } from 'react';
import Menu from '../Menu';
import MovieSearch from '../MovieSearch';
import AddFriendsModal from '../AgnadirAmigos'; // Importa el nuevo componente
import '../Estilos/Social.css'; // Importa el archivo de estilos CSS

const SocialPage = () => {
  const userName = 'TuNombreDeUsuario';
  const followersCount = 100;
  const followingCount = 50;
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);

  const openAddFriendsModal = () => {
    setShowAddFriendsModal(true);
  };

  const closeAddFriendsModal = () => {
    setShowAddFriendsModal(false);
  };

  return (
    <div className="social-page">
      <MovieSearch />
      <Menu />
      <div className="main-content">
        <div className="user-info">
          <h2>{userName}</h2>
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
