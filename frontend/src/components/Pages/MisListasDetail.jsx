import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function MisListasDetail() {
   const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
    </div>
  );
}

export default MisListasDetail;
