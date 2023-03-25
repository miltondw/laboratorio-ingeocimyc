interface PeriodicElement {
  prueba: string;
  primera: string;
  segunda: number;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'Tara N°',
    primera: 'TareNumber',
    segunda: 1
  },
  {
    prueba: 'Peso Tara',
    primera: 'TareWeight',
    segunda: 4
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 'TarePlusWetSoilWeight',
    segunda: 14
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 'TarePlusDrySoil',
    segunda: 6
  },
  {
    prueba: 'Peso del agua',
    primera: 'WaterWeight',
    segunda: 10,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
    segunda: 9
  },
  {
    prueba: '% Humedad',
    primera: 'Humidity',
    segunda: 12,
  }
];
