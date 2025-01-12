/**
* @author Jose Antonio Pozo Gonzalez
* @email iwc70842@educastur.es
* @version 1.0
* @description  Ejercicio 3 Unidad Temática 4 Jerarquíuas Objetos Aeronaves
*/

var aeronave1;
var aeronave2;
document.getElementById("tarjetas").style.display = "none";
document.getElementById("listado").style.display = "none";


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

//Funcion para despegar la aeronave
Aeronave.prototype.despegar = function () {
  //Comprobamos que no esté ya en el aire
  if(this.TrenAterrizaje.bajado==false){
    alert(`La aeronave ${this.id} ya está en el aire.`);
    return;
  }
  //Comprobamos combustible y presión de todas las ruedas
  //Para despegar comprobamos que al menos tenga la mitad del tanque de combustible
  if (this.combustible > 50 && this.TrenAterrizaje.comprobarPresionRuedas()) {
    this.TrenAterrizaje.subir();
    console.log(`La aeronave ${this.id} ha despegado.`);
  }
  else {
    alert(`La aeronave ${this.id} no puede despegar. Compruebe combustible y ruedas.`);
  }
}

//Funcion para aterrizar la aeronave
Aeronave.prototype.aterrizar = function () {
  //Comprobamos que no esté ya en el aire
  if(this.TrenAterrizaje.bajado==true){
    alert(`La aeronave ${this.id} ya se encuentra sobre la pista.`);
    return;
  }
  this.TrenAterrizaje.bajar();
  console.log(`La aeronave ${this.id} ha aterrizado.`);
}

//Funcion que facilita información completa de la aeronave y su estado.
Aeronave.prototype.info = function () {
  return (`
    ID Aeronave: ${this.id}\n
    Porcentaje de combustible: ${this.combustible}%\n
    Estado del tren de aterrizaje: ${this.TrenAterrizaje.bajado ? `bajado` : `subido`}\n
    Puntal delantero: ${this.TrenAterrizaje.frontal.desplegado ? `despleago` : `replegado`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.frontal.ruedaIzquierda.presionOptima() ? `Rueda Izq OK` : `Rueda Izq Fallo`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.frontal.ruedaDerecha.presionOptima() ? `Rueda Drch OK` : `Rueda Drch Fallo`}
    Puntal izquierdo: ${this.TrenAterrizaje.izquierdo.desplegado ? `despleago` : `replegado`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.izquierdo.ruedaIzquierda.presionOptima() ? `Rueda Izq OK` : `Rueda Izq Fallo`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.izquierdo.ruedaDerecha.presionOptima() ? `Rueda Drch OK` : `Rueda Drch Fallo`}
    Puntal derecho: ${this.TrenAterrizaje.derecho.desplegado ? `despleago` : `replegado`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.derecho.ruedaIzquierda.presionOptima() ? `Rueda Izq OK` : `Rueda Izq Fallo`}
    Estado presión de las ruedas: ${this.TrenAterrizaje.derecho.ruedaDerecha.presionOptima() ? `Rueda Drch OK` : `Rueda Drch Fallo`}    
    `)
}


//Prototipo de Tren de Aterrizaje

function TrenAterrizaje() {
  this.frontal = new Puntal();
  this.izquierdo = new Puntal();
  this.derecho = new Puntal();
  this.bajado = true;
}
//Funcion para subir el Tren de aterrizaje
TrenAterrizaje.prototype.subir = function () {
  this.bajado = false;
  this.frontal.replegar();
  this.izquierdo.replegar();
  this.derecho.replegar();
  console.log("Tren de aterrizaje subido.")
}
//Funcion para bajar el Tren de aterrizaje
TrenAterrizaje.prototype.bajar = function () {
  this.bajado = true;
  this.frontal.desplegar();
  this.izquierdo.desplegar();
  this.derecho.desplegar();
  console.log("Tren de aterrizaje bajado.")
}
//Función para comprobar la presion de las ruedas del Tren de aterrizaje
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
  this.ruedaIzquierda = new Rueda(20000, 18500);
  this.ruedaDerecha = new Rueda(20000, 18500);
  this.desplegado = true;
}
//Función para desplegar puntal
Puntal.prototype.desplegar = function () {
  this.desplegado = true;
  console.log("Puntal desplegado.");
}
//Funcion para replegar puntal
Puntal.prototype.replegar = function () {
  this.desplegado = false;
  console.log("Puntal replegado.");
}

