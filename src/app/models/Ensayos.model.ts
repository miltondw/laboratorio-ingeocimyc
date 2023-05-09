import {IHeader} from './formHeader.model'
import {IHumedad} from './ensayoDeHumedad.model'
import {IGranulometria} from './ensayoDeGranulometria.model'
import {IGroup as ILiquido} from './ensayoDeLimiteLiquido.model'
import {IGroup as IPlastico } from './ensayoDelimitePlastico.model';
export interface IEnsayos{
  id:string,
  title:string;
  referencia:string;
  solicitante:string;
  probe:number;
  date:Date;
  sondeos:ISondeoData[]
  location:string
}
interface ISondeoData{
  sondeo:number;
  muestras:IMuestras[]
}
interface IMuestras{
  header:IHeader;
  ensayoHumedad:IHumedad;
  ensayoGranulometria:IGranulometria | any;
  ensayoLiquido:ILiquido | any;
  ensayoPlastico:IPlastico | any;
}
export interface IDto{
  id:string
  ensayo:'header' | 'ensayoHumedad' | 'ensayoGranulometria' | 'ensayoLiquido' | 'ensayoPlastico';
  sondeo?:number;
  layer?:number;
  location?:string;
  projectTitle?:string;
  referencia?:string;
  solicitante?:string;
  header?:IHeader;
  ensayoHumedad?:IHumedad;
  ensayoGranulometria?:IGranulometria|any;
  ensayoLiquido?:ILiquido;
  ensayoPlastico?:IPlastico;
}
