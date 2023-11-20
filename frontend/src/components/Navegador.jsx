import React from 'react';
import MovieSearch from './MovieSearch';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Estilos/Navegador.css';
const logo = require('../images/logo.jpeg')
function Navegador({ onSearch }) {
  const iconSize = 40;
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    navigate(`/usuario/${localStorage.getItem('idUser')}`);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleIniciarSesionClick = () => {
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="Navegador-container">
      {/* Logo */}
      <div className="logo-container" onClick={handleHomeClick}>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <MovieSearch onSearch={onSearch} />

      {isLoggedIn ? (
        <FaUser className="icon" size={iconSize} onClick={handleUserProfileClick} />
      ) : (
        <p className="iniciar-sesion" onClick={handleIniciarSesionClick}>
          Iniciar Sesión
        </p>
      )}
    </div>
  );
}

export default Navegador;
