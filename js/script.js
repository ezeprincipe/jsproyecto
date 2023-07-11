function calcularPagos() {
  let monto = parseInt(document.getElementById("monto").value);
  let cuotas = parseInt(document.getElementById("cuotas").value);

  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    console.log("Ingrese un monto y número de cuotas válidos.");
    return;
  }

  let intereses = 0;

  switch (cuotas) {
    case 3:
    case 6:
    case 12:
    case 18:
    case 24:
      intereses = 0.93; // 93% de intereses
      break;
    default:
      intereses = 0;
      break;
  }

  let totalConIntereses = monto * (1 + intereses);
  let cuotaMensual = totalConIntereses / cuotas;

  console.log(`Monto total a pagar: $${totalConIntereses.toFixed(2)}`);
  console.log(`Cuota mensual: $${cuotaMensual.toFixed(2)}`);

  for (let i = 1; i <= cuotas; i++) {
    console.log(`Cuota ${i}: $${cuotaMensual.toFixed(2)}`);
  }
}