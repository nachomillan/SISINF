// Clase Lista
class ListaVO {
  #idLista;
  #nombre;
  #usuario_id;
  constructor(_idLista, _nombre, _usuario_id) {
    this.idLista = _idLista;
    this.nombre = _nombre;
    this.usuario_id = _usuario_id;
  }

    
  getIdLista() {
    return this.idLista;
  }

  setIdLista(idLista) {
    this.idLista = idLista;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getUsuarioId() {
    return this.usuario_id;
  }

  setUsuarioId(usuario_id) {
    this.usuario_id = usuario_id;
  }
}