import React, { useState } from 'react';
import CrearLista from './CrearLista'; // Import the CrearLista component
import './Estilos/Menu.css';
import { useNavigate } from 'react-router-dom';
function Menu() {
  const navigate = useNavigate();
  const [crearListaVisible, setCrearListaVisible] = useState(false); // State to control the visibility of CrearLista

  // Function to show the CrearLista panel
  const showCrearLista = () => {
    setCrearListaVisible(true);
  };

  // Function to hide the CrearLista panel
  const hideCrearLista = () => {
    setCrearListaVisible(false);
  };

  return (
    <div className="barra-horizontal">
      <div className="mis-listas">
        <i className="icono-mis-listas">&#9776;</i> MIS LISTAS
      </div>

      <div className="crear-lista" onClick={showCrearLista}>
        <i className="icono-crear-lista">+</i> CREAR LISTA
      </div>
      <div className="social" onClick={navigate('/social')}>
        <i className="icono-social" onClick={navigate('/social')}>&#9733;</i> SOCIAL
      </div>

      {crearListaVisible && (
        <div className="crear-lista-overlay">
          <CrearLista onClose={hideCrearLista} />
        </div>
      )}
    </div>
  );
}

export default Menu;
