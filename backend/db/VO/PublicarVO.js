// Clase Publicar
class PublicarVO {
  #idUserPublicar;
  #idProdPublicar;
  #valoracion;
  #comentario;
  constructor(_idUserPublicar, _idProdPublicar, _valoracion, _comentario) {
    this.idUserPublicar = _idUserPublicar;
    this.idProdPublicar = _idProdPublicar;
    this.valoracion = _valoracion;
    this.comentario = _comentario;
  }
    getIdUserPublicar() {
    return this.idUserPublicar;
  }

  setIdUserPublicar(idUserPublicar) {
    this.idUserPublicar = idUserPublicar;
  }

  getIdProdPublicar() {
    return this.idProdPublicar;
  }

  setIdProdPublicar(idProdPublicar) {
    this.idProdPublicar = idProdPublicar;
  }

  getValoracion() {
    return this.valoracion;
  }

  setValoracion(valoracion) {
    this.valoracion = valoracion;
  }

  getComentario() {
    return this.comentario;
  }

  setComentario(comentario) {
    this.comentario = comentario;
  }
}