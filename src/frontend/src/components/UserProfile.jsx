import React from 'react';
import PropTypes from 'prop-types';
import './Estilos/UserProfile.css'; // Asegúrate de tener la ruta correcta

const UserProfile = ({ username, followers, following, movieLists }) => {
  return (
    <div className="user-profile">
      <div className="left-section">
        <div className="profile-picture">
          <img src="https://via.placeholder.com/150" alt="Foto de perfil" />
        </div>
        <div className="followers-info">
          <p>Seguidores: {followers}</p>
          <p>Siguiendo: {following}</p>
        </div>
      </div>
      <div className="center-section">
        <div className="user-info">
          <h2>{username}</h2>
        </div>
        <div className="movie-lists">
          <h3>Listas de Películas</h3>
          {/* Agrega tu lógica para mostrar la lista de películas */}
          {/* <ul>
            {movieLists.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  movieLists: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserProfile;
