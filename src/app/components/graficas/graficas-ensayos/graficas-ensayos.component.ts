import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaboratorioService } from '@app/services/laboratorio.service';
import { ProjectService } from '@app/services/project.service';
import { SavePdfService } from '@app/services/save-pdf.service';
import { IEnsayos } from '@app/models/Ensayos.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DATA_LIQUIDO, DATA_PLASTICO, DATA_GRANULOMETRIA } from './data';

@Component({
  selector: 'app-graficas-ensayos',
  templateUrl: './graficas-ensayos.component.html',
  styleUrls: ['./graficas-ensayos.component.scss'],
})
export class GraficasEnsayosComponent implements OnInit {
  id: string | null = null;
  project = {} as IEnsayos;
  columnsLiquido: string[] = ['prueba', '1', '2', '3'];
  dataLiquido = DATA_LIQUIDO;
  columnsPlastico: string[] = ['prueba', '1', '2'];
  dataPlastico = DATA_PLASTICO;
  columnsGranulometria: string[] = [
    'pulgada',
    'mm',
    'gr',
    'retenido',
    'acum',
    'pasa',
  ];
  dataGranulometria = DATA_GRANULOMETRIA;
  sucsData:FormControl=new FormControl<string>("");
  sucs=false;
  loading:Observable<boolean> = this.savePdfService.loading$;
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
  sucsActive(){
    this.sucs=!this.sucs
  }
  saveSucs(layer:number,sondeo:number){
   if(this.id && this.sucsData.value){
   this.projectService.createSucsData(
    {
    sucsData:this.sucsData.value,
    id:this.id,
    layer,
    sondeo
  })
  this.sucs=false
  }
}
  generatePDF() {
    this.savePdfService.save(this.project)
  }
}
