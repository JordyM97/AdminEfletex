import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroservicio'
})
export class FiltroservicioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg==='' || arg.length<3) return value;
    const resultado=[];
    for(const servicio of value){
      if(servicio.nameTypeService.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado.push(servicio);
      };
    };
    return resultado;

  }
}