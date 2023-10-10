// Clase Pertenecer
class PertenecerVO {
  #idProdPertenecer;
  #idListaPertenecer;
  constructor(_idProdPertenecer, _idListaPertenecer) {
    this.idProdPertenecer = _idProdPertenecer;
    this.idListaPertenecer = _idListaPertenecer;
  }

  getIdProdPertenecer() {
    return this.idProdPertenecer;
  }

  setIdProdPertenecer(idProdPertenecer) {
    this.idProdPertenecer = idProdPertenecer;
  }

  getIdListaPertenecer() {
    return this.idListaPertenecer;
  }

  setIdListaPertenecer(idListaPertenecer) {
    this.idListaPertenecer = idListaPertenecer;
  }
}