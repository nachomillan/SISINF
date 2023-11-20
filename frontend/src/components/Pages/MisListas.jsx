import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/MisListas.css'
import Menu from '../Menu';
import NavegadorNoBuscar from '../NavegadorNoBuscar';
function MisListas() {
  const [listas, setListas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      setError("No tienes Listas")
    }else{
      setListas(parseRes)
    }
} 
const isLoggedIn = localStorage.getItem('isLoggedIn');
  useEffect(() => {
    if(isLoggedIn === "true"){
      setError('')
      conseguirListas()
    }else{
      setError('Inicia sesión para ver tus listas')
    }
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  const handleSerieClick = (serieId) => {
    navigate(`/mis-listas/${serieId}`);
  };
  const handleEliminarLista = async(serieId, e) => {
    e.stopPropagation();
    const response = await fetch(`http://localhost:3001/listas/${serieId}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const parseRes = await response.json();
        console.log(parseRes)
        conseguirListas()
  };

  return (
    <div>
      <NavegadorNoBuscar />
      <Menu />
    <div className="lista-container">
       {error && <p className="error-message">{error}</p>}
      {isLoggedIn && (
      <h2 className="lista-title">Mis Listas</h2>
      )}
      <ul className="lista-listas">
        {listas.map((serie) => (
          <li key={serie.idlista} className="serie-item" onClick={() => handleSerieClick(serie.idlista)}>
            <div className="serie-info">
              <h3>{serie.nombre}</h3>
            </div>
             <div className="eliminar-lista-container">
              <button className="eliminar-lista-button" onClick={(e) => handleEliminarLista(serie.idlista, e)}>
                Eliminar Lista
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default MisListas;
