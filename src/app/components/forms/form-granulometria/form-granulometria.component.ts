import { Component,Input } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { IGranulometria } from '@app/models/ensayoDeGranulometria.model'
import { IEnsayos } from '@app/models/Ensayos.model';
import { LaboratorioService } from '@app/services/laboratorio.service';
import { ProjectService } from '@app/services/project.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-granulometria',
  templateUrl: './form-granulometria.component.html',
  styleUrls: ['./form-granulometria.component.scss']
})
export class FormGranulometriaComponent {
//   @Input()
//  set setInforme(value:{informe:boolean,capa:number,sondeo:number,id:string}){
//       if(value.informe && value.capa>=0 && value.id){
//         this.informe=value.informe
//         this.capa=value.capa+1
//         this.projectIdValue=value.id
//         this.numberSondeo=value.sondeo
//         this.project = this.projectService.getProject(this.projectIdValue).project
//          this.update(this.numberSondeo, this.capa)
//       }
//     }
  informe=false
  displayedColumns: string[] = [
    'pulgada',
    'mm',
    'gr'
  ];
  dataSource = ELEMENT_DATA;
  activeEdit = true
  values: IGranulometria | any = {}
  project = {} as IEnsayos
  form: FormGroup = new FormGroup({});
  projectIdValue: string = ""
  numberSondeo = 1
  capa = 1

  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private laboratorioService: LaboratorioService,
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      inches2: [''],
      inches1: [''],
      inches34: ['',],
      inches12: [''],
      inches38: [''],
      inchesN4: [''],
      inchesN10: [''],
      inchesN40: [''],
      inchesN200: [''],
      inchesP200: [''],
      observation: ['']
    });
  }

  ngOnInit() {
    this.projectIdValue = this.projectService.projectId
    this.project = this.projectService.getProject(this.projectIdValue).project
    if(!this.informe){
    this.form.reset()
    this.values = {}
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.numberSondeo = probe
      }
    })
    this.laboratorioService.queryLayer$.subscribe(layer => {
      if (layer) {
        this.capa = layer
        this.update(this.numberSondeo, layer)
      }
    })
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.projectService.createEnsayo(
          {
            ensayoGranulometria: this.values,
            ensayo: 'ensayoGranulometria',
            id: this.projectIdValue,
            sondeo: this.numberSondeo,
            layer: this.capa
          })
        this.form.patchValue(this.values)
      }
      this.activeEdit = false
    } else {
      this.form.markAllAsTouched()
    }
  }

  onActiveEdit() {
    this.activeEdit = true
  }

  update(ISondeo: number, ICapa: number) {
    const granulometria = this.project.sondeos[ISondeo - 1].muestras[ICapa - 1]?.ensayoGranulometria?.tamices
    if(granulometria){
    if (Object.keys(granulometria).length === 0) {
      this.form.reset()
      this.activeEdit = true
    } else {
      this.form.patchValue(granulometria)
      this.activeEdit = false
    }
    this.values = this.form.value
  }
}
}
