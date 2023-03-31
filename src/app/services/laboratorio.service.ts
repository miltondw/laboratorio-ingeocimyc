import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IEnsayos} from '@app/models/Ensayos.model'

@Injectable({
  providedIn: 'root'
})

export class LaboratorioService {
  private projectsSource = new BehaviorSubject<IEnsayos[]>([]);
  private queryProbe = new BehaviorSubject<number|null>(null);
  private queryId = new BehaviorSubject<string|null>('');

  key = "projects-laboratorio"
  currentProjects=[] as IEnsayos[]
  projectList$ = this.projectsSource.asObservable()
  queryProbe$ = this.queryProbe.asObservable()
  queryId$ = this.queryId.asObservable()

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

  setQueryProbe(probe: number) {
    this.queryProbe.next(probe);
  }

  setQueryId(id: string|null) {
    if(id) this.queryId.next(id);
  }

}
