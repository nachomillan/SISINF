import React from 'react';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';
import MovieSearch from './components/MovieSearch'; // Asegúrate de ajustar la importación según la ubicación de tu componente
import SignUp from './components/Signup';
import Social from './components/Pages/Social'

function App() {
  return (
       <Router>
      {/* <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner"> */}
            <Routes>
              <Route exact path="/" element={<MovieSearch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/social" element={<Social/>} />
            </Routes>
          {/* </div>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
