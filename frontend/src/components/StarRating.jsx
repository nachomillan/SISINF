import React from 'react';
import './Estilos/StarRating.css'
function StarRating({ rating, onRatingChange }) {
    const stars = [1, 2, 3, 4, 5]; // Cantidad de estrellas

    return (
        <div className="star-rating">
            {stars.map((star) => (
                <span
                    key={star}
                    className={star <= rating ? 'star selected' : 'star'}
                    onClick={() => onRatingChange(star)}
                >
                    &#9733; {/* Código de estrella (☆) */}
                </span>
            ))}
        </div>
    );
}

export default StarRating;
