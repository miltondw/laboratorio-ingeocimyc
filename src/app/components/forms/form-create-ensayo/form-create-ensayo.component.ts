import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@app/services/project.service'
import { Router } from '@angular/router'
import { IProject } from '@app/models/project.model'
import { v4 as uuidv4 } from 'uuid';


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
      referencia: ['', Validators.required],
      solicitante: ['', Validators.required],
      probe: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.values = this.form.value
      if (this.values) {
        this.values.id = uuidv4();
        this.projectService.createProject(this.values)
        if (this.values.probe) {
          this.router.navigate([`laboratorio/ensayo/${this.values.id}`], { queryParams: { probe: '1', layer:'1' } });
        } else {
          this.router.navigate([`laboratorio/ensayo/${this.values.id}`])
        }
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
}
