import {IHeader} from './formHeader.model'
import {IHumedad} from './ensayoDeHumedad.model'
import {IGranulometria} from './ensayoDeGranulometria.model'
import {IGroup as ILiquido} from './ensayoDeLimiteLiquido.model'
import {IGroup as IPlastico } from './ensayoDelimitePlastico.model';
export interface IEnsayos{
  id:string,
  title:string
  probe:number;
  date:Date;
  header:IHeader;
  ensayoHumedad:IHumedad;
  ensayoGranulometria:IGranulometria;
  ensayoLiquido:ILiquido;
  ensayoPlastico:IPlastico;
}
export interface IDto{
  id:string
  ensayo:'header' | 'ensayoHumedad' | 'ensayoGranulometria' | 'ensayoLiquido' | 'ensayoPlastico',
  header?:IHeader;
  ensayoHumedad?:IHumedad;
  ensayoGranulometria?:IGranulometria;
  ensayoLiquido?:ILiquido;
  ensayoPlastico?:IPlastico;
}
