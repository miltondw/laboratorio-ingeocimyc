import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IHumedad} from '@app/models/ensayoDeHumedad.model'

@Injectable({
  providedIn: 'root'
})
export class EnsayoDeHumedadService {
  private humidityTestSource=new BehaviorSubject<IHumedad|null>(null)
  key = "values-humidity"
  valuesHumidity$=this.humidityTestSource.asObservable()
  currentHumidity:IHumedad|null=null

  constructor () {
    const humidity = localStorage.getItem(this.key);
    if (humidity) {
      this.humidityTestSource.next(JSON.parse(humidity));
    }
    this.valuesHumidity$.subscribe(v=>this.currentHumidity=v);
  }

  saveStorage(currentHumidity:IHumedad){
      localStorage.setItem(this.key, JSON.stringify(currentHumidity));
      this.currentHumidity=currentHumidity
  }
}
