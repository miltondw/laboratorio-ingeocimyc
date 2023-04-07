import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { LaboratorioService } from '@app/services/laboratorio.service'
import { IEnsayos } from '@app/models/Ensayos.model'
import { MatTableDataSource } from '@angular/material/table';

export interface IProjectsList {
  id: string,
  titile: string;
  location: string;
  date: Date;
  state?: string;
  sondeos: number[]
  capas?: (number | number[])[][],
  project?: IEnsayos
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  displayedColumns: string[] = ['titile', 'location', 'date', 'state', 'sondeos', 'delete'];
  projectsList: IProjectsList[] = []
  dataSource = new MatTableDataSource(this.projectsList);
  values: IEnsayos[] | null = null
  panelOpenState = false;
  activeDeleteSondeo = false
  activeDeleteMuestra = false
  constructor (
    private ensayoService: LaboratorioService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.values = this.ensayoService.currentProjects
    this.createList(this.values)
  }

  createList(values: IEnsayos[], id?: string) {
    values.map(project => {
      const sondeos = []
      const capas = []
      for (let i = 1; i <= project.probe; i++) {
        sondeos.push(i)
        if (project.sondeos[i - 1]?.muestras) {
          capas.push(new Array(project.sondeos[i - 1].muestras.length).fill(0).map((_, i) => i + 1))
        }
      }
      const projectList: IProjectsList = {
        id: project.id,
        date: project.date,
        location: project.location,
        titile: project.title,
        sondeos,
        capas,
        state: 'pendiente'
      }
      if (!id) {
        this.projectsList.push(projectList)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAll() {
    this.ensayoService.deleteStorage()
    this.projectsList = []
    this.dataSource = new MatTableDataSource(this.projectsList);
  }
  deleteEnsayo(id: string) {
    if (this.values) {
      this.projectService.deleteEnsayo(id)
      this.projectsList = this.projectsList.filter((project) => project.id !== id)
      this.dataSource = new MatTableDataSource(this.projectsList);
    }
  }
  deleteSondeo(id: string, indexSondeo: number) {
    if (this.values) {
      this.projectService.deleteSondeo(id, indexSondeo)
      this.projectsList.map(project => {
        if (project.id === id) {
          project.sondeos.splice(indexSondeo, 1)
        }
      })
      this.dataSource = new MatTableDataSource(this.projectsList);
      this.activeDeleteSondeo = false
    }
  }
  deleteMuestra(id: string, indexSondeo: number, indexMuestra: number) {
    if (this.values) {
      this.projectService.deleteMuestra(id, indexSondeo, indexMuestra)
      this.projectsList.map(project => {
        if (project.id === id && project.capas) {
          project.capas[indexSondeo].splice(indexMuestra, 1)
        }
      })
      this.dataSource = new MatTableDataSource(this.projectsList);
      this.activeDeleteMuestra = false
    }
  }
  onActiveDeleteSondeo() {
    this.activeDeleteSondeo = !this.activeDeleteSondeo
  }
  onActiveDeleteMuestra() {
    this.activeDeleteMuestra = !this.activeDeleteMuestra
  }
}
