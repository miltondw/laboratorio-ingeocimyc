import { Component } from '@angular/core';

export interface PeriodicElement {
  prueba: string;
  primera: number;
  segunda: number;
  tercera: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'Profundidad (M)',
    primera: 12,
    segunda: 1,
    tercera: 32
  },
  {
    prueba: 'Peso del tara (P1)',
    primera: 12,
    segunda: 4,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + peso suelo humedo(P2)',
    primera: 12,
    segunda: 14,
    tercera: 32
  },
  {
    prueba: 'Peso Tara + Suelo seco (P3)',
    primera: 12,
    segunda: 6,
    tercera: 32
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 12,
    segunda: 9,
    tercera: 32
  },
  {
    prueba: 'Peso del agua (Grs)',
    primera: 12,
    segunda: 10,
    tercera: 32,
  },
  {
    prueba: 'Contenido de Humedad (%)',
    primera: 12,
    segunda: 12,
    tercera: 32,
  },
];

@Component({
  selector: 'app-form-ensayo-de-humedad',
  templateUrl: './form-ensayo-de-humedad.component.html',
  styleUrls: ['./form-ensayo-de-humedad.component.scss'],
})
export class FormEnsayoDeHumedadComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda',
    'tercera'
  ];
  dataSource = ELEMENT_DATA;
}
