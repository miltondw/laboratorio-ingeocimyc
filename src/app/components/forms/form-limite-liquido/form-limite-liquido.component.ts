import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { IGroup } from '@app/models/ensayoDeLimiteLiquido.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'
import { LaboratorioService } from '@app/services/laboratorio.service';
@Component({
  selector: 'app-form-limite-liquido',
  templateUrl: './form-limite-liquido.component.html',
  styleUrls: ['./form-limite-liquido.component.scss']
})
export class FormLimiteLiquidoComponent {
  displayedColumns: string[] = [
    'prueba',
    'primera',
    'segunda',
    'tercera'
  ];
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  activeEdit = true
  values: IGroup | any = {};
  stringValues = ["primera", "segunda", "tercera"]
  projectIdValue: string = ""
  numberSondeo = 0

  initialValues = {
    NumberOfStrokes: [''],
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
        if (Object.keys(project.sondeos[indexSondeo]?.ensayoLiquido).length !== 0) {
          this.form.patchValue(project.sondeos[indexSondeo].ensayoLiquido)
        } else {
          this.form.reset()
        }
      }
    })
    this.values = this.form.value
  }
  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group(this.initialValues),
      segunda: this.fb.group(this.initialValues),
      tercera: this.fb.group(this.initialValues),
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
            ensayoLiquido: this.values,
            ensayo: 'ensayoLiquido',
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