//Prototipo Rueda

function Rueda(presionMaxima, presion) {
  //Comprobamos si el rango de presión Máxima se ajusta valores válidos  
  if (presionMaxima <= 0 || presionMaxima >= 20700) {
    alert("Presión máxima fuera del rango admisible 0-27000 mb.");
    return;

  }
  //Comprobamos si el reango de la presión de las ruedas esta en valores correctos
  if (presion <= 0 || presion >= 20700) {
    alert("Presión no válida. Debe ser superior a 0 e inferior a 20700");
    return;

  }
  this.presionMaxima = presionMaxima;
  this.presion = presion;
}
//Función para obtener la presión de una rueda
Rueda.prototype.obtenerPresion = function () {
  return this.presion;
}
//Función que devuelve si la presión de rueda es optima (mayor al 85%)
Rueda.prototype.presionOptima = function () {
  //Para ser optima y devolver true debe ser mayor a 85%
  return (this.presion / this.presionMaxima) * 100 > 85;
}

//Prototipo Hangar

function Hangar() {
  this.aeronaves = [];
}
//Función para añadir una aeronave al hangar
Hangar.prototype.añadeAeronave = function (aeronave) {
  this.aeronaves.push(aeronave);
}
//Funcion para listar todas las aeronaves en el Hangar
Hangar.prototype.listarAeronaves = function () {
  let listado = "";
  listado = this.aeronaves.map(aeronave => `ID Aeronave: ${aeronave.id} --- Combustible: ${aeronave.combustible}%`).join('\n');
  document.querySelector("#listado p").innerText = listado;
}

//Función para iniciar la simulación y comprobar según las especificaciones del ejercicio que la jerarquía
// de objetos funciona.
function iniciarSimulacion() {
  aeronave1 = obtenerDatosAeronave(1);
  aeronave2 = obtenerDatosAeronave(2);

  const hangar = new Hangar();
  hangar.añadeAeronave(aeronave1);
  hangar.añadeAeronave(aeronave2);

  document.getElementById("tarjetas").style.display = "block";
  document.getElementById("listado").style.display = "block";
  document.getElementById("titulo1").innerText = `Aeronave 1: ${aeronave1.id}`;
  document.getElementById("titulo2").innerText = `Aeronave 2: ${aeronave2.id}`;
  document.getElementById("info1").innerText = aeronave1.info();
  document.getElementById("info2").innerText = aeronave2.info();

  hangar.listarAeronaves();

}

//Función para tomar los datos por parte del usuario de la id y combustible de la aeronave
function obtenerDatosAeronave(numeroNave) {
  let idAeronave = prompt(`Introduce ID para la Aeronave ${numeroNave}:`);
  let combustible = prompt("Introduce porcentaje del deposito de combusitble: (0-100)");
  combustible = Number(combustible);
  if (0 < combustible && combustible < 100) {
    alert(`Aeronave ${numeroNave} creada correctamente:\nID Aeronave: ${idAeronave}\nCombustible: ${combustible}%`);
    return new Aeronave(idAeronave, combustible);
  } else {
    alert("Valor de combustible no válido");
    obtenerDatosAeronave(numeroNave);
  }
}

//Función que actualiza la información en pantalla de cada aeronave para visualizar el efecto
//del despegue y aterrizaje, y los efectos sobre Tren de aterrizaje y puntales.
function actualizaInfo() {
  document.getElementById("info1").innerText = aeronave1.info();
  document.getElementById("info2").innerText = aeronave2.info();
}