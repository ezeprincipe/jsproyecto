// Objeto que representa el préstamo
class Prestamo {
  constructor(monto, cuotas) {
    this.monto = monto;
    this.cuotas = cuotas;
  }

  // Método para obtener los intereses
  obtenerIntereses() {
    switch (this.cuotas) {
      case 3:
        return 0.1156; // 11.56% de intereses
      case 6:
        return 0.2394; // 23.94% de intereses
      case 12:
        return 0.5254; // 52.54% de intereses
      case 18:
        return 0.8716; // 87.16% de intereses
      case 24:
        return 1.2918; // 129.18% de intereses
      default:
        return 0;
    }
  }

  // Método para calcular el total con intereses
  calcularTotalConIntereses() {
    const intereses = this.obtenerIntereses();
    return this.monto * (1 + intereses);
  }

  // Método para calcular el total con intereses, envío e impuestos
  calcularTotalConEnvioEImpuestos() {
    const totalConIntereses = this.calcularTotalConIntereses();
    return totalConIntereses + 3000; // Agregamos el costo del envío
  }

  // Método para calcular la cuota mensual
  calcularCuotaMensual() {
    const totalConIntereses = this.calcularTotalConIntereses();
    return totalConIntereses / this.cuotas;
  }

  // Método para mostrar los resultados
  mostrarResultados() {
    const totalConIntereses = this.calcularTotalConIntereses();
    const totalConEnvioEImpuestos = this.calcularTotalConEnvioEImpuestos();
    const cuotaMensual = this.calcularCuotaMensual();

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
      Monto total a pagar (sin envío): $${totalConIntereses.toFixed(2)}
      <p>Cuota mensual: $${cuotaMensual.toFixed(2)}</p>
    `;

    for (let i = 1; i <= this.cuotas; i++) {
      resultadosDiv.innerHTML += `<p>Cuota ${i}: $${cuotaMensual.toFixed(2)}</p>`;
    }

    resultadosDiv.style.display = "block";
  }
}

// Array para almacenar los préstamos realizados
const prestamosRealizados = [];

// Función para agregar un nuevo préstamo al array
function agregarPrestamo(monto, cuotas) {
  const prestamo = new Prestamo(monto, cuotas);
  prestamosRealizados.push(prestamo);
}

// Función para buscar un préstamo por su monto y cuotas
function buscarPrestamoPorMontoYCoutas(monto, cuotas) {
  return prestamosRealizados.find((prestamo) => prestamo.monto === monto && prestamo.cuotas === cuotas);
}

// Función para filtrar préstamos por su monto
function filtrarPrestamosPorMonto(monto) {
  return prestamosRealizados.filter((prestamo) => prestamo.monto === monto);
}

function calcularPagos() {
  const monto = parseInt(document.getElementById("monto").value);
  const cuotas = parseInt(document.getElementById("cuotas").value);

  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    alert("Ingrese un monto y número de cuotas válidos.");
    return;
  }

  const prestamo = new Prestamo(monto, cuotas);
  prestamo.mostrarResultados();

  // Agregar el préstamo al array
  agregarPrestamo(monto, cuotas);
}

function calcularTotal() {
  const monto = parseInt(document.getElementById("monto").value);
  const cuotas = parseInt(document.getElementById("cuotas").value);

  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    alert("Ingrese un monto y número de cuotas válidos.");
    return;
  }

  const prestamo = new Prestamo(monto, cuotas);
  const totalConEnvioEImpuestos = prestamo.calcularTotalConEnvioEImpuestos();

  // Mostrar el resultado en la página
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = `<p>Monto total con envío e impuestos: $${totalConEnvioEImpuestos.toFixed(2)}</p>`;
  resultadosDiv.style.display = "block";

  // Agregar el préstamo al array
  agregarPrestamo(monto, cuotas);
}

function limpiarResultados() {
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = '';
  resultadosDiv.style.display = "none";
}