import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './Estilos/MovieDetail.css'; // Importa tu archivo de estilos CSS
import StarRating from './StarRating';

function MovieDetail() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [rating, setRating] = useState(0); // Estado para la calificación
    const [comment, setComment] = useState("");
    
    const busquedaPeli = async () => {
        const url = `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7dd80bde07msh88ad6b073887de1p14a7c1jsna825d0f3ff22',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const resultText = await response.text();
            const result = JSON.parse(resultText);
            setMovieData(result);
        } catch (error) {
            console.error(error);
        }
    }

    // Función para manejar cambios en la calificación
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const realizarPublicacion = async() => {
        
    };
    useEffect(() => {
        busquedaPeli();
    }, []);

    return (
        <div className="movie-detail-container">
            <div className="column-left">
                <img
                    src={movieData.title && movieData.title.image && movieData.title.image.url}
                    alt={movieData.title && movieData.title.title}
                    className="movie-image2"
                />
                <div className="genres">
                    {movieData.genres && movieData.genres.map((genre, index) => (
                        <span key={index} className="genre">{genre}</span>
                    ))}
                </div>
            </div>
            <div className="column-right">
                <h1>{movieData.title && movieData.title.title}</h1>
                <p>Director: {movieData.director}</p>
                <p>Año de estreno: {movieData.title && movieData.title.year}</p>
                <p>Duración: {movieData.title && movieData.title.runningTimeInMinutes} minutos</p>
                <p>{movieData.plotOutline && movieData.plotOutline.text}</p>
                 {/* Campo de calificación con estrellas */}
               <div className="rating">
                    <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    <textarea
                        placeholder="Deja tu comentario"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button onClick={realizarPublicacion}>Calificar</button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
