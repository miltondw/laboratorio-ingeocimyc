 interface PeriodicElement {
  prueba: string;
  primera: string;
  segunda: number;
  tercera: number;
}


export const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'N° De Golpes',
    primera: 'NumberOfStrokes',
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Tara N°',
    primera: 'TareNumber',
    segunda: 4,
    tercera: 32
  },
  {
    prueba: 'Peso Tara',
    primera: 'TareWeight',
    segunda: 4,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 'TarePlusWetSoilWeight',
    segunda: 14,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 'TarePlusDrySoil',
    segunda: 6,
    tercera: 32
  },
  {
    prueba: 'Peso del agua',
    primera: 'WaterWeight',
    segunda: 10,
    tercera: 32,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
    segunda: 9,
    tercera: 32
  },

  {
    prueba: '% Humedad',
    primera: 'Humidity',
    segunda: 12,
    tercera: 32,
  },
];
