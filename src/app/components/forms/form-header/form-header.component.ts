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
      if (this.form.value?.probe) this.updateData(this.project, this.form.value.probe)
    })

    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.updateData(this.project, probe)
        this.numberSondeo = probe - 1
      }
    })
  }

  private buildForm() {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      TareWeight: [''],
      probe: [1],
      layer: [''],
      sampleWeightH: ['']
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      this.location = this.form.get('location')?.value
      if (this.values && this.projectIdValue) {
        this.projectService.createEnsayo(
          {
            header: this.values,
            ensayo: 'header',
            id: this.projectIdValue,
            location: this.location,
            sondeo: this.values.probe
          })
        this.activeEdit = false
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  onActiveEdit() {
    this.activeEdit = true
  }
  updateData(projectData: IEnsayos, valueProbe: number) {
    if (valueProbe) {
      const indexSondeo = valueProbe - 1
      if (Object.keys(projectData.sondeos[indexSondeo]?.header).length !== 0) {
        this.form.patchValue(projectData.sondeos[indexSondeo].header)
      } else {
        this.form.patchValue({
          TareWeight: '',
          layer: '',
          sampleWeightH: '',
        })
      }
      if (projectData?.location) {
        this.form.patchValue({ location: projectData.location })
        this.location = projectData.location
      }
      if (this.values?.probe) {
        this.form.patchValue({ probe: valueProbe })
        this.values.probe = valueProbe;
      }
      this.date = projectData?.date
      this.values = this.form.value
    }
  }
}
