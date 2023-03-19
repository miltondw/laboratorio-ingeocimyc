import { Component } from '@angular/core';
export interface PeriodicElement {
  pulgada: number|string;
  mm: number|string;
  gr: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    pulgada: 2,
    mm: '50,80',
    gr: 0,
  },
  {
    pulgada: 1,
    mm: '25,40',
    gr: 0,
  },
  {
    pulgada: '3/4',
    mm: '19,00',
    gr: 0,
  },
  {
    pulgada: '1/2',
    mm: '12,70',
    gr: 0,
  },
  {
    pulgada: '3/8',
    mm: '9,53',
    gr: 0,
  },
  {
    pulgada: 'No 4',
    mm: '4,75',
    gr: 0,
  },
  {
    pulgada: 'No 10',
    mm: '2,00',
    gr: 0,
  },
  {
    pulgada: 'No 40',
    mm: '0,425',
    gr: 0,
  },
  {
    pulgada: 'No 200',
    mm: '0,075',
    gr: 0,
  },
  {
    pulgada: 'P200',
    mm: '<0,075',
    gr: 0,
  },
];
@Component({
  selector: 'app-form-granulometria',
  templateUrl: './form-granulometria.component.html',
  styleUrls: ['./form-granulometria.component.scss']
})
export class FormGranulometriaComponent {
  displayedColumns: string[] = [
    'pulgada',
    'mm',
    'gr'
  ];
  dataSource = ELEMENT_DATA;
}
