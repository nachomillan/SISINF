// Clase Usuario
class UsuarioVO {
  #idUser;
  #nombreUsuario;
  #foto;
  #correo;
  #contraseña;
  constructor(_idUser, _nombreUsuario, _foto, _correo, _contraseña) {
    this.idUser = _idUser;
    this.nombreUsuario = _nombreUsuario;
    this.foto = _foto;
    this.correo = _correo;
    this.contraseña = _contraseña;
  }
    getIdUser() {
    return this.idUser;
  }

  setIdUser(idUser) {
    this.idUser = idUser;
  }

  getNombreUsuario() {
    return this.nombreUsuario;
  }

  setNombreUsuario(nombreUsuario) {
    this.nombreUsuario = nombreUsuario;
  }

  getFoto() {
    return this.foto;
  }

  setFoto(foto) {
    this.foto = foto;
  }

  getCorreo() {
    return this.correo;
  }

  setCorreo(correo) {
    this.correo = correo;
  }

  getContraseña() {
    return this.contraseña;
  }

  setContraseña(contraseña) {
    this.contraseña = contraseña;
  }
}


