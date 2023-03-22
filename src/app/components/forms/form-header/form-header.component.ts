import { Component,OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {IHeader} from '@app/models/formHeader.model'
import {FormHeaderService} from '@app/services/form-header.service'
@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  values:IHeader|null=null
  valuesHeader$=this.headerServices.valuesHeader$
  activeEdit=false
  constructor (
    private fb: FormBuilder,
    private headerServices:FormHeaderService
    ) {
    this.buildForm()
  }
  ngOnInit(){
    this.valuesHeader$.subscribe(v=>{
      this.values=v
      if(v){
        this.form.patchValue(v)
      }
    })
  }
  private buildForm() {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      typeOfSample: ['',[Validators.required]],
      TareWeight: ['', [Validators.required]],
      probe: ['', [Validators.required]],
      layer: ['', [Validators.required]],
      sampleWeightH: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.values=this.form.value
      if(this.values){
        this.headerServices.saveStorage(this.values)
        this.activeEdit=false
      }
    } else {
      this.form.markAllAsTouched()
    }
  }
  onActiveEdit(){
    this.activeEdit=true
  }
}
