import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ELEMENT_DATA } from './data'
import { ProjectService } from '@app/services/project.service'
import { LaboratorioService } from '@app/services/laboratorio.service';
import { IHumedad } from '@app/models/ensayoDeHumedad.model'
import { IEnsayos } from '@app/models/Ensayos.model';
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'

@Component({
  selector: 'app-form-ensayo-de-humedad',
  templateUrl: './form-ensayo-de-humedad.component.html',
  styleUrls: ['./form-ensayo-de-humedad.component.scss'],
})
export class FormEnsayoDeHumedadComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',

  ];
  dataSource:Object[] = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  activeEdit = true
  values: IHumedad | any = {};
  profundidad:string[]=[]
  projectIdValue: string | null = ""
  stringValues = ["primera"]
  project = {} as IEnsayos;
  numberSondeo = 0
  indexLayer = 0
  initialValues={
    DepthM: [''],
    TareWeightP1: [''],
    TarePlusWetSoilWeightP2: ['',],
    TarePlusDrySoilP3: [''],
    DrySoilWeight: [''],
    WeightOfWaterGrs: [''],
    HumidityContent: [''],
  }
  depthM:string=''
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private laboratorioService: LaboratorioService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    this.projectIdValue = this.projectService.projectId
    this.project = this.projectService.getProject(this.projectIdValue).project
    this.form.reset()
    this.values = {}
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.numberSondeo = probe
      }
    })
    this.laboratorioService.queryLayer$.subscribe(layer => {
      if (layer) {
        this.indexLayer = layer
        this.update(this.numberSondeo, layer)
      }
    })
    this.profundidadInicial()
  }
  profundidadInicial(){
    this.depthM=this.form.get('primera')?.get('DepthM')?.value
    console.log(this.depthM,'depthM')
    // if(this.depthM){
    //   this.profundidad=this.depthM.split("-")
    //   this.values = this.form.value
    //   this.values.primera.DepthM=this.profundidad
    // }else{
    //  this.values = this.form.value
    // }
    this.values = this.form.value
  }
  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      // segunda: this.fb.group(this.initialValues),
      // tercera: this.fb.group(this.initialValues),
      observation: [''],
      cylinder: this.fb.group({
        diameter: [''],
        height: [''],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.profundidadInicial()
      if (this.values && this.projectIdValue) {
        this.stringValues.map(stringValue => {
          if (this.values[stringValue].TareWeightP1
            && this.values[stringValue].TarePlusDrySoilP3
            && this.values[stringValue].TarePlusWetSoilWeightP2
          ) {
            const valuesPesos = waterSoilHumidity(
              this.values[stringValue].TareWeightP1,
              this.values[stringValue].TarePlusDrySoilP3,
              this.values[stringValue].TarePlusWetSoilWeightP2
            )
            this.values[stringValue].DrySoilWeight = valuesPesos.pesoSuelo
            this.values[stringValue].WeightOfWaterGrs = valuesPesos.pesoAgua
            this.values[stringValue].HumidityContent = valuesPesos.humedad
          }
        })
        if(this.values.primera.DepthM){
        this.values.primera.DepthM=this.values.primera.DepthM.split("-")
         if(this.values.primera.DepthM[0][0]==='0'){
         this.values.primera.DepthM[0]=this.values.primera.DepthM[1]
         }
        }
        this.projectService.createEnsayo(
          {
            ensayoHumedad: this.values,
            ensayo: 'ensayoHumedad',
            id: this.projectIdValue,
            sondeo: this.numberSondeo,
            layer: this.indexLayer
          })
        this.activeEdit = false
        this.form.patchValue(this.values)
      }
    } else {
      this.form.markAllAsTouched()
    }
  }

  onActiveEdit() {
    this.activeEdit = true
  }

  update(ISondeo: number, ICapa: number) {
    const ensayoHumedad = this.project.sondeos[ISondeo - 1].muestras[ICapa - 1]?.ensayoHumedad
    if (Object.keys(ensayoHumedad).length === 0) {
      this.form.reset()
      if(this.dataSource[6]){
        this.dataSource.splice(4,3)
      }
      this.activeEdit = true
    } else {
      if(typeof ensayoHumedad.primera.DepthM !== 'string'){
        this.depthM=ensayoHumedad.primera.DepthM.join("-")
        ensayoHumedad.primera.DepthM=this.depthM
      }
      this.form.patchValue(ensayoHumedad)
      this.activeEdit = false
    }
    this.profundidadInicial()
  }
}
