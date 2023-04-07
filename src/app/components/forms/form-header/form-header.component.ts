import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IHeader } from '@app/models/formHeader.model'
import { IEnsayos } from '@app/models/Ensayos.model';
import { ProjectService } from '@app/services/project.service'
import { LaboratorioService } from '@app/services/laboratorio.service'

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  values: IHeader | null = null
  location: string = ''
  activeEdit = true
  projectIdValue: string | null = ""
  date: Date = new Date()
  project = {} as IEnsayos
  numberSondeo = 0

  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private laboratorioService: LaboratorioService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    if (!this.values) this.activeEdit = true

    this.laboratorioService.queryId$.subscribe(id => {
      this.projectIdValue = id
      this.project = this.projectService.getProject(id).project
      if (this.form.value?.probe) {
        this.updateData(this.project, this.form.value.probe, this.form.value.layer)
      }
    })
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.updateData(this.project, probe, this.form.value.layer)
      }
    })
    this.laboratorioService.queryLayer$.subscribe(layer => {
      this.form.patchValue({ layer })
      if (layer && this.projectIdValue) {
        this.updateData(this.project, this.numberSondeo, layer)
      }
    })

  }

  private buildForm() {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      TareWeight: [''],
      probe: [],
      layer: [],
      sampleWeightH: ['']
    });
  }
  save() {
    let formValue = this.form.value
    delete formValue.location;
    delete formValue.probe;
    this.values = formValue
    this.location = this.form.get('location')?.value
    if (this.values && this.projectIdValue) {
      this.projectService.createEnsayo(
        {
          header: this.values,
          ensayo: 'header',
          id: this.projectIdValue,
          location: this.location,
          sondeo: this.numberSondeo,
          layer: this.values.layer
        })
      this.activeEdit = false
    }

  }
  onSubmit() {
    if (this.form.valid) {
      this.save()
    } else {
      this.form.markAllAsTouched()
    }
  }
  onActiveEdit() {
    this.activeEdit = true
  }
  updateData(projectData: IEnsayos, valueProbe: number, valueLayer: number) {
    if (valueProbe) {
      const indexSondeo = valueProbe - 1
      const indexLayer = valueLayer - 1
      this.location = projectData.location
      this.numberSondeo = valueProbe
      this.form.patchValue({ layer: valueLayer,location: projectData.location, probe: valueProbe })
      const header = projectData.sondeos[indexSondeo].muestras[indexLayer]?.header
      if(header?.layer){
        header.layer = valueLayer
      }
      if (header?.TareWeight) {
        this.form.patchValue({ TareWeight: header.TareWeight })
      } else {
        this.form.patchValue({ TareWeight: '' })
      }
      if (header?.sampleWeightH) {
        this.form.patchValue({ sampleWeightH: header.sampleWeightH })
      } else {
        this.form.patchValue({ sampleWeightH: '' })
      }
      if(header?.TareWeight && header?.sampleWeightH){
          this.activeEdit = false
      }else{
        this.activeEdit = true
      }
      this.date = projectData?.date
      this.values = this.form.value
    }
  }
}
