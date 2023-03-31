import { LaboratorioService } from './../../../services/laboratorio.service';
import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { IGranulometria } from '@app/models/ensayoDeGranulometria.model'
import { ProjectService } from '@app/services/project.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-granulometria',
  templateUrl: './form-granulometria.component.html',
  styleUrls: ['./form-granulometria.component.scss']
})
export class FormGranulometriaComponent {

  displayedColumns: string[] = [
    'pulgada',
    'mm',
    'gr'
  ];
  dataSource = ELEMENT_DATA;
  activeEdit = true
  values: IGranulometria | any = {}
  form: FormGroup = new FormGroup({});
  projectIdValue: string = ""
  numberSondeo = 1
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private laboratorioService: LaboratorioService,
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.fb.group({
      inches2: [''],
      inches1: [''],
      inches34: ['',],
      inches12: [''],
      inches38: [''],
      inchesN4: [''],
      inchesN10: [''],
      inchesN40: [''],
      inchesN200: [''],
      inchesP200: [''],
      observation: ['']
    });
  }
  ngOnInit() {
    this.projectIdValue = this.projectService.projectId
    const project = this.projectService.getProject(this.projectIdValue).project
    this.laboratorioService.queryProbe$.subscribe(probe => {
      if (probe) {
        this.numberSondeo = probe
        const indexSondeo = probe - 1
        if (Object.keys(project.sondeos[indexSondeo]?.ensayoGranulometria).length !== 0) {
          this.form.patchValue(project.sondeos[indexSondeo].ensayoGranulometria)
        } else {
          this.form.reset()
        }
      }
    })
    this.values = this.form.value
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.projectService.createEnsayo(
          {
            ensayoGranulometria: this.values,
            ensayo: 'ensayoGranulometria',
            id: this.projectIdValue,
            sondeo: this.numberSondeo
          })
        this.form.patchValue(this.values)
      }
      this.activeEdit = false
    } else {
      this.form.markAllAsTouched()
    }
  }
  onActiveEdit() {
    this.activeEdit = true
  }
}
