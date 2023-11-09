import React, { useState } from 'react';
import './Estilos/CrearLista.css'; // Import your CSS styles

function CrearLista({ onClose, onAccept }) {
  const [listName, setListName] = useState('');

  const handleAccept = () => {
    // Handle the "Aceptar" button click
    onAccept(listName);
  };

  const handleCancel = () => {
    // Handle the "Cancelar" button click
    onClose();
  };

  return (
    <div className="crear-lista-panel">
      <div className="crear-lista-content">
        <h2>Crear Lista</h2>
        <input
          type="text"
          placeholder="Nombre de la lista"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <div className="button-container">
          <button className="accept-button" onClick={handleAccept}>
            Aceptar
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrearLista;
