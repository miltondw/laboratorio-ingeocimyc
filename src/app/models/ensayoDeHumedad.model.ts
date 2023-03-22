export interface IHumedad{
  DepthM?:number;
  TareWeightP1?:number;
  TarePlusWetSoilWeightP2?:number;
  TarePlusDrySoilP3?:number;
  DrySoilWeight?:number;
  WeightOfWaterGrs?:number;
  HumidityContent?:number;
  observation?:string;
  cylinder?:{
    diameter:number,
    height:number
  }
}
