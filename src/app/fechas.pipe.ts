import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    var fecha:string="";
    fecha=value.split("T")[0] +" / "+value.split("T")[1];
    return fecha;
  }

}
