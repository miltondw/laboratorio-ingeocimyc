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
  project = {} as IEnsayos
  projectId = ''
  constructor (private laboratorioService: LaboratorioService) {
    this.projects = this.laboratorioService.currentProjects
    this.laboratorioService.queryId$.subscribe(id => {
      if (id) this.projectId = id
    })
  }

  createProject(project: IProject) {
    let projectInitial: IEnsayos = {
      id: '',
      probe: project.probe,
      title: project.title,
      location: project.location,
      date: new Date(),
      sondeos: []
    }
    projectInitial.id = project.title.split(' ').join('-').toLocaleLowerCase()
    for (let sondeos = 1; sondeos <= projectInitial.probe; sondeos++) {
      const sondeo = {
        sondeo: sondeos,
        header: {} as IHeader,
        ensayoHumedad: {} as IHumedad,
        ensayoGranulometria: {} as IGranulometria,
        ensayoLiquido: {} as ILiquido,
        ensayoPlastico: {} as IPlastico
      }
      projectInitial.sondeos.push(sondeo)
    }
    this.laboratorioService.saveStorage(projectInitial)
  }

  getProject(id:string|null) {
    const project: IEnsayos = this.projects.filter(project => project.id == id)[0]
    const index: number = this.projects.findIndex(project => project.id == id)
    return {
      project,
      index
    }
  }

  createEnsayo(Dto: IDto) {
    const { project, index } = this.getProject(Dto.id)
    if (Dto.location) project.location = Dto.location
    //Fase 2
    if (Dto.ensayo && Dto.sondeo) {
      const iSondeo = Dto.sondeo - 1
      switch (Dto.ensayo) {
        case 'header':
          if (Dto.header) {
            project.sondeos[iSondeo]['header'] = Dto.header;
          }
          break;
        case 'ensayoGranulometria':
          if (Dto.ensayoGranulometria) {
            project.sondeos[iSondeo]['ensayoGranulometria'] = Dto.ensayoGranulometria;
          }
          break;
        case 'ensayoHumedad':

          if (Dto.ensayoHumedad) {
            project.sondeos[iSondeo]['ensayoHumedad'] = Dto.ensayoHumedad;
          }
          break;
        case 'ensayoLiquido':
          if (Dto.ensayoLiquido) {
            project.sondeos[iSondeo]['ensayoLiquido'] = Dto.ensayoLiquido;
          }
          break;
        case 'ensayoPlastico':
          if (Dto.ensayoPlastico) {
            project.sondeos[iSondeo]['ensayoPlastico'] = Dto.ensayoPlastico;
          }
          break;
        default:
          break;
      }
    }
    this.project = this.projects[index] = project
    this.laboratorioService.saveStorage(this.project, Dto.id, index)
  }

}
