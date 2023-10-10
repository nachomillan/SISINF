// Clase Actor
class ActorVO {
    
  #idActor;
  #nombre;
  #nacimiento;
  #nacionalidad;
  constructor(_idActor, _nombre, _nacimiento, _nacionalidad) {
    this.idActor = _idActor;
    this.nombre = _nombre;
    this.nacimiento = _nacimiento;
    this.nacionalidad = _nacionalidad;
  }
   getIdActor() {
    return this.idActor;
  }

  setIdActor(idActor) {
    this.idActor = idActor;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getNacimiento() {
    return this.nacimiento;
  }

  setNacimiento(nacimiento) {
    this.nacimiento = nacimiento;
  }

  getNacionalidad() {
    return this.nacionalidad;
  }

  setNacionalidad(nacionalidad) {
    this.nacionalidad = nacionalidad;
  }
}