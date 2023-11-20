import React, { useState, useEffect, useRef } from 'react';
import './Estilos/CrearLista.css'; // Importa tus estilos CSS
import { useNavigate } from 'react-router-dom'

function CrearLista({ onClose }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [listName, setListName] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleAccept = async (e) => {
    e.preventDefault();
    if (listName.trim() !== '') {
      try {
        const body = { nombreLista: listName, idusuario: localStorage.getItem('idUser') };
        const response = await fetch('http://localhost:3001/listas', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes)
        if (parseRes === "Ya existe una lista con este nombre") {
          setMessage("Error Ya existe una lista con este nombre. Elige otro nombre.");
        } else {
          setMessage("Lista creada exitosamente.");
          setTimeout(() => {
            navigate('/mis-listas');
          }, 1000);
          // Puedes realizar acciones adicionales si es necesario
        }
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        setMessage("Error al llamar a la API. Por favor, inténtalo de nuevo.");
      }
    } else {
      console.warn('El campo de nombre de lista está vacío');
      setMessage("Por favor, ingresa un nombre para la lista.");
    }
  };

  const handleCancel = () => {
    // Handle the "Cancelar" button click
    onClose();
    
  };
  useEffect(()=>{
    if(localStorage.getItem('isLoggedIn')==="true"){
      setError('')
    }else{
      setError('Inicia sesión para crear una lista')
    }

    // Manejador de tecla "Escape"
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
  })
  return (
  <div className="crear-lista-panel">
     {error && <p className="error-message">{error}</p>}
    {isLoggedIn && (  
        <>
          <form className="crear-lista-content" onSubmit={handleAccept}>
            <h2>Crear Lista</h2>
            <input
              type="text"
              placeholder="Nombre de la lista"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="button-container">
              <button className="accept-button" type="submit">
                Aceptar
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
            {message && (
              <p className={`message ${message.includes('Error') ? 'error-message' : 'success-message'}`}>
                {message}
              </p>
            )}
          </form>
        </>
    )}
  </div>
);

}

export default CrearLista;
