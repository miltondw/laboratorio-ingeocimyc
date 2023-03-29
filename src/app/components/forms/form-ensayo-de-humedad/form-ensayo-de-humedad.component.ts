import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ELEMENT_DATA } from './data'
import { ProjectService } from '@app/services/project.service'
import { IHumedad } from '@app/models/ensayoDeHumedad.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'
import { IEnsayos } from '@app/models/Ensayos.model';

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
  projectIdValue: string = ""
  project={ } as IEnsayos;
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.buildForm()
  }
 ngOnInit() {
    this.projectIdValue = this.projectService.project.id
    this.project = this.projectService.project
    this.form.patchValue(this.project.ensayoHumedad)
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
      if (this.values) {
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
            id: this.projectIdValue
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
