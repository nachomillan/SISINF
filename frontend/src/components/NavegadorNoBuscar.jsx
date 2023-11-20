import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import './Estilos/Navegador.css';

function NavegadorNoBusqueda({ onSearch }) {
  const iconSize = 40;
  const navigate = useNavigate();
  const handleUserProfileClick = () => {
    navigate(`/usuario/${localStorage.getItem('idUser')}`)
  };

  const handleHomeClick = () => {
    navigate('/')
  };
  const handleIniciarSesionClick = () => {
    navigate('/login')
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="Navegador-container">
      <FaHome className="icon" size={iconSize} onClick={handleHomeClick} />
      {isLoggedIn ? (
        <FaUser className="icon" size={iconSize} onClick={handleUserProfileClick} />
      ) : (
        <p className='iniciar-sesion' onClick={handleIniciarSesionClick}>Iniciar Sesión</p>
      )}
    </div>
  );
}

export default NavegadorNoBusqueda;
