import React from 'react';
import './Estilos/Menu.css'
//import './TuComponente.css'; // Asegúrate de importar tu archivo CSS o usar estilos en línea

function Menu() {
  return (
    <div className="barra-horizontal">
      <div className="mis-listas">
        <i className="icono-mis-listas">&#9776;</i> MIS LISTAS
      </div>
      <div className="crear-lista">
        <i className="icono-crear-lista" >+</i> CREAR LISTA
      </div>
      <div className="social" onClick={() => navigate('/login')}>
        <i className="icono-social">&#9733;</i> SOCIAL
      </div>
    </div>
  );
}

export default Menu;