import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilos/AgnadirAListas.css';

function AgnadirAListas({ onClose, id }) {
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const conseguirListas = async () =>{
        const response = await fetch(`http://localhost:3001/listas/${localStorage.getItem('idUser')}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const parseRes = await response.json();
        console.log(parseRes)
        if(parseRes === "No tiene listas"){

        }else{
          setListas(parseRes)
        }
  } 
    conseguirListas()
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente
  const handleAddToLists = async(idLista)=>{

  }
  return (
    <div className="add-friends-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Añadir a tus listas</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="movie-list">
          {/* Muestra los resultados de la búsqueda aquí */}
          {listas.map((result) => (
            <div key={result.idlista} className="movie-result">
              <p>{result.nombre}</p>
              <button onClick={() => handleAddToLists(result.idlista)}>Añadir a lista</button>
            </div>
          ))}
          {/* Mostrar mensaje si no hay resultados */}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default AgnadirAListas;
