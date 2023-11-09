import React from 'react';
import MovieSearch from './MovieSearch';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalada la biblioteca de enrutamiento que estés utilizando
import './Estilos/Navegador.css'; // Importa tus estilos CSS si los tienes

function Navegador() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log(localStorage)
  return (
    <div className="navigation">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
       < MovieSearch />

      {isLoggedIn ? (
        <div className="user-icon">
          {/* Mostrar un emoji de persona o la imagen de perfil del usuario */}
          <span role="img" aria-label="Usuario">
            👤
          </span>
        </div>
      ) : (
        <div className="login-link">
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      )}
    </div>
  );
}

export default Navegador;
