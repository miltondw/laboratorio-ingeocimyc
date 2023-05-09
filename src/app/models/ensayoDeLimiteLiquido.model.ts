export interface ILimiteLiquido{
  NumberOfStrokes:number;
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
  primera:ILimiteLiquido;
  segunda:ILimiteLiquido;
  tercera:ILimiteLiquido;
  limiteLiquido?:number
}
