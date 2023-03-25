import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnsayoDeLimiteLiquidoService } from '@app/services/ensayo-de-limite-liquido.service'
import { ProjectService } from '@app/services/project.service'
import { IGroup } from '@app/models/ensayoDeLimiteLiquido.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'
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
  valuesLiquido$ = this.liquidoService.valuesLiquido$
  values: IGroup | any = {};
  stringValues = ["primera", "segunda", "tercera"]
  constructor (
    private fb: FormBuilder,
    private liquidoService: EnsayoDeLimiteLiquidoService,
    private projectService: ProjectService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    this.valuesLiquido$.subscribe(v => {
      if (v) {
        this.values = v
        this.form.patchValue(v)
        this.activeEdit = false
      }
    })
  }
  private buildForm() {
    this.form = this.fb.group({
      primera: this.fb.group({
        NumberOfStrokes: [''],
        TareNumber: [''],
        TareWeight: ['',],
        TarePlusWetSoilWeight: [''],
        TarePlusDrySoil: [''],
        WaterWeight: [''],
        DrySoilWeight: [''],
        Humidity: [''],
      }),
      segunda: this.fb.group({
        NumberOfStrokes: [''],
        TareNumber: [''],
        TareWeight: ['',],
        TarePlusWetSoilWeight: [''],
        TarePlusDrySoil: [''],
        WaterWeight: [''],
        DrySoilWeight: [''],
        Humidity: [''],
      }),
      tercera: this.fb.group({
        NumberOfStrokes: [''],
        TareNumber: [''],
        TareWeight: ['',],
        TarePlusWetSoilWeight: [''],
        TarePlusDrySoil: [''],
        WaterWeight: [''],
        DrySoilWeight: [''],
        Humidity: [''],
      }),
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
        this.liquidoService.saveStorage(this.values)
        this.projectService.createEnsayoLiquido(this.values,this.projectService.project.id)
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
