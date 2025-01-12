/**
* @author Jose Antonio Pozo Gonzalez
* @email iwc70842@educastur.es
* @version 1.0
* @description  Ejercicio 3 Unidad Temática 4 Jerarquíuas Objetos Aeronaves
*/

//Prototipo de aeronave
function Aeronave(id, combustible) {
  //suponemos la cantidad de combustible en porcentaje de depósito lleno. 
  if (combustible <= 0 || combustible > 100) {
    alert("El contenido del deposito no puede ser inferior al 0% o superior al 100%");
    return;
  }
  this.id = id;
  this.combustible = combustible;
  this.TrenAterrizaje = new TrenAterrizaje();

}

Aeronave.prototype.despegar = function () {
  //comprobar presion en todas las ruedas y combustible
  //Tomamos que si no tiene la mitad del deposito al menos no puede despegar
  if (this.combustible > 50 && this.TrenAterrizaje.comprobarPresionRuedas()) {
    this.TrenAterrizaje.subir();
    console.log(`La aeronave ${this.id} ha despegado.`);

  } else {
    console.log(`La aeronave ${this.id} no puede despegar. Compruebe combustible y ruedas.`);
  }
}

Aeronave.prototype.aterrizar = function () {
  this.TrenAterrizaje.bajar();
  console.log(`La aeronave ${this.id} ha aterrizado.`);

}

//Prototipo de Tren de Aterrizaje
function TrenAterrizaje() {
  this.frontal = new Puntal();
  this.izquierdo = new Puntal();
  this.derecho = new Puntal();
  this.bajado = false;
}
TrenAterrizaje.prototype.subir = function () {
  this.bajado=false;
  this.frontal.replegar();
  this.izquierdo.replegar();
  this.derecho.replegar();
  console.log("Tren de aterrizaje subido.")

}
TrenAterrizaje.prototype.bajar = function () {
  this.bajado=true;
  this.frontal.desplegar();
  this.izquierdo.desplegar();
  this.derecho.desplegar();
  console.log("Tren de aterrizaje bajado.")
}

TrenAterrizaje.prototype.comprobarPresionRuedas = function () {
  return (
    this.frontal.ruedaIzquierda.presionOptima() &&
    this.frontal.ruedaDerecha.presionOptima() &&
    this.izquierdo.ruedaIzquierda.presionOptima() &&
    this.izquierdo.ruedaDerecha.presionOptima() &&
    this.derecho.ruedaDerecha.presionOptima() &&
    this.derecho.ruedaIzquierda.presionOptima()
  );
}

//Prototipo Puntal
function Puntal() {
  this.ruedaIzquierda = ruedaIzquierda;
  this.ruedaDerecha = ruedaDerecha;
  this.desplegado = false;
}

Puntal.prototype.desplegar = function () {
  this.desplegado = true;
  console.log("Puntal desplegado.");
}

Puntal.prototype.replegar = function () {
  this.desplegado = false;
  console.log("Puntal replegado.");
}

//Prototipo Rueda
function Rueda(presionMaxima, presion) {
  if (presionMaxima <= 0 || presionMaxima >= 27000) {

  }
  if (presion <= 0 || presion >= 27000) {

  }
  this.presionMaxima = presionMaxima;
  this.presion = presion;

}

Rueda.prototype.obtenerPresion = function () {
  return this.presion;
}

Rueda.prototype.presionOptima = function () {
  //Para ser optima y devolver true debe ser mayor a 85%
  return (this.presion / this.presionMaxima) * 100 > 85;
}

//Prototipo Hangar
function Hangar() {
  this.aeronaves = [];
}

Hangar.prototype.añadeAeronave = function (aeronave) {
  this.aeronaves.push(aeronave);
}
Hangar.prototype.listarAeronaves = function () {
  this.aeronaves.forEach(aeronave => console.log("info de cada aeronave"));
}