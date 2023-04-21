import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaboratorioService } from '@app/services/laboratorio.service';
import { ProjectService } from '@app/services/project.service';
import { SavePdfService } from '@app/services/save-pdf.service';
import { IEnsayos } from '@app/models/Ensayos.model';
import { DATA_LIQUIDO, DATA_PLASTICO, DATA_GRANULOMETRIA } from './data';

@Component({
  selector: 'app-graficas-ensayos',
  templateUrl: './graficas-ensayos.component.html',
  styleUrls: ['./graficas-ensayos.component.scss'],
})
export class GraficasEnsayosComponent implements OnInit {
  id: string | null = null;
  project = {} as IEnsayos;
  columnsLiquido: string[] = ['prueba', 'primera', 'segunda', 'tercera'];
  dataLiquido = DATA_LIQUIDO;
  columnsPlastico: string[] = ['prueba', 'primera', 'segunda'];
  dataPlastico = DATA_PLASTICO;
  columnsGranulometria: string[] = [
    'pulgada',
    'mm',
    'gr',
    'retenido',
    'acumulado',
    'pasa',
  ];
  dataGranulometria = DATA_GRANULOMETRIA;
  constructor(
    private route: ActivatedRoute,
    private laboratorioService: LaboratorioService,
    private projectService: ProjectService,
    private savePdfService: SavePdfService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsRoute) => {
      this.id = paramsRoute.get('id');
      this.laboratorioService.setQueryId(this.id);
      this.project = this.projectService.getProject(this.id).project;
    });
  }
  generatePDF() {
this.savePdfService.save({id:'pdfEnsayo',title:this.project.title})
  }
  porcentajeQuePasa: number[] = [];
}
