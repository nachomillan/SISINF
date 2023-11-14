import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Menu';
import MovieSearch from '../MovieSearch';
import AddFriendsModal from '../AgnadirAmigos'; // Importa el nuevo componente
import '../Estilos/Social.css'; // Importa el archivo de estilos CSS

const SocialPage = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [posts, setPosts] = useState([])
  const useEffectHasRun = useRef(false);

  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  async function obtenerUrlDeImagen(id) {
    try {
       const response = await fetch(`http://localhost:3001/prod/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
      const data = await response.json();
      console.log(data)
      // Asume que la respuesta de la API tiene una propiedad "url" que contiene la URL de la imagen
      return data;
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      // Puedes lanzar una excepción, devolver una URL de imagen por defecto o tomar otra acción según tus necesidades
      throw error;
    }
  }
  async function obtenerNombreDeUsuario(id) {
    try {
       const response = await fetch(`http://localhost:3001/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
      const data = await response.json();
      return data.nombreusuario;
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      // Puedes lanzar una excepción, devolver una URL de imagen por defecto o tomar otra acción según tus necesidades
      throw error;
    }
  }
  const openAddFriendsModal = () => {
    setShowAddFriendsModal(true);
  };
  const closeAddFriendsModal = () => {
    setShowAddFriendsModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { idusuario: localStorage.getItem('idUser') };
        const response = await fetch('http://localhost:3001/user/social', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        setFollowingCount(parseRes.seguidos);
        setFollowersCount(parseRes.seguidores);
      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };
    const fetchData3 = async () => {
      try {
        const body = { idusuario: localStorage.getItem('idUser') };
        const response = await fetch('http://localhost:3001/publicacion/conseguirPublicaciones', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
          const postsConImagenes = await Promise.all(
          parseRes.map(async (post) => {
            try {
              const data = await obtenerUrlDeImagen(post.idprodpublicar);
              const _user = await obtenerNombreDeUsuario(post.iduserpublicar)
              return { ...post, titulo: data.titulo, imagen : data.imagen , user:_user };
            } catch (error) {
              console.error('Error al obtener la imagen para la publicación:', error);
            }
          })
        );
        setPosts(postsConImagenes)

      } catch (error) {
        console.error('Error en la petición GET:', error);
      }
    };
    if (!useEffectHasRun.current) {
      fetchData(); // Llamamos a la función asíncrona dentro de useEffect
      fetchData3();
    // Tu código aquí
    useEffectHasRun.current = true;
  }

  }, [posts]);



   return (
    <div className="social-page">
      <MovieSearch />
      <Menu />
      <div className="main-content">
        <div className="user-info">
          <h2>{localStorage.getItem('username')}</h2>
          <div className="user-stats">
            <p>Seguidores: {followersCount}</p>
            <p>Siguiendo: {followingCount}</p>
          </div>
          <button className="add-friends-button" onClick={openAddFriendsModal}>
            Añadir Amigos
          </button>
        </div>
        <div className="header">
          <h1>Red Social de Películas</h1>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.idpublicar} className="post">
              <div className="post-left">
                <img src={post.imagen} alt={`Foto del usuario ${post.idusuario}`} />
              </div>
              <div className="post-right">
                <h3>{post.titulo}</h3>
                <p>{post.comentario}</p>
                <p>Valoración: {post.valoracion} estrellas</p>
                <p>Usuario: {post.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddFriendsModal && <AddFriendsModal onClose={closeAddFriendsModal} />}
    </div>
  );
};

export default SocialPage;
