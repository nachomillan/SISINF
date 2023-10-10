// Clase Seguir
class SeguirVO {
  #seguidor_id;
  #seguido_id;
  constructor(_seguidor_id, _seguido_id) {
    this.seguidor_id = _seguidor_id;
    this.seguido_id = _seguido_id;
  }
    getSeguidorId() {
    return this.seguidor_id;
  }

  setSeguidorId(seguidor_id) {
    this.seguidor_id = seguidor_id;
  }

  getSeguidoId() {
    return this.seguido_id;
  }

  setSeguidoId(seguido_id) {
    this.seguido_id = seguido_id;
  }
}