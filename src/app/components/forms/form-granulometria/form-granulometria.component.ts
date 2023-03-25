import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data'
import { IGranulometria } from '@app/models/ensayoDeGranulometria.model'
import { EnsayoDeGranulometriaService } from '@app/services/ensayo-de-granulometria.service'
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
  valuesGranulometria$ = this.granulometriaService.valuesGranulometria$
  values: IGranulometria | any = {}
  form: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    private granulometriaService: EnsayoDeGranulometriaService,
    private projectService: ProjectService
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
    this.valuesGranulometria$.subscribe(v => {
      if (v) {
        this.values = v
        this.form.patchValue(v)
        this.activeEdit = false
      }
    })
  }
  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.granulometriaService.saveStorage(this.values)
        this.projectService.createEnsayoGranulometria(this.values,this.projectService.project.id)
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
