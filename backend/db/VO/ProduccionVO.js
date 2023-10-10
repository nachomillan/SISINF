// Clase Produccion
class ProduccionVO {
  #idProd;
  #titulo;
  #valoracion;
  #genero;
  #agno;
  #duracion;
  #tipo;
  #ntemporadas;
  constructor(_idProd, _titulo, _valoracion, _genero, _agno, _duracion, _tipo, _ntemporadas) {
    this.idProd = _idProd;
    this.titulo = _titulo;
    this.valoracion = _valoracion;
    this.genero = _genero;
    this.agno = _agno;
    this.duracion = _duracion;
    this.tipo = _tipo;
    this.ntemporadas = _ntemporadas;
  }
    getIdProd() {
    return this.idProd;
  }

  setIdProd(idProd) {
    this.idProd = idProd;
  }

  getTitulo() {
    return this.titulo;
  }

  setTitulo(titulo) {
    this.titulo = titulo;
  }

  getValoracion() {
    return this.valoracion;
  }

  setValoracion(valoracion) {
    this.valoracion = valoracion;
  }

  getGenero() {
    return this.genero;
  }

  setGenero(genero) {
    this.genero = genero;
  }

  getagno() {
    return this.agno;
  }

  setAgno(agno) {
    this.agno = agno;
  }

  getDuracion() {
    return this.duracion;
  }

  setDuracion(duracion) {
    this.duracion = duracion;
  }

  getTipo() {
    return this.tipo;
  }

  setTipo(tipo) {
    this.tipo = tipo;
  }

  getNtemporadas() {
    return this.ntemporadas;
  }

  setNtemporadas(ntemporadas) {
    this.ntemporadas = ntemporadas;
  }
}