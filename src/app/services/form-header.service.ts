import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IHeader} from '@app/models/formHeader.model'

@Injectable({
  providedIn: 'root'
})
export class FormHeaderService {
  private valuesHeaderSource=new BehaviorSubject<IHeader|null>(null)
  key = "values-header"
  valuesHeader$=this.valuesHeaderSource.asObservable()
  currentHeader:IHeader|null=null

 constructor () {
    const header = localStorage.getItem(this.key);
    if (header) {
      this.valuesHeaderSource.next(JSON.parse(header));
    }
    this.valuesHeader$.subscribe(v=>this.currentHeader=v);
  }

  saveStorage(currentHeader:IHeader){
      localStorage.setItem(this.key, JSON.stringify(currentHeader));
      this.currentHeader=currentHeader
  }

}
