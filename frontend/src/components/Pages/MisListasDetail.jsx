import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Estilos/MisListasDetail.css'
function MisListasDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await fetch(`http://localhost:3001/listas/pelis/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const parseRes = await response.json(); 
        console.log(parseRes)

        // Para cada elemento en el vector, realiza llamadas adicionales
        const newData = await Promise.all(
          parseRes.map(async (element) => {
            // Realiza la llamada para obtener información adicional para cada elemento
             const additionalInfoResponse = await fetch(`http://localhost:3001/prod/${element.idprodpertenecer}`, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
              },
            });
            const additionalInfo = await additionalInfoResponse.json();
            // Combina la información adicional con el elemento original
            return { ...element, additionalInfo};
          })
        );

        setData(newData); // Asigna los datos actualizados al estado
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData(); // Llama a la función para obtener datos al montar el componente
  }, []);

    return (
    <div className="container">
      <h2 className="heading">Datos de la lista:</h2>
      <ul className="movieList">
        {data.map((item) => (
          <li key={item.additionalInfo.idprod} className="movieItem">
            <img src={item.additionalInfo.imagen} alt="Imagen" className="movieImage" />
            <div className="movieDetails">
              <h3 className="movieTitle">{item.additionalInfo.titulo}</h3>
              {/* Puedes agregar otros detalles del elemento según sea necesario */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MisListasDetail;
