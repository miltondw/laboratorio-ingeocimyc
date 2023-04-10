export function calcularTendencia(golpes:number[], humedad:number[], valorNuevo:number) {
    // Calcular la media de los valores de X y Y X=golpes Y=humedad
    const n = golpes.length;
    let golpesSum = 0, humedadSum = 0;
    for (let i = 0; i < n; i++) {
      golpesSum += golpes[i];
      humedadSum += humedad[i];
    }
    const golpesMedia = golpesSum / n;
    const humedadMedia = humedadSum / n;

    // Calcular los coeficientes de la regresión lineal
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) {
      num += (golpes[i] - golpesMedia) * (humedad[i] - humedadMedia);
      den += Math.pow(golpes[i] - golpesMedia, 2);
    }
    const beta1 = num / den;
    const beta0 = humedadMedia - beta1 * golpesMedia;

    // Calcular la tendencia para el valor nuevo
    const tendencia = beta0 + beta1 * valorNuevo;
    return tendencia;
  }
