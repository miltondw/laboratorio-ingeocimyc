import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { IGroup } from '@app/models/ensayoDelimitePlastico.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'
import { LaboratorioService } from '@app/services/laboratorio.service';

@Component({
  selector: 'app-form-limite-plastico',
  templateUrl: './form-limite-plastico.component.html',
  styleUrls: ['./form-limite-plastico.component.scss']
})
export class FormLimitePlasticoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda'
  ];
  projectIdValue: string = ""
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  activeEdit = true
  values: IGroup | any = {};
  stringValues = ["primera", "segunda"]
  numberSondeo = 0
  indexLayer = 0
  initialValues = {
    TareNumber: [''],
    TareWeight: ['',],
    TarePlusWetSoilWeight: [''],
    TarePlusDrySoil: [''],
    WaterWeight: [''],
    DrySoilWeight: [''],
    Humidity: [''],
  }
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private laboratorioService: LaboratorioService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    this.projectIdValue = this.projectService.projectId
    const project = this.projectService.getProject(this.projectIdValue).project
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.numberSondeo = probe
        const indexSondeo = probe - 1
        const ensayo=project.sondeos[indexSondeo].muestras[this.indexLayer]?.ensayoPlastico
        if (Object.keys(ensayo).length !== 0) {
          this.form.patchValue(ensayo)
        } else {
          this.form.reset()
        }
      }
    })
    this.laboratorioService.queryLayer$.subscribe(layer => {
      if (layer) {
        this.indexLayer = layer - 1
      }
    })
    this.values = this.form.value
  }
  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      segunda: this.fb.group(this.initialValues),
      observation: ['']
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.stringValues.map(stringValue => {
          if (this.values[stringValue].TareWeight
            && this.values[stringValue].TarePlusDrySoil
            && this.values[stringValue].TarePlusWetSoilWeight
          ) {
            const valuesPesos = waterSoilHumidity(
              this.values[stringValue].TareWeight,
              this.values[stringValue].TarePlusDrySoil,
              this.values[stringValue].TarePlusWetSoilWeight
            )
            this.values[stringValue].DrySoilWeight = valuesPesos.pesoSuelo
            this.values[stringValue].WaterWeight = valuesPesos.pesoAgua
            this.values[stringValue].Humidity = valuesPesos.humedad
          }
        })
        this.projectService.createEnsayo(
          {
            ensayoPlastico: this.values,
            ensayo: 'ensayoPlastico',
            id: this.projectIdValue,
            sondeo: this.numberSondeo
          })
        this.form.patchValue(this.values)
        this.activeEdit = false
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  onActiveEdit() {
    this.activeEdit = true
  }
}
