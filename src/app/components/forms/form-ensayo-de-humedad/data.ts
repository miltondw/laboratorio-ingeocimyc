interface PeriodicElement {
  prueba: string;
  primera: string;
  segunda?: number;
  tercera?: number;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'Profundidad (M)',
    primera: 'DepthM',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso del tara (P1)',
    primera: 'TareWeightP1',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo(P2)',
    primera: 'TarePlusWetSoilWeightP2',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + Suelo seco (P3)',
    primera: 'TarePlusDrySoilP3',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso del agua (Grs)',
    primera: 'WeightOfWaterGrs',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Contenido de Humedad (%)',
    primera: 'HumidityContent',
    segunda: 1,
    tercera: 32
  }
];
