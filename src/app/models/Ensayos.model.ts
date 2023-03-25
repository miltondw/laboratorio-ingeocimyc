import {IHeader} from './formHeader.model'
import {IHumedad} from './ensayoDeHumedad.model'
import {IGranulometria} from './ensayoDeGranulometria.model'
import {IGroup as IGroupLiquido} from './ensayoDeLimiteLiquido.model'
import {IGroup as IGroupPlastico } from './ensayoDelimitePlastico.model';
export interface IEnsayos{
  id:string,
  probe:number;
  date:Date;
  header:IHeader;
  ensayoHumedad:IHumedad;
  ensayoGranulometria:IGranulometria;
  ensayoLiquido:IGroupLiquido;
  ensayoPlastico:IGroupPlastico;
}
