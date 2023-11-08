import React from 'react';
import Navegador from '../Navegador';
import Menu from '../Menu'

function PaginaPrincipal() {
  return (
    <div>
      <Navegador />
      <Menu />
      <div className="content">
        {/* Contenido principal de tu página */}
      </div>
    </div>
  );
}

export default PaginaPrincipal;