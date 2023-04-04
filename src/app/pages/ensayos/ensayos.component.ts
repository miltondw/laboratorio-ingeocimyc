import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IEnsayos } from '@app/models/Ensayos.model';
import { LaboratorioService } from '@app/services/laboratorio.service'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.scss']
})
export class EnsayosComponent implements OnInit {
  sondeo = 1
  capa = 1
  capaCurrent = 1
  id: string | null = null
  project={} as IEnsayos;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private laboratorioService: LaboratorioService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramsRoute) => {
        this.id = paramsRoute.get('id')
        this.laboratorioService.setQueryId(this.id)
        this.project=this.projectService.getProject(this.id).project
      });
    this.route.queryParamMap
      .subscribe(params => {
        this.sondeo = Number(params.get('probe'))
        this.capaCurrent = Number(params.get('layer'))
        this.laboratorioService.setQueryProbe(this.sondeo)
        this.laboratorioService.setQueryLayer(this.capaCurrent)
      });
  }
  onCreateMuestra() {
    const layer = this.project.sondeos[this.sondeo - 1].muestras.length + 1
    this.projectService.createMuestra(this.sondeo - 1)
    this.router.navigate([`laboratorio/ensayo/${this.id}`],
      { queryParams: { probe: this.sondeo, layer } }
    );
  }
  onCreateSondeo(){
   const sondeo= this.project.probe+1
   this.project.probe=sondeo
   this.projectService.createSondeo()
   this.router.navigate([`laboratorio/ensayo/${this.id}`],
      { queryParams: { probe: sondeo, layer:1 } }
    );
  }
}
