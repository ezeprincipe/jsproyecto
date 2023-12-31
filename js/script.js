// Variable global para el valor del Dólar Blue
let valordolarblue = 0;

// Objeto que representa el préstamo
class Prestamo {
  constructor(monto, cuotas) {
    this.monto = monto;
    this.cuotas = cuotas;
  }

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

  calcularTotalConIntereses() {
    const intereses = this.obtenerIntereses();
    return this.monto * ((1 + intereses) * (valordolarblue / 700));
  }

  calcularTotalConEnvioEImpuestos() {
    const totalConIntereses = this.calcularTotalConIntereses();
    return totalConIntereses + 3000; // Agregamos el costo del envío
  }

  calcularCuotaMensual() {
    const totalConIntereses = this.calcularTotalConIntereses();
    return totalConIntereses / this.cuotas;
  }

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

// Función para agregar un nuevo préstamo al array y al Local Storage
function agregarPrestamo(monto, cuotas) {
  const prestamo = new Prestamo(monto, cuotas);
  prestamosRealizados.push(prestamo);
  guardarPrestamosEnLocalStorage();
}

// Función para guardar los datos en el Local Storage
function guardarPrestamosEnLocalStorage() {
  localStorage.setItem('prestamos', JSON.stringify(prestamosRealizados));
}

// Cargar datos del Local Storage al array al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const prestamosLocalStorage = localStorage.getItem('prestamos');
  if (prestamosLocalStorage) {
    prestamosRealizados.push(...JSON.parse(prestamosLocalStorage));
  }
});

//  Función para buscar un préstamo por su monto y cuotas
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
    Swal.fire({
      icon: "error",
      title: "Datos inválidos",
      text: "Por favor, ingrese un monto y número de cuotas válidos.",
    });
    return;
  }

  const prestamo = new Prestamo(monto, cuotas);
  prestamo.mostrarResultados();

  // Agregar el préstamo al array y al Local Storage
  agregarPrestamo(monto, cuotas);
}

function calcularTotal() {
  const monto = parseInt(document.getElementById("monto").value);
  const cuotas = parseInt(document.getElementById("cuotas").value);

  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    Swal.fire({
      icon: "error",
      title: "Datos inválidos",
      text: "Por favor, ingrese un monto y número de cuotas válidos.",
    });
    return;
  }

  const prestamo = new Prestamo(monto, cuotas);
  const totalConEnvioEImpuestos = prestamo.calcularTotalConEnvioEImpuestos();

  // Mostrar el resultado en la página
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = `<p>Monto total con envío e impuestos: $${totalConEnvioEImpuestos.toFixed(2)}</p>`;
  resultadosDiv.style.display = "block";

  // Agregar el préstamo al array y al Local Storage
  agregarPrestamo(monto, cuotas);
}

function limpiarResultados() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará los resultados actuales.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const resultadosDiv = document.getElementById("resultados");
      resultadosDiv.innerHTML = "";
      resultadosDiv.style.display = "none";

      // Limpiar los campos de entrada si es necesario
      document.getElementById("monto").value = "";
      document.getElementById("cuotas").value = "";

      Swal.fire("Borrado", "Los resultados se han borrado.", "success");
    }
  });
}

// URL de la API
const apiUrl = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

// Hacer la solicitud HTTP
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dolarBlue = data.find(entry => entry.casa.nombre === "Dolar Blue");

    if (dolarBlue) {
      const ventaDolarBlue = dolarBlue.casa.venta;
      valordolarblue = parseFloat(ventaDolarBlue.replace(",", "")) / 100;
    } else {
      console.log("No se encontró el valor del Dolar Blue en la respuesta JSON.");
    }
  })
  .catch(error => {
    console.error("Error al hacer la solicitud HTTP:", error);
  });