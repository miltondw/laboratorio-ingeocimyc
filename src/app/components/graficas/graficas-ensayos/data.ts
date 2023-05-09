interface ILiquido {
  prueba: string;
  primera: string|number;
  segunda: number;
  tercera: number;

}
export const DATA_LIQUIDO: ILiquido[] = [
  {
    prueba: 'N° De Golpes',
    primera: 'NumberOfStrokes',
    // primera: 11.11,
    segunda: 11.11,
    tercera: 32.32,
  },
  {
    prueba: 'Tara N°',
    primera: 'TareNumber',
    // primera: 44.44,
    segunda: 44.44,
    tercera: 32.32,
  },
  {
    prueba: 'Peso Tara',
    primera: 'TareWeight',
    // primera: 44.44,
    segunda: 44.44,
    tercera: 32.32,
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 'TarePlusWetSoilWeight',
    // primera: 14.14,
    segunda: 14.14,
    tercera: 32.32,
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 'TarePlusDrySoil',
    // primera: 66.66,
    segunda: 66.66,
    tercera: 32.32,
  },
  {
    prueba: 'Peso del agua',
    primera: 'WaterWeight',
    // primera: 10.12,
    segunda: 10.12,
    tercera: 32.32,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
    // primera: 92.12,
    segunda: 92.12,
    tercera: 32.32,
  },
  {
    prueba: '% Humedad',
    primera: 'Humidity',
    // primera: 12.12,
    segunda: 12.12,
    tercera: 32.32,
  },
];

interface IPlastico {
  prueba: string;
  primera: string|number;
  segunda?: number;
}
export const DATA_PLASTICO: IPlastico[] = [
  {
    prueba: 'Tara N°',
    primera: 'TareNumber',
    // primera: 11.11,
    segunda: 1.111
  },
  {
    prueba: 'Peso Tara',
    primera: 'TareWeight',
    // primera: 44.44,
    segunda: 44.44
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 'TarePlusWetSoilWeight',
    // primera: 14.12,
    segunda: 14.12
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 'TarePlusDrySoil',
    // primera: 61.12,
    segunda: 61.12
  },
  {
    prueba: 'Peso del agua',
    primera: 'WaterWeight',
    // primera: 10.12,
    segunda: 10.14,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'DrySoilWeight',
    // primera: 99.99,
    segunda: 99.99
  },
  {
    prueba: '% Humedad',
    primera: 'Humidity',
    // primera: 12.88,
    segunda: 12.88,
  }
];

interface IGranulometria {
  pulgada: number | string;
  mm: number | string;
  gr: string | number;
  retenido:number;
  acum:number;
  pasa:number;
}
export const DATA_GRANULOMETRIA: IGranulometria[] = [
  {
    pulgada: 2,
    mm: '50,80',
    // gr: 50.80,
    gr: 'inches2',
    retenido:0,
    acum:0,
    pasa:0,
  },
  {
    pulgada: 1,
    mm: '25,40',
    // gr: 25.40,
    gr: 'inches1',
  retenido:1,
    acum:1,
    pasa:1,
  },
  {
    pulgada: '3/4',
    mm: '19,00',
    // gr: 19.00,
    gr: 'inches34',
  retenido:2,
    acum:2,
    pasa:2,
  },
  {
    pulgada: '1/2',
    mm: '12,70',
    // gr: 12.70,
    gr: 'inches12',
  retenido:3,
    acum:3,
    pasa:3,
  },
  {
    pulgada: '3/8',
    mm: '9,53',
    // gr: 9.3,
    gr: 'inches38',
  retenido:4,
    acum:4,
    pasa:4,
  },
  {
    pulgada: 'No 4',
    mm: '4,75',
    // gr: 4.5,
    gr: 'inchesN4',
  retenido:5,
    acum:5,
    pasa:5,
  },
  {
    pulgada: 'No 10',
    mm: '2,00',
    // gr: 2.0,
    gr: 'inchesN10',
  retenido:6,
    acum:6,
    pasa:6,
  },
  {
    pulgada: 'No 40',
    mm: '0,425',
    // gr: 0.25,
    gr: 'inchesN40',
  retenido:7,
    acum:7,
    pasa:7,
  },
  {
    pulgada: 'No 200',
    mm: '0,075',
    // gr: 0.075,
    gr: 'inchesN200',
  retenido:8,
    acum:8,
    pasa:8,
  },
  {
    pulgada: 'P200',
    mm: '<0,075',
    // gr: 0.07,
    gr: 'inchesP200',
    retenido:9,
    acum:9,
    pasa:9,
  },
];
