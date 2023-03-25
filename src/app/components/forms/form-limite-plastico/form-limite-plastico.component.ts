import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnsayoDeLimitePlasticoService } from '@app/services/ensayo-de-limite-plastico.service'
import { ProjectService } from '@app/services/project.service'
import { IGroup } from '@app/models/ensayoDelimitePlastico.model'
import { waterSoilHumidity } from '@app/utils/water-soil-humidity'

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
  dataSource = ELEMENT_DATA;
  form: FormGroup = new FormGroup({});
  activeEdit = true
  valuesPlastico$ = this.plasticoService.valuesPlastico$
  values: IGroup | any = {};
  stringValues = ["primera", "segunda"]
  constructor (
    private fb: FormBuilder,
    private plasticoService: EnsayoDeLimitePlasticoService,
    private projectService: ProjectService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    this.valuesPlastico$.subscribe(v => {
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
        TareNumber: [''],
        TareWeight: ['',],
        TarePlusWetSoilWeight: [''],
        TarePlusDrySoil: [''],
        WaterWeight: [''],
        DrySoilWeight: [''],
        Humidity: [''],
      }),
      segunda: this.fb.group({
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
        this.plasticoService.saveStorage(this.values)
        this.projectService.createEnsayoPlastico(this.values,this.projectService.project.id)
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
