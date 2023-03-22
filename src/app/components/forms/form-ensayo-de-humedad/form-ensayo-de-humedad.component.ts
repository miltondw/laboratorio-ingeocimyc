import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ELEMENT_DATA } from './data'
import { EnsayoDeHumedadService } from '@app/services/ensayo-de-humedad.service'
import { IHumedad } from '@app/models/ensayoDeHumedad.model'
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
  activeEdit = false
  valuesHumidity$ = this.humedadServices.valuesHumidity$
  values: IHumedad | null = null
  constructor (
    private fb: FormBuilder,
    private humedadServices: EnsayoDeHumedadService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    this.valuesHumidity$.subscribe(v => {
      this.values = v
      if (v) {
        this.form.patchValue(v)
        console.log(v)
      }
    })
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
        diameter: ['', [Validators.required]],
        height: ['', [Validators.required]],
      })
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        if (this.values?.TarePlusDrySoilP3 && this.values?.TareWeightP1) {
          //Peso del suelo seco
          this.values.DrySoilWeight = Number((this.values.TarePlusDrySoilP3 - this.values.TareWeightP1).toFixed(2))
        }
        if (this.values?.TarePlusWetSoilWeightP2 && this.values?.TarePlusDrySoilP3) {
          //Peso del agua
          this.values.WeightOfWaterGrs = Number((this.values.TarePlusWetSoilWeightP2 - this.values.TarePlusDrySoilP3).toFixed(2))
        }
        if (this.values?.DrySoilWeight && this.values?.WeightOfWaterGrs) {
          //Contenido de humedad
          this.values.HumidityContent = Number((this.values.WeightOfWaterGrs / this.values.DrySoilWeight).toFixed(2))
        }
        this.humedadServices.saveStorage(this.values)
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
