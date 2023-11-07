// AddFriendsModal.jsx

import React from 'react';
import './Estilos/AgnadirAmigos.css'; // Agrega tus estilos CSS para el modal aquí

function AddFriendsModal({ onClose }) {
  // Aquí implementa la funcionalidad de búsqueda de amigos y muestra los resultados.
  // Puedes agregar un campo de búsqueda, lista de amigos sugeridos, etc.

  return (
    <div className="add-friends-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Buscar Amigos</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Buscar amigos..." />
        </div>
        <div className="friends-list">
          {/* Agrega aquí la lista de amigos sugeridos */}
        </div>
      </div>
    </div>
  );
}

export default AddFriendsModal;
