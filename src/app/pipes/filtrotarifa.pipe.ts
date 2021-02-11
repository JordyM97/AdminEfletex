import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotarifa'
})
export class FiltrotarifaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg==='' || arg.length<2) return value;
    const resultado=[];
    for(const tarifa of value){
      if(tarifa.nameService.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado.push(tarifa);
      };
    };
    return resultado;
  }
}
