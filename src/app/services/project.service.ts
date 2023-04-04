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
  indexProject = 0
  muestra = {
    header: {} as IHeader,
    ensayoHumedad: {} as IHumedad,
    ensayoGranulometria: {} as IGranulometria,
    ensayoLiquido: {} as ILiquido,
    ensayoPlastico: {} as IPlastico,
  }

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
        muestras: [
          this.muestra
        ]
      }
      projectInitial.sondeos.push(sondeo)
    }
    projectInitial.sondeos[0].muestras[0].header.layer=1
    this.laboratorioService.saveStorage(projectInitial)
  }
  getProject(id: string | null) {
    const project: IEnsayos = this.projects.filter(project => project.id == id)[0]
    const index: number = this.projects.findIndex(project => project.id == id)
    this.project = project
    this.indexProject = index
    return {
      project,
      index
    }
  }
  createEnsayo(Dto: IDto) {
    const { project, index } = this.getProject(Dto.id)
    if (Dto.location) project.location = Dto.location
    //Fase 2
    if (Dto.ensayo && Dto.sondeo && Dto.layer) {
      const iSondeo = Dto.sondeo - 1
      const iLayer = Dto.layer - 1
      switch (Dto.ensayo) {
        case 'header':
          if (Dto.header) {
            project.sondeos[iSondeo].muestras[iLayer]['header'] = Dto.header;
          }
          break;
        case 'ensayoGranulometria':
          if (Dto.ensayoGranulometria) {
            project.sondeos[iSondeo].muestras[iLayer]['ensayoGranulometria'] = Dto.ensayoGranulometria;
          }
          break;
        case 'ensayoHumedad':

          if (Dto.ensayoHumedad) {
            project.sondeos[iSondeo].muestras[iLayer]['ensayoHumedad'] = Dto.ensayoHumedad;
          }
          break;
        case 'ensayoLiquido':
          if (Dto.ensayoLiquido) {
            project.sondeos[iSondeo].muestras[iLayer]['ensayoLiquido'] = Dto.ensayoLiquido;
          }
          break;
        case 'ensayoPlastico':
          if (Dto.ensayoPlastico) {
            project.sondeos[iSondeo].muestras[iLayer]['ensayoPlastico'] = Dto.ensayoPlastico;
          }
          break;
        default:
          break;
      }
    }
    //Fase 3
    this.projects[index] = project
    this.project = this.projects[index]
    this.laboratorioService.saveStorage(this.project, Dto.id, index)
  }
  createSondeo(){
    console.log(this.project.probe)
    this.project.sondeos.push({sondeo:this.project.probe,muestras:[this.muestra]})
    this.laboratorioService.saveStorage(this.project, this.projectId, this.indexProject)
  }
  createMuestra(sondeo: number) {
    let muestras = this.project.sondeos[sondeo].muestras
    muestras.push(this.muestra)
    this.laboratorioService.saveStorage(this.project, this.projectId, this.indexProject)
  }
}
