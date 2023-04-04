import { Component, Input } from '@angular/core';
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
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  activeEdit = true
  values: IHumedad | any = {};
  projectIdValue: string | null = ""
  project = {} as IEnsayos;
  numberSondeo = 0
  indexLayer = 0
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
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.numberSondeo = probe
        const indexSondeo = probe - 1
        if (Object.keys(this.project.sondeos[indexSondeo].muestras[this.indexLayer]?.ensayoHumedad).length !== 0) {
          this.form.patchValue(this.project.sondeos[indexSondeo].muestras[this.indexLayer].ensayoHumedad)
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
      DepthM: [''],
      TareWeightP1: [''],
      TarePlusWetSoilWeightP2: ['',],
      TarePlusDrySoilP3: [''],
      DrySoilWeight: [''],
      WeightOfWaterGrs: [''],
      HumidityContent: [''],
      observation: [''],
      cylinder: this.fb.group({
        diameter: [''],
        height: [''],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values && this.projectIdValue) {
        if (this.values?.TareWeightP1 &&
          this.values?.TarePlusDrySoilP3 &&
          this.values?.TarePlusWetSoilWeightP2
        ) {
          const valuesPesos = waterSoilHumidity(
            this.values?.TareWeightP1,
            this.values?.TarePlusDrySoilP3,
            this.values?.TarePlusWetSoilWeightP2
          )
          this.values.DrySoilWeight = valuesPesos.pesoSuelo
          this.values.WeightOfWaterGrs = valuesPesos.pesoAgua
          this.values.HumidityContent = valuesPesos.humedad
        }
        this.projectService.createEnsayo(
          {
            ensayoHumedad: this.values,
            ensayo: 'ensayoHumedad',
            id: this.projectIdValue,
            sondeo: this.numberSondeo
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
}
