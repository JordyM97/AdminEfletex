import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrousuario'
})
export class FiltrousuarioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg==='' || arg.length<3) return value;
    const resultado=[];
    for(const proveedor of value){
      if(proveedor.lnameDriver.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultado.push(proveedor);
      };
    };
    return resultado;

  }

}
