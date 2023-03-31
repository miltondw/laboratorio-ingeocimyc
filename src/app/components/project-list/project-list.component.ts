import { Component, OnInit} from '@angular/core';
import { LaboratorioService } from '@app/services/laboratorio.service'
import { IEnsayos } from '@app/models/Ensayos.model'
import {MatTableDataSource} from '@angular/material/table';

export interface IProjectsList {
  id:string,
  titile: string;
  location: string;
  date: Date;
  state?: string;
  sondeos:number[]
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit  {
  displayedColumns: string[] = ['titile', 'location', 'date', 'state','sondeos'];
  projectsList: IProjectsList[]=[]
  dataSource = new MatTableDataSource(this.projectsList.reverse());
  values: IEnsayos[] | null = null
  constructor ( private ensayoService: LaboratorioService) {}
  ngOnInit() {
    this.values= this.ensayoService.currentProjects
    this.values.map(project=>{
      const sondeos=[]
      for (let i = 1; i <= project.probe; i++) {
        sondeos.push(i)
      }
      const projectList:IProjectsList={
        id:project.id,
        date:project.date,
        location:project.location,
        titile:project.title,
        sondeos,
        state:'pendiente'
      }
      this.projectsList.push(projectList)
    })
   }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
