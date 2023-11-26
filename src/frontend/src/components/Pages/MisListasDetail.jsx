import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import '../Estilos/MisListasDetail.css'
import Menu from '../Menu';
import NavegadorNoBuscar from '../NavegadorNoBuscar';
function MisListasDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
    const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/listas/pelis/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const parseRes = await response.json();
      // Para cada elemento en el vector, realiza llamadas adicionales
      const newData = await Promise.all(
        parseRes.map(async (element) => {
          setTimeout(() => {
          }, 1000);
          // Realiza la llamada para obtener información adicional para cada elemento
          const additionalInfoResponse = await fetch(`http://localhost:3001/prod/${element.idprodpertenecer}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });
          const additionalInfo = await additionalInfoResponse.json();
          console.log(additionalInfo)
          // Combina la información adicional con el elemento original
          return { ...element, additionalInfo };
        })
      );

      setData(newData); // Asigna los datos actualizados al estado
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  };

  useEffect(() => {
    fetchData(); // Llama a la función para obtener datos al montar el componente
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3001/listas/${id}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, vuelve a cargar los datos
        fetchData();
      } else {
        console.error('Error al eliminar la lista:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };
 return (
  <div>
    <NavegadorNoBuscar />
    <Menu />
    <div className="container">
      <h2 className="heading">Datos de la lista:</h2>
      {data.length > 0 ? (
        <ul className="movieList">
          {data.map((item, index) => (
            <li key={index} className="movieItem">
              <img src={item.additionalInfo.imagen} alt="Imagen" className="movieImage" />
              <div className="movieDetails">
                <h3 className="movieTitle">{item.additionalInfo.titulo}</h3>
                {/* Puedes agregar otros detalles del elemento según sea necesario */}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.additionalInfo.idprod)}
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{color:'black'}}>No hay películas en la lista seleccionada</p>
      )}
    </div>
  </div>
);

}

export default MisListasDetail;
