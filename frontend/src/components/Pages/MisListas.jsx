import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/MisListas.css'
function MisListas() {
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

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

  const handleSerieClick = (serieId) => {
    navigate(`/mis-listas/${serieId}`);
  };

  return (
    <div>
      <h2>Mis Listas</h2>
      <ul className="lista-listas">
        {listas.map((serie) => (
          <li key={serie.idlista} className="serie-item" onClick={() => handleSerieClick(serie.idlista)}>
            <div className="serie-info">
              <h3>{serie.nombre}</h3>
              <p>{serie.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MisListas;
