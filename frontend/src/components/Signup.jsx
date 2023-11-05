import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
        navigate('/');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="nombreUsuario"
          value={nombreUsuario}
          placeholder="nombreUsuario"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="foto"
          value={foto}
          placeholder="foto"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
       <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <button onClick={() => navigate('/login')}>Login</button>
    </Fragment>
  );
};

export default SignUp;