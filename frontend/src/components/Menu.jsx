import React, { useState } from 'react';
import CrearLista from './CrearLista'; // Importa el componente CrearLista
import './Estilos/Menu.css';

function Menu() {
  const [crearListaVisible, setCrearListaVisible] = useState(false); // Estado para controlar la visibilidad de CrearLista

  // Función para mostrar el panel CrearLista
  const showCrearLista = () => {
    setCrearListaVisible(true);
  };

  // Función para ocultar el panel CrearLista
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
      <div className="social">
        <i className="icono-social">&#9733;</i> SOCIAL
      </div>
      <CrearLista visible={crearListaVisible} onClose={hideCrearLista} />
    </div>
  );
}

export default Menu;
