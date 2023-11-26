import React, {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Estilos/Signup.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombreUsuario: "",
    email: "",
    foto: "", 
    password: "",
    message: "",
  });

  const { nombreUsuario, email, foto, password, message } = values;

  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validateEmail = () => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Expresión regular para validar la contraseña (al menos 6 caracteres con letras y números)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // Validar el formato del email y la contraseña antes de enviar la solicitud
    if (!validateEmail()) {
      setValues({ ...values, message: 'Formato de email no válido' });
    } else if (!validatePassword()) {
      setValues({
        ...values,
        message:
          'La contraseña debe tener al menos 6 caracteres e incluir letras y números',
      });
    } else {
      try {
        const body = {
          nombreusuario: nombreUsuario,
          correo: email,
          foto: 0,
          contrasena: password,
        };
        const response = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
        if (parseRes === "El correo ya existe" || parseRes === "El nombre de usuario ya existe") {
          setValues({ ...values, message: parseRes });
        } else {
          // Si el registro es exitoso, redirige al usuario a la ruta /
          localStorage.clear();
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('username', body.nombreusuario);
          localStorage.setItem('idUser', parseRes.iduser);
          navigate('/');
        }
      } catch (err) {
        console.error(err.message);
      }
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
