import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { Router } from '@angular/router'
import { IProject } from '@app/models/project.model'


@Component({
  selector: 'app-form-create-ensayo',
  templateUrl: './form-create-ensayo.component.html',
  styleUrls: ['./form-create-ensayo.component.scss']
})

export class FormCreateEnsayoComponent {
  form: FormGroup = new FormGroup({});
  values = {} as IProject;

  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,

  ) { this.buildForm() }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      probe: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.projectService.createProject(this.values)
        const id = this.values.title.split(' ').join('-').toLocaleLowerCase()
        if (this.values.probe) {
          this.router.navigate([`laboratorio/ensayo/${id}`], { queryParams: { probe: '1' } });
        } else {
          this.router.navigate([`laboratorio/ensayo/${id}`])
        }
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}
