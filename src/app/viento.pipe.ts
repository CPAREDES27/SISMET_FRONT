import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viento'
})
export class VientoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var vientos:string="";
    switch(value){
      case "North": {vientos ="N";break;}
      case "North-northeast":{ vientos ="NNE";break;}
      case "Northeast" : vientos="NE";break;
      case "East-northeast" : vientos="ENE";break;
      case "East" : vientos="E";break;
      case "East-southeast" : vientos="ESE";break;
      case "Southeast" : vientos="SE";break;
      case "South-southeast" : vientos="SSE";break;
      case "South" : vientos="S";break;
      case "South-southwest" : vientos="SSW";break;
      case "Southwest" : vientos="SW";break;
      case "West-southwest" : vientos="WSW";break;
      case "West" : vientos="W";break;
      case "West-northwest" : vientos="WNW";break;
      case "Northwest" : vientos="NW";break;
      case "North-northwest" : vientos="NNW";break;
    }
    return vientos;
  }

}
