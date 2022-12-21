import { Inject, Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
@Injectable({
  providedIn:'root'
})
export class SpliceDates{
  limiteVector:Number|any;
  datos:any;
  displayedColumns: String[]|any;
  nuevoVector:any;
  constructor(@Inject('datos') datos:any,@Inject('nuevoVector') nuevoVector:any, @Inject('displayColumns') displayedColumns: String[]){
    this.limiteVector=0;
    this.datos=datos;
    this.displayedColumns= displayedColumns;
  }
  cortarDatos(){
    var valor=[];
    var cortar = this.datos.length/5000;
    for(var i=0; i<cortar;i++){
      var resultado = this.datos.splice(0,5000);
      valor.push(resultado);
    }
    return valor;
  }
  atras(){
    if(this.limiteVector==0){
      alert("acción no permitida");
    }else{
      this.limiteVector-=1;
      this.datos=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  adelante(){
    if(this.limiteVector==this.nuevoVector.length-1){
      alert("acción no permitida");
    }else{
      this.limiteVector+=1;
      this.datos=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
}
