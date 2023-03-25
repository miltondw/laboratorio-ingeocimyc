import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IHeader } from '@app/models/formHeader.model'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  values: IHeader | null = null
  activeEdit = true
  projectIdValue:string|null=""
  date:Date=new Date()
  @Input() set projectId(id:string|null){
    this.projectIdValue=id
    if(id) {
      const project=this.projectService.getProject(id)
      this.form.patchValue(project.header)
      this.values=this.form.value
      this.date=project.date
    }
  }
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.buildForm()
  }
  ngOnInit() {
    if(this.projectIdValue && this.projectService.project?.header?.location){
      this.form.patchValue(this.projectService.project.header)
    }
    if (!this.values) {
      this.activeEdit = true
    }
  }
  private buildForm() {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      TareWeight: [''],
      probe: [''],
      layer: [''],
      sampleWeightH: ['']
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values=this.form.value
      if (this.values && this.projectIdValue) {
        this.projectService.createHeader(this.values,this.projectIdValue)
        console.log(this.values,"form")
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
