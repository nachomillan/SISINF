import React, { useState } from 'react';
import './Estilos/CrearLista.css'; // Agrega tus estilos CSS para el panel aquí

function CrearLista({ visible, onClose }) {
  const [nombreLista, setNombreLista] = useState('');

  // Función para manejar el cambio en el campo de nombre de lista
  const handleNombreListaChange = (e) => {
    setNombreLista(e.target.value);
  };

  // Función para cerrar el panel y restablecer el campo de nombre de lista
  const handleClose = () => {
    setNombreLista('');
    onClose();
  };

  return visible ? (
    <div className="crear-lista-overlay">
      <div className="crear-lista-panel">
        <h2>Crear Nueva Lista</h2>
        <input
          type="text"
          placeholder="Nombre de la lista"
          value={nombreLista}
          onChange={handleNombreListaChange}
        />
        <div className="botones">
          <button className="cancelar" onClick={handleClose}>
            Cancelar
          </button>
          <button className="aceptar" onClick={() => alert(`Creando lista: ${nombreLista}`)}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default CrearLista;
