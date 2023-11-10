import React, { useState } from 'react';
import MovieSearch from './MovieSearch';
import UserProfile from './UserProfile';
import { FaHome, FaUser } from 'react-icons/fa';
import './Estilos/Navegador.css';

function Navegador() {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const iconSize = 40;

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  const handleHomeClick = () => {
    setShowUserProfile(false);
    // Agrega lógica adicional si es necesario al hacer clic en HOME
  };

  return (
    <div className="center-container">
      {showUserProfile ? (
        <UserProfile username="Larry" followers={100} following={50} movieLists={['Comedia', 'Drama']} style={{ width: '1000px' }}/>
      ) : (
        <div className="navegador-container" style={{ width: '1000px' }}>
          <FaHome className="icon" size={iconSize} onClick={handleHomeClick} />
          <MovieSearch />
          <FaUser className="icon" size={iconSize} onClick={handleUserProfileClick} />
        </div>
      )}
    </div>
  );
}

export default Navegador;
