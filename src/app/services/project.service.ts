import { Injectable } from '@angular/core';
import { IProject } from '@app/models/project.model'
import { IDto, IEnsayos } from '@app/models/Ensayos.model'
import { IHeader } from '@app/models/formHeader.model'
import { IHumedad } from '@app/models/ensayoDeHumedad.model'
import { IGranulometria } from '@app/models/ensayoDeGranulometria.model'
import { IGroup as ILiquido } from '@app/models/ensayoDeLimiteLiquido.model'
import { IGroup as IPlastico } from '@app/models/ensayoDelimitePlastico.model'
import { LaboratorioService } from './laboratorio.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = [] as IEnsayos[]
  project={ } as IEnsayos
  constructor (private laboratorioService: LaboratorioService) {
    this.projects=this.laboratorioService.currentProjects
   }

  createProject(project: IProject) {
    let projectInitial: IEnsayos = {
      id: '',
      probe: 0,
      title:'',
      date: new Date(),
      header: {} as IHeader,
      ensayoHumedad: {} as IHumedad,
      ensayoGranulometria: {} as IGranulometria,
      ensayoLiquido: {} as ILiquido,
      ensayoPlastico: {} as IPlastico
    }
    projectInitial.id = project.title.split(' ').join('-').toLocaleLowerCase()
    projectInitial.probe = project.probe
    projectInitial.title = project.title
    this.laboratorioService.saveStorage(projectInitial)
  }

  getProject(id: string) {
    const project: IEnsayos = this.projects.filter(project => project.id == id)[0]
    const index: number = this.projects.findIndex(project => project.id == id)
    return {
      project, index
    }
  }

  createEnsayo(Dto: IDto) {
    const {project, index} = this.getProject(Dto.id)
    if(Dto.ensayo){
      switch (Dto.ensayo) {
        case 'header':
        if(Dto.header)
        project['header'] = Dto.header;
          break;
        case 'ensayoGranulometria':
        if(Dto.ensayoGranulometria)
        project['ensayoGranulometria'] = Dto.ensayoGranulometria;
          break;
        case 'ensayoHumedad':
        if(Dto.ensayoHumedad)
        project['ensayoHumedad'] = Dto.ensayoHumedad;
          break;
        case 'ensayoLiquido':
        if(Dto.ensayoLiquido)
        project['ensayoLiquido'] = Dto.ensayoLiquido;
          break;
        case 'ensayoPlastico':
        if(Dto.ensayoPlastico)
        project['ensayoPlastico'] = Dto.ensayoPlastico;
          break;
        default:
          break;
      }
    }
   this.project= this.projects[index]=project
   this.laboratorioService.saveStorage(this.project,Dto.id,index)
  }
}
