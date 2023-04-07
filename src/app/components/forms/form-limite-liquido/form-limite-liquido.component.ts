import { IEnsayos } from '@app/models/Ensayos.model';
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
  indexLayer = 0
  project = {} as IEnsayos

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
            sondeo: this.numberSondeo,
            layer: this.indexLayer
          })
        this.form.patchValue(this.values)
        this.activeEdit = false
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  update(ISondeo: number, ICapa: number) {
    const ensayoLiquido = this.project.sondeos[ISondeo - 1].muestras[ICapa - 1]?.ensayoLiquido
    if (Object.keys(ensayoLiquido).length === 0) {
      this.form.reset()
      this.activeEdit = true
    } else {
      this.form.patchValue(ensayoLiquido)
      this.activeEdit = false
    }
    this.values = this.form.value
  }
  onActiveEdit() {
    this.activeEdit = true
  }
}
