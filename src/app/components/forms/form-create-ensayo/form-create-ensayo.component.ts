import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { Router } from '@angular/router'

export interface IProject {
  location: string,
  probe: number
}

@Component({
  selector: 'app-form-create-ensayo',
  templateUrl: './form-create-ensayo.component.html',
  styleUrls: ['./form-create-ensayo.component.scss']
})

export class FormCreateEnsayoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  values = {} as IProject;

  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,

  ) { this.buildForm()}

  private buildForm() {
    this.form = this.fb.group({
      location: ['',Validators.required],
      probe: ['']
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.projectService.createProject(this.values)
        this.router.navigate([`laboratorio/ensayo/${this.values.location.split(' ').join('-').toLocaleLowerCase()}`])
      }
    } else {
      this.form.markAllAsTouched()
    }
  }

}
