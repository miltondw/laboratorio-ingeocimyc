import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { Router } from '@angular/router'
import {IProject} from '@app/models/project.model'


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

  ) { this.buildForm()}

  private buildForm() {
    this.form = this.fb.group({
      title: ['',Validators.required],
      probe: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        console.log(this.values,"create title")
        this.projectService.createProject(this.values)
        this.router.navigate(
          [`laboratorio/ensayo/${this.values.title.split(' ').join('-').toLocaleLowerCase()}`]
        )
      }
    } else {
      this.form.markAllAsTouched()
    }
  }

}
