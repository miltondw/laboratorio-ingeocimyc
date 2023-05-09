export interface IHumedad{
  primera:IGroup;
  segunda?:IGroup;
  tercera?:IGroup;
  observation:string;
  cylinder:{
    diameter:number,
    height:number
  }
}
export interface IGroup{
  DepthM:string[]|string;
  TareWeightP1:number;
  TarePlusWetSoilWeightP2:number;
  TarePlusDrySoilP3:number;
  DrySoilWeight:number;
  WeightOfWaterGrs:number;
  HumidityContent:number;
}
