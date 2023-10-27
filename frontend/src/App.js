import React from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch'; // Asegúrate de ajustar la importación según la ubicación de tu componente

function App() {
  return (
    <div className="App">
      <h1>Mi Aplicación de Búsqueda de Películas</h1>
      <MovieSearch />
    </div>
  );
}

export default App;
