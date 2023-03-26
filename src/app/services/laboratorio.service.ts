import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IEnsayos} from '@app/models/Ensayos.model'

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private projectsSource = new BehaviorSubject<IEnsayos[]>([]);
  key = "projects-laboratorio"
  currentProjects=[] as IEnsayos[]
  projectList$ = this.projectsSource.asObservable()

  constructor () {
    const projectsList = localStorage.getItem(this.key);
    if (projectsList) {
      this.projectsSource.next(JSON.parse(projectsList));
    }
    this.projectList$.subscribe(projects=>this.currentProjects=projects);
  }

  saveStorage(project:IEnsayos,id?:string,index?:number){
    if(!id) this.currentProjects.push(project)
    if(id && index){
      this.currentProjects[index]=project
    }
    localStorage.setItem(this.key, JSON.stringify(this.currentProjects));
  }

}
