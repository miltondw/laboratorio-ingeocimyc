import { Injectable } from '@angular/core';
import { IProject } from '@app/models/project.model'
import { IDto, IEnsayos } from '@app/models/Ensayos.model'
import { IHeader } from '@app/models/formHeader.model'
import { IHumedad } from '@app/models/ensayoDeHumedad.model'
import { IGranulometria ,ISucsData} from '@app/models/ensayoDeGranulometria.model'
import { IGroup as ILiquido } from '@app/models/ensayoDeLimiteLiquido.model'
import { IGroup as IPlastico } from '@app/models/ensayoDelimitePlastico.model'
import { LaboratorioService } from './laboratorio.service'
import { v4 as uuidv4 } from 'uuid';

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

  //Get
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
  //Create
  createProject(project: IProject) {
    let projectInitial: IEnsayos = {
      id: '',
      probe: project.probe,
      title: project.title,
      location: project.location,
      referencia: project.referencia,
      solicitante: project.solicitante,
      date: new Date(),
      sondeos: []
    }
    // projectInitial.id = project.title.split(' ').join('-').toLocaleLowerCase()
    projectInitial.id = uuidv4();
    for (let sondeos = 1; sondeos <= projectInitial.probe; sondeos++) {
      const sondeo = {
        sondeo: sondeos,
        muestras: [
          {
            header: {} as IHeader,
            ensayoHumedad: {} as IHumedad,
            ensayoGranulometria: {} as IGranulometria,
            ensayoLiquido: {} as ILiquido,
            ensayoPlastico: {} as IPlastico
          }
        ]
      }
      projectInitial.sondeos.push(sondeo)
    }
    projectInitial.sondeos[0].muestras[0].header.layer = 1
    this.laboratorioService.saveStorage(projectInitial)
  }
  createEnsayo(Dto: IDto) {
    const { project, index } = this.getProject(Dto.id)
    if (Dto.location) project.location = Dto.location
    if (Dto.projectTitle) project.title = Dto.projectTitle
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
            const granulometria=project.sondeos[iSondeo].muestras[iLayer]['ensayoGranulometria']
            const observation=Dto.ensayoGranulometria?.observation
            delete Dto.ensayoGranulometria?.observation
            granulometria.tamices = Dto.ensayoGranulometria;
            const tamices:number[]=Object.values(Dto.ensayoGranulometria)
            const total=tamices.reduce((dc:number, va:number) => dc + va, 0)
            const retenido=tamices.map((tamice)=>{
              const retenido=((tamice/total)*100)
              return Number(retenido.toFixed(2))
            })
            const acum=[0]
            for (let i = 1; i < retenido.length; i++) {
              const porcentajeacum = Number((retenido[i] + acum[i - 1]).toFixed(2));
              acum.push(porcentajeacum);
            }
            const pasa=acum.map((ac:number)=>Number((100-ac).toFixed(2)))
            const subRetenido=retenido.slice(0,6)
            const grava=subRetenido.reduce((ac:number,va:number)=>ac+va,0)
            const subRetenido2=retenido.slice(6,9)
            const arena=subRetenido2.reduce((ac:number,va:number)=>ac+va,0)
            const finos=pasa[pasa.length-2]
            granulometria.data = {
              total,
              retenido,
              acum,
              pasa,
              grava,
              arena,
              finos,
              sucsData:'',
              observation
            }
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
  createSondeo() {
    this.project.sondeos.push(
      {
        sondeo: this.project.probe,
        muestras: [this.muestra]
      }
    )
    this.laboratorioService.saveStorage(this.project, this.projectId, this.indexProject)
  }
  createSucsData(sucsData:ISucsData){
    const { project, index } = this.getProject(sucsData.id)
    const granulometria=project.sondeos[sucsData.sondeo].muestras[sucsData.layer].ensayoGranulometria
    granulometria.data.sucsData=sucsData.sucsData
    this.projects[index] = project
    this.project = this.projects[index]
    this.laboratorioService.saveStorage(this.project, sucsData.id, index)
  }

  createMuestra(sondeo: number) {
    let muestras = this.project.sondeos[sondeo].muestras
    muestras.push({
      header: {} as IHeader,
      ensayoHumedad: {} as IHumedad,
      ensayoGranulometria: {} as IGranulometria,
      ensayoLiquido: {} as ILiquido,
      ensayoPlastico: {} as IPlastico,
    })
    this.laboratorioService.saveStorage(this.project, this.projectId, this.indexProject)
  }
  //Delete
  deleteEnsayo(id: string) {
    this.projects = this.projects.filter((project) => project.id !== id)
    this.laboratorioService.deleteEnsayo(this.projects)
  }
  deleteSondeo(id: string, indexSondeo: number) {
    const { project, index } = this.getProject(id)
    project.sondeos.splice(indexSondeo, 1)
    project.probe = project.probe - 1
    this.project = project
    this.laboratorioService.saveStorage(this.project, this.project.id, index)
  }
  deleteMuestra(id: string, indexSondeo: number, indexMuestra: number) {
    const { project, index } = this.getProject(id)
    project.sondeos[indexSondeo].muestras.splice(indexMuestra, 1)
    this.project = project
    this.laboratorioService.saveStorage(this.project, this.project.id, index)
  }
}
