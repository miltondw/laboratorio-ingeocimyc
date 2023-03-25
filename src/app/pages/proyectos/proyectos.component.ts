import { Component, OnInit} from '@angular/core';
import { LaboratorioService } from '@app/services/laboratorio.service'
import { IEnsayos } from '@app/models/Ensayos.model'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})

export class ProyectosComponent implements OnInit {
  values: IEnsayos[] | null = null
  constructor ( private ensayoService: LaboratorioService) {}
  ngOnInit() {
   this.values= this.ensayoService.currentProjects
  }
}
