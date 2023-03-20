import { Component } from '@angular/core';
export interface PeriodicElement {
  prueba: string;
  primera: number;
  segunda: number;
  tercera: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'N° De Golpes',
    primera: 12,
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Tara N°',
    primera: 12,
    segunda: 4,
    tercera: 32
  },
  {
    prueba: 'Peso Tara',
    primera: 12,
    segunda: 4,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 12,
    segunda: 14,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 12,
    segunda: 6,
    tercera: 32
  },
  {
    prueba: 'Peso del agua',
    primera: 12,
    segunda: 10,
    tercera: 32,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 12,
    segunda: 9,
    tercera: 32
  },

  {
    prueba: '% Humedad',
    primera: 12,
    segunda: 12,
    tercera: 32,
  },
];
@Component({
  selector: 'app-form-limite-liquido',
  templateUrl: './form-limite-liquido.component.html',
  styleUrls: ['./form-limite-liquido.component.scss']
})
export class FormLimiteLiquidoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda',
    'tercera'
  ];
  dataSource = ELEMENT_DATA;
}
