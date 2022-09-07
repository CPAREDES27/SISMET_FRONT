import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viento'
})
export class VientoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var vientos:string="";
    switch(value){
      case "North": {vientos ="N";break;}
      case "North-northeast":{ vientos ="N/NE";break;}
      case "Northeast" : vientos="NE";break;
      case "East-northeast" : vientos="E/NE";break;
      case "East" : vientos="E";break;
      case "East-southeast" : vientos="E/SE";break;
      case "Southeast" : vientos="SE";break;
      case "South-southeast" : vientos="S/SE";break;
      case "South" : vientos="S";break;
      case "South-southwest" : vientos="S/SW";break;
      case "Southwest" : vientos="SW";break;
      case "West-southwest" : vientos="W/SW";break;
      case "West" : vientos="W";break;
      case "West-northwest" : vientos="W/NW";break;
      case "Northwest" : vientos="NW";break;
      case "North-northwest" : vientos="N/NW";break;
    }
    return vientos;
  }

}
