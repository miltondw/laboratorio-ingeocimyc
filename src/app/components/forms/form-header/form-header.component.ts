import { IEnsayos } from './../../../models/Ensayos.model';
import { Component, OnInit,Input} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IHeader } from '@app/models/formHeader.model'
import { ProjectService } from '@app/services/project.service'
@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  values: IHeader | null = null
  activeEdit = true
  projectIdValue:string|null=""
  date:Date=new Date()
  project={ } as IEnsayos
  @Input() set projectId(id:string|null){
    if(id) {
      this.projectIdValue=id
      const projectData=this.projectService.getProject(id)
      this.project=projectData.project
      this.date=this.project?.date
      if(projectData.project?.header.location){
        this.form.patchValue(projectData.project.header)
        this.values=this.form.value
      }
    }
  }
  constructor (
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.buildForm()
  }
  ngOnInit() {
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
        this.projectService.createEnsayo({header:this.values,ensayo:'header',id:this.projectIdValue})
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
