import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-cotizacion-cliente',
  templateUrl: './cotizacion-cliente.component.html',
  styleUrls: ['./cotizacion-cliente.component.css']
})
export class CotizacionClienteComponent implements OnInit, OnDestroy {
  nuevo = false;
  guardar=true;
  cancelar = true;
  recuperarItems=false;
  botones = {'nuevo':this.nuevo,'cancelar':this.cancelar};
  crearDestruir = "neutro";
  subjectProducto = new Subject<ModelItemProyecto[]>();
  subjectCotizacionProyecto = new Subject<ModelCotizacionProyecto>();
  subscribProducto : Subscription|any;
  subscribCotizacionProyecto:Subscription|any;
  nroDocumento:Number = 0;
  descto:String="";
  constructor(private serviceItemProyecto:ServiceItemProyecto, private serviceUltimoNro:ServiceUltimoNro) { }
  ngOnDestroy(): void {
    if(this.nuevo==true){

      this.serviceUltimoNro.eliminarNroDocumento(this.nroDocumento,"proyecto", 1);

    }

    if(this.subscribProducto!=undefined){
      this.subscribProducto.unsubscribe();
    }
    if(this.subscribCotizacionProyecto!=undefined){
      this.subscribCotizacionProyecto.unsubscribe();
    }
  }
  ngOnInit(): void {
    if(this.subscribProducto!=undefined){
      this.subscribProducto.unsubscribe();
    }
    if(this.subscribCotizacionProyecto!=undefined){
      this.subscribCotizacionProyecto.unsubscribe();
    }
    this.subscribProducto =this.subjectProducto.subscribe(datos=>{
      this.subscribCotizacionProyecto=this.subjectCotizacionProyecto.subscribe(proyecto=>{
        var contador = 0;
        datos.forEach(itemsProducto=>{
          itemsProducto.proyecto=proyecto;
          datos[contador]=itemsProducto;
          contador++;
        })
       this.serviceItemProyecto.agregar(datos);
     //  location.reload();
      })

    });
  }
  buttonNuevo(){
    this.nuevo = true;
    this.guardar=false;
    this.cancelar=false;
    this.recuperarItems=false;
    this.botones={'nuevo':this.nuevo,'cancelar':this.cancelar};
    this.crearDestruir="crear";
  }
  buttonCancelar(){

    this.nuevo = false;
    this.cancelar=true;
    this.botones={'nuevo':this.nuevo,'cancelar':this.cancelar};
    this.crearDestruir ="destruir";
  }
  buttonGuardar(){
    this.recuperarItems=true;
    this.guardar = true;
    this.nuevo = false;
    this.cancelar = true;
  }
  productosObtener(productos:ModelItemProyecto[]){
    this.subjectProducto.next(productos);
  }
  encabezadoObtener(encabezado:ModelCotizacionProyecto){
    this.subjectCotizacionProyecto.next(encabezado);
  }
  habilitarBotonGuardar(resultado:boolean){

    this.guardar=resultado;
    //this.descto = descto;
  }
  canastaVacia(){
    this.crearDestruir="destruir";
    this.guardar=true;
    this.cancelar=true;
    this.nuevo=false;
    this.botones={'nuevo':this.nuevo,'cancelar':this.cancelar};
  }

  guardarNroDocumento(nroDocumento:Number){
    this.nroDocumento=nroDocumento;
  }
}

