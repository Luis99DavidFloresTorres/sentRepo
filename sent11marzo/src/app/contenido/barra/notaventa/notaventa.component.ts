import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ModelItemnotaventa } from 'src/app/Models/Itemnotaventa.model';
import { ModelNotaventa } from 'src/app/Models/Notaventa.model';
import { ServiceItemnotaventa } from 'src/app/services/Itemnotaventa.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-notaventa',
  templateUrl: './notaventa.component.html',
  styleUrls: ['./notaventa.component.css']
})
export class NotaventaComponent implements OnInit, OnDestroy {
  nuevo = false;
  guardar=true;
  cancelar = true;
  recuperarItems=false;
  botones = {'nuevo':this.nuevo,'cancelar':this.cancelar};
  crearDestruir = "neutro";
  subjectProducto = new Subject<ModelItemnotaventa[]>();
  subjectNotaVenta = new Subject<ModelNotaventa>();
  subscribProducto : Subscription|any;
  subscribItemAgregado : Subscription|any;
  subscribNotaVenta:Subscription|any;
  nroDocumento:Number=0;
  constructor(private serviceItemNotaVenta:ServiceItemnotaventa, private serviceUltimoNro:ServiceUltimoNro) { }
  ngOnDestroy(): void {
    if(this.nuevo==true){

      this.serviceUltimoNro.eliminarNroDocumento(this.nroDocumento,"notaventa", 1);

    }
    if(this.subscribProducto!=undefined){
      this.subscribProducto.unsubscribe();
    }
    if(this.subscribNotaVenta!=undefined){
      this.subscribNotaVenta.unsubscribe();
    }
    if(this.subscribItemAgregado!=undefined){
      this.subscribItemAgregado.unsubscribe();
    }

  }
  ngOnInit(): void {
    if(this.subscribNotaVenta!=undefined){
      this.subscribNotaVenta.unsubscribe();
    }
    if(this.subscribItemAgregado!=undefined){
      this.subscribItemAgregado.unsubscribe();
    }
    if(this.subscribNotaVenta!=undefined){
      this.subscribNotaVenta.unsubscribe();
    }
    this.subscribProducto=this.subjectProducto.subscribe(datos=>{
      this.subscribNotaVenta=this.subjectNotaVenta.subscribe(notaventa=>{
        var contador = 0;
        datos.forEach(itemsProducto=>{
          itemsProducto.notaventa=notaventa;
          datos[contador]=itemsProducto;
          contador++;
        })

       this.serviceItemNotaVenta.agregar(datos);
       this.subscribItemAgregado = this.serviceItemNotaVenta.listenerSubjectItemAgregado().subscribe(datos=>{
         console.log("entraaa")
         if(datos.respuesta=="exito"){
           var sino = confirm("Desea imprimir?")
           if(sino==true){
             this.serviceItemNotaVenta.imprimir(notaventa.nrodoc);

           }else{
            location.reload();
           }


         }


       })

      })

    });
  }
  buttonNuevo(){
    this.nuevo = true;
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
  productosObtener(productos:ModelItemnotaventa[]){
    this.subjectProducto.next(productos);

  }
  encabezadoObtener(encabezado:ModelNotaventa){
    this.subjectNotaVenta.next(encabezado);
  }
  habilitarBotonGuardar(resultado:boolean){
    this.guardar=resultado;

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
