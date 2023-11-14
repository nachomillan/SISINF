import React, { useState } from 'react';
import CrearLista from './CrearLista'; // Import the CrearLista component
import './Estilos/Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [crearListaVisible, setCrearListaVisible] = useState(false); // State to control the visibility of CrearLista
  const navigate = useNavigate();
  // Function to show the CrearLista panel
  const showCrearLista = () => {
    setCrearListaVisible(true);
  };

  // Function to hide the CrearLista panel
  const hideCrearLista = () => {
    setCrearListaVisible(false);
  };

  const navigateToSocialPage = () => {
    navigate('/social');
  };
  const navigateToMisListas = () => {
    navigate('/mis-listas');
  };

  return (
    <div className="barra-horizontal">
      <div className="mis-listas" onClick={navigateToMisListas}>
        <i className="icono-mis-listas">&#9776;</i> MIS LISTAS
      </div>

      <div className="crear-lista" onClick={showCrearLista}>
        <i className="icono-crear-lista">+</i> CREAR LISTA
      </div>
      <div className="social" onClick= {navigateToSocialPage } >
        <i className="icono-social">&#9733;</i> SOCIAL
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