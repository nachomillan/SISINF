import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Menu';
import NavegadorNoBuscar from '../NavegadorNoBuscar';
import AddFriendsModal from '../AgnadirAmigos'; // Importa el nuevo componente
import '../Estilos/Social.css'; // Importa el archivo de estilos CSS
import { useNavigate } from 'react-router-dom';
import VerSeguidos from '../VerSeguidos';
import VerSeguidores from '../VerSeguidores';

const SocialPage = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const useEffectHasRun = useRef(false);
  const navigate = useNavigate();
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [showSeguidores, setShowSeguidores] = useState(false);
  const [showSeguidos, setShowSeguidos] = useState(false);
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
  async function obtenerNombre(id) {
    try {
       const response = await fetch(`http://localhost:3001/user/datos/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
      const data = await response.json();
      // Asume que la respuesta de la API tiene una propiedad "url" que contiene la URL de la imagen
      return data;
    } catch (error) {
      console.error('Error al obtener username:', error);
      // Puedes lanzar una excepción, devolver una URL de imagen por defecto o tomar otra acción según tus necesidades
      throw error;
    }
  }

  const openAddFriendsModal = () => {
    setShowAddFriendsModal(true);
  };
  const closeAddFriendsModal = () => {
    setShowAddFriendsModal(false);
    fetchData(); // Llamamos a la función asíncrona dentro de useEffect
    fetchData3();
  };
  const openSeguidores = () => {
    setShowSeguidores(true);
  };
  const closeSeguidores = () => {
    setShowSeguidores(false);
  };
  const openSeguidos = () => {
    setShowSeguidos(true);
  };
  const closeSeguidos = () => {
    setShowSeguidos(false);
    fetchData(); // Llamamos a la función asíncrona dentro de useEffect
    fetchData3();
  };
  const isLoggedIn = localStorage.getItem('isLoggedIn')
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
          console.log("esto es ", parseRes);
            const postsConImagenes = await Promise.all(
            parseRes.map(async (post) => {
              try {
                const data = await obtenerUrlDeImagen(post.idprodpublicar);
                const usernameSeguido = await obtenerNombre(post.iduserpublicar)
                // const _user = localStorage.getItem('username');
                return { ...post, titulo: data.titulo, imagen : data.imagen , user:usernameSeguido.nombreusuario, idapi:data.idapi};
              } catch (error) {
                console.error('Error al obtener la imagen para la publicación:', error);
              }
            })
          );
          setPosts(postsConImagenes)
          setError('')
        } catch (error) {
          console.error('Error en la petición GET:', error);
        }
      };
  useEffect(() => {
    if(isLoggedIn === "true"){
      if (!useEffectHasRun.current) {
        fetchData(); // Llamamos a la función asíncrona dentro de useEffect
        fetchData3();
      useEffectHasRun.current = true;
      }
    }else{
      setError("Inicia sesión para ver lo que han compartido tus amigos")
    }
  }, [showAddFriendsModal]);



   return (
    <div>
     <NavegadorNoBuscar />
      <Menu />
    <div className="social-page">
      <div className="main-content">
        <div className="user-info">
       {error && <p className="error-message">{error}</p>}
          <h1>{localStorage.getItem('username')}</h1>
          {isLoggedIn && (
            <>
              <div className="user-stats">
                 <button className="stats-button" onClick={openSeguidores}>
                    Seguidores: {followersCount}
                  </button>
                  <button className="stats-button" onClick={openSeguidos}>
                    Siguiendo: {followingCount}
                  </button>
              </div>
              <button className="add-friends-button" onClick={openAddFriendsModal}>
                Añadir Amigos
              </button>
            </>
          )}
        </div>
        <div className="header">
        </div>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.idpublicar} className="post">
              <div className="post-left" onClick={()=>{navigate(`/movies/${post.idapi}`)}}>
                <img src={post.imagen} alt={`Foto del usuario ${post.idusuario}`} />
              </div>
              <div className="post-right">
                <h1 style={{color:'black', fontSize:'30px'}}>{post.titulo}</h1>
                <p style={{color:'black', fontStyle:'italic'}}>"{post.comentario}"</p>
                <p className="rating-stars">{Array.from({ length: post.valoracion }).map((_, index) => '★').join('')}</p>
                <p style={{color:'black', fontStyle:'italic', fontSize:'20px'}}>{post.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddFriendsModal && <AddFriendsModal onClose={closeAddFriendsModal} />}
      {showSeguidos && <VerSeguidos onClose={closeSeguidos} />}
      {showSeguidores && <VerSeguidores onClose={closeSeguidores} />}
    </div>
  </div>
  );
};

export default SocialPage;
