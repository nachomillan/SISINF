# Dockerfile

# Usa la imagen de Node 15
FROM node:15

# Establece el directorio de trabajo
WORKDIR /home/frontend

# Copia el package.json y package-lock.json a la imagen
COPY ./frontend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY ./frontend .

# Exponer el puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
