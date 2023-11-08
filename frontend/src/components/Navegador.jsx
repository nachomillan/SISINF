import React from 'react';
import MovieSearch from './MovieSearch';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalada la biblioteca de enrutamiento que estés utilizando
import './Estilos/Navegador.css'; // Importa tus estilos CSS si los tienes

function Navegador() {
  return (
    <div className="navigation">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
       < MovieSearch />
      <div className="login-link">
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
}

export default Navegador;
