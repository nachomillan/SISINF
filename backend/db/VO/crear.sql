 CREATE TABLE Usuario (
    idUser SERIAL PRIMARY KEY,
    nombreUsuario VARCHAR NOT NULL UNIQUE,
    foto VARCHAR,
    correo VARCHAR NOT NULL,
    contraseña VARCHAR NOT NULL
);
CREATE TABLE Seguir (
    seguidor_id INTEGER,
    seguido_id INTEGER,
    PRIMARY KEY (seguidor_id, seguido_id),
    FOREIGN KEY (seguidor_id) REFERENCES Usuario(idUser),
    FOREIGN KEY (seguido_id) REFERENCES Usuario(idUser)
);
CREATE TABLE Lista (
    idLista SERIAL PRIMARY KEY,
    nombre VARCHAR,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(idUser)
);
CREATE TABLE Produccion (
    idprod SERIAL PRIMARY KEY,
    idapi VARCHAR NOT NULL,
    titulo VARCHAR NOT NULL,
    genero VARCHAR NOT NULL, 
    agno INTEGER NOT NULL,
    duracion INTEGER NOT NULL,
    tipo VARCHAR NOT NULL,
    ntemporadas INTEGER,
    imagen VARCHAR
);
CREATE TABLE Publicar (
    idUserPublicar INTEGER,
    idProdPublicar INTEGER,
    valoracion INTEGER NOT NULL,  
    comentario VARCHAR NOT NULL, 
    PRIMARY KEY (idUserPublicar, idProdPublicar, valoracion, comentario),
    FOREIGN KEY (idUserPublicar) REFERENCES Usuario(idUser),
    FOREIGN KEY (idProdPublicar) REFERENCES Produccion(idProd)
);
CREATE TABLE Pertenecer (
    idProdPertenecer INTEGER,  
    idListaPertenecer INTEGER,  
    PRIMARY KEY (idProdPertenecer, idListaPertenecer),
    FOREIGN KEY (idListaPertenecer) REFERENCES Lista(idLista),
    FOREIGN KEY (idProdPertenecer) REFERENCES Produccion(idProd)
);
CREATE TABLE Actor (
    idActor SERIAL PRIMARY KEY, 
    nombre VARCHAR NOT NULL,
    nacimiento VARCHAR NOT NULL,
    nacionalidad VARCHAR NOT NULL
);
CREATE TABLE Salir (
    idActorSalir INTEGER,
    idProdSalir INTEGER,
    PRIMARY KEY (idActorSalir, idProdSalir),
    FOREIGN KEY (idActorSalir) REFERENCES Actor(idActor),
    FOREIGN KEY (idProdSalir) REFERENCES Produccion(idProd)
);