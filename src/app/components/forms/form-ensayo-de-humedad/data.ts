interface PeriodicElement {
  prueba: string;
  primera: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'Profundidad (M)',
    primera: 'DepthM',
  },
  {
    prueba: 'Peso del tara (P1)',
    primera: 'TareWeightP1',
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo(P2)',
    primera: 'TarePlusWetSoilWeightP2',
  },
  {
    prueba: 'Peso Tara + Suelo seco (P3)',
    primera: 'TarePlusDrySoilP3',
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
  },
  {
    prueba: 'Peso del agua (Grs)',
    primera: 'WeightOfWaterGrs',
  },
  {
    prueba: 'Contenido de Humedad (%)',
    primera: 'HumidityContent',
  }
];
