// Prototipo para Rueda
function Rueda(presionMaxima, presion) {
  if (presionMaxima <= 0 || presionMaxima >= 20700) {
      throw new Error("La presión máxima debe estar entre 0 y 20700 milibares.");
  }
  if (presion <= 0 || presion > presionMaxima) {
      throw new Error("La presión actual debe ser superior a 0 y menor o igual a la presión máxima.");
  }
  this.presionMaxima = presionMaxima;
  this.presion = presion;
}

Rueda.prototype.obtenerPresion = function () {
  return this.presion;
};

Rueda.prototype.presionOptima = function () {
  return (this.presion / this.presionMaxima) * 100 > 85;
};

// Prototipo para Puntal
function Puntal() {
  this.ruedaIzquierda = new Rueda(20000, 28000);
  this.ruedaDerecha = new Rueda(20000, 18000);
  this.desplegado = false;
}

Puntal.prototype.desplegar = function () {
  this.desplegado = true;
};

Puntal.prototype.replegar = function () {
  this.desplegado = false;
};

// Prototipo para Tren de Aterrizaje
function TrenDeAterrizaje() {
  this.frontal = new Puntal();
  this.izquierdo = new Puntal();
  this.derecho = new Puntal();
  this.bajado = false;
}

TrenDeAterrizaje.prototype.bajar = function () {
  this.bajado = true;
  this.frontal.desplegar();
  this.izquierdo.desplegar();
  this.derecho.desplegar();
};

TrenDeAterrizaje.prototype.subir = function () {
  this.bajado = false;
  this.frontal.replegar();
  this.izquierdo.replegar();
  this.derecho.replegar();
};

TrenDeAterrizaje.prototype.comprobarPresionRuedas = function () {
  return (
      this.frontal.ruedaIzquierda.presionOptima() &&
      this.frontal.ruedaDerecha.presionOptima() &&
      this.izquierdo.ruedaIzquierda.presionOptima() &&
      this.izquierdo.ruedaDerecha.presionOptima() &&
      this.derecho.ruedaIzquierda.presionOptima() &&
      this.derecho.ruedaDerecha.presionOptima()
  );
};

// Prototipo para Aeronave
function Aeronave(id, combustible) {
  if (combustible <= 0) {
      throw new Error("El combustible debe ser mayor que 0.");
  }
  this.id = id;
  this.combustible = combustible;
  this.trenDeAterrizaje = new TrenDeAterrizaje();
}

Aeronave.prototype.despegar = function () {
  if (this.combustible > 100 && this.trenDeAterrizaje.comprobarPresionRuedas()) {
      this.trenDeAterrizaje.subir();
      console.log(`La aeronave ${this.id} ha despegado.`);
  } else {
      console.log(`La aeronave ${this.id} no puede despegar. Verifique el combustible y las ruedas.`);
  }
};

Aeronave.prototype.aterrizar = function () {
  this.trenDeAterrizaje.bajar();
  console.log(`La aeronave ${this.id} ha aterrizado.`);
};

// Prototipo para Hangar
function Hangar() {
  this.aeronaves = [];
}

Hangar.prototype.añadirAeronave = function (aeronave) {
  this.aeronaves.push(aeronave);
};

Hangar.prototype.listarAeronaves = function () {
  this.aeronaves.forEach(aeronave => {
      console.log(`ID: ${aeronave.id}, Combustible: ${aeronave.combustible}`);
  });
};

// Creación de aeronaves
const aeronave1 = new Aeronave("A1", 500);
const aeronave2 = new Aeronave("A2", 300);

// Creación del hangar
const hangar = new Hangar();
hangar.añadirAeronave(aeronave1);
hangar.añadirAeronave(aeronave2);

// Listar aeronaves
hangar.listarAeronaves();

// Operaciones con las aeronaves
aeronave1.despegar();
aeronave1.aterrizar();
aeronave2.despegar();
