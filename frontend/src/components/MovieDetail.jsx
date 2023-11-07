import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import './Estilos/MovieDetail.css'; // Importa tu archivo de estilos CSS

function MovieDetail() {
    const { prodId } = useParams();

    const busquedaPeli = async () => {
        const url = `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${prodId}&currentCountry=ES`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7dd80bde07msh88ad6b073887de1p14a7c1jsna825d0f3ff22',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={busquedaPeli}>Realizar Búsqueda</button>
        </div>
    );
}

export default MovieDetail;

