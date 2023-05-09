import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/services/project.service';
import { LaboratorioService } from '@app/services/laboratorio.service'
import { IEnsayos } from '@app/models/Ensayos.model'
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface IProjectsList {
  id: string,
  title: string;
  location: string;
  date: Date;
  sondeos: number[]
  capas?: (number | number[])[][],
  project?: IEnsayos
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'location', 'date', 'delete','informe'];
  projectsList: IProjectsList[] = []
   dataSource = new MatTableDataSource(this.projectsList);
//  dataSource = this.projectsList;
  values: IEnsayos[] | null = null
  panelOpenState = false;
  activeDeleteSondeo = false
  activeDeleteMuestra = false
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: IProjectsList | null=null;
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
        title: project.title,
        sondeos,
        capas,
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
