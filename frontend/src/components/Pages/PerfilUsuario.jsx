import React, { useState, useEffect, useRef } from 'react';
import Menu from '../Menu';
import NavegadorNoBuscar from '../NavegadorNoBuscar';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import '../Estilos/PerfilUsuario.css'; // Importa el archivo de estilos CSS

const PerfilUsuario = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [posts, setPosts] = useState([])
  const useEffectHasRun = useRef(false);
  const navigate = useNavigate();
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
        const user =localStorage.getItem('idUser');
        const response = await fetch(`http://localhost:3001/publicacion/conseguirMisPublicaciones/${user}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const parseResa = await response.json();
        const parseRes = parseResa.reverse();
        console.log(parseRes);
          const postsConImagenes = await Promise.all(
          parseRes.map(async (post) => {
            try {
              const data = await obtenerUrlDeImagen(post.idprodpublicar);
              const _user = localStorage.getItem('username');
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
  useEffect(() => {
    if (!useEffectHasRun.current) {
      fetchData(); // Llamamos a la función asíncrona dentro de useEffect
      fetchData3();
    // Tu código aquí
    useEffectHasRun.current = true;
  }
  }, []);



   return (
    <div>
     <NavegadorNoBuscar />
      <Menu />
    <div className="social-page">
      <div className="main-content">
        <div className="user-info">
          <h1>{localStorage.getItem('username')}</h1>
          <div style={{fontSize:'30px'}} onClick={()=>{navigate(`/usuario/ajustes/${localStorage.getItem('idUser')}`)}}>
            <FaCog />
          </div>
          <div className="user-stats">
            <p style={{color:'black'}}>Seguidores: {followersCount}</p>
            <p style={{color:'black'}}>Siguiendo: {followingCount}</p>
          </div>
          <h2>Tus publicaciones</h2>
        </div>
        <div className="header">
        </div>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.idpublicar} className="post">
              <div className="post-left">
                <img src={post.imagen} alt={`Foto del usuario ${post.idusuario}`} />
              </div>
              <div className="post-right">
                <h1 style={{color:'black', fontSize:'30px'}}>{post.titulo}</h1>
                <p style={{color:'black', fontStyle:'italic'}}> "{post.comentario}"</p>
                <p className="rating-stars">{Array.from({ length: post.valoracion }).map((_, index) => '★').join('')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default PerfilUsuario;
