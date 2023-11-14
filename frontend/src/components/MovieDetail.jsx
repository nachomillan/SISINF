import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Estilos/MovieDetail.css'; // Importa tu archivo de estilos CSS
import StarRating from './StarRating';

function MovieDetail() {
  const navigate = useNavigate();
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [rating, setRating] = useState(0); // Estado para la calificación
    const [comment, setComment] = useState("");
    
    const busquedaPeli = async () => {
        const url = `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '48ae2480a4msh6d2031485ea1a36p11f14bjsn2a0c39c5d01a',
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

    const realizarCalificacion = async (e) => {
        e.preventDefault();
        try {
            const body = { idapi:id, titulo:  movieData.title.title , genero:movieData.genres[0], agno:movieData.title.year, duracion:movieData.title.runningTimeInMinutes, tipo:0, ntemporadas: 0, imagen:movieData.title.image.url};
            const response = await fetch('http://localhost:3001/prod', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
            });
            const resIdProd = await response.json();
            const idProdInt = parseInt(resIdProd.idprod, 10);
            console.log(resIdProd)
            const currentDateTime = new Date().toISOString();
            const body2 = {iduserpublicar:localStorage.getItem('username'), idprodpublicar:idProdInt, valoracion:rating, comentario:comment, fecha:currentDateTime};
            const response2 = await fetch('http://localhost:3001/publicacion', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body2),
            });
            const parseRes = await response2.json();
            console.log(parseRes)
            if (parseRes === "Error en algun campo") {
                console.log(parseRes)
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);          
        }
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

                {/* Formulario de calificación y comentario */}
                <form onSubmit={realizarCalificacion}>
                    <div className="rating">
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </div>
                    <textarea
                        placeholder="Deja tu comentario"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button type="submit">Calificar</button>
                </form>
            </div>
        </div>
    );
}

export default MovieDetail;
