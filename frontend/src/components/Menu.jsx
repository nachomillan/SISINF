import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Estilos/Menu.css';

function Menu() {
  const navigate = useNavigate(); // Obtén la función navigate de react-router-dom

  return (
    <div className="barra-horizontal">
      <div className="mis-listas" onClick={() => navigate('/ruta-mis-listas')}>
        <i className="icono-mis-listas">&#9776;</i> MIS LISTAS
      </div>
      <div className="crear-lista" onClick={() => navigate('/ruta-crear-lista')}>
        <i className="icono-crear-lista">+</i> CREAR LISTA
      </div>
      <div className="social" onClick={() => navigate('/social')}>
        <i className="icono-social">&#9733;</i> SOCIAL
      </div>
    </div>
  );
}

export default Menu;
