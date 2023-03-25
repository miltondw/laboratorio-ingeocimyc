export interface ILimitePlastico{
  TareNumber:number;
  TareWeight:number
  TarePlusWetSoilWeight:number;
  TarePlusDrySoil:number;
  WaterWeight:number
  DrySoilWeight:number
  Humidity:number
  observation:string
}

export interface IGroup{
  primera:ILimitePlastico;
  segunda:ILimitePlastico;
  tercera:ILimitePlastico;
}
