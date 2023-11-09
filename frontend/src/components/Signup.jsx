import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Estilos/Signup.css'
const SignUp = ({ setAuth }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombreUsuario: "",
    email: "",
    foto: "", 
    password: "",
    message : "",
  });

  const { nombreUsuario, email, foto, password, message } = values;

  const onChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { nombreusuario: nombreUsuario, correo: email, foto:foto, contrasena: password };
      const response = await fetch(
        "http://localhost:3001/user/signup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
       const parseRes = await response.json();
      console.log(parseRes)
      if (parseRes === "Error en algun campo") {
        setValues({ ...values, message: parseRes });
      } else {
        // Si el inicio de sesión es exitoso, redirige al usuario a la ruta /
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('username',body.nombreusuario)
        navigate('/');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

     return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="form-control"
        />
        <input
          type="text"
          name="nombreUsuario"
          value={nombreUsuario}
          placeholder="Nombre de Usuario"
          onChange={(e) => onChange(e)}
          className="form-control"
        />
        <input
          type="text"
          name="foto"
          value={foto}
          placeholder="Foto"
          onChange={(e) => onChange(e)}
          className="form-control"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => onChange(e)}
          className="form-control"
        />
        {message && (
          <div className="alert" role="alert">
            {message}
          </div>
        )}
        <button className="btn btn-success">Submit</button>
      </form>
      <div className="login-link">
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default SignUp;