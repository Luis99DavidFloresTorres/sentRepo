import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ModelItemOrdenCompra } from 'src/app/Models/ItemOrdenCompra';
import { ModelOrdenCompra } from 'src/app/Models/OrdenCompra';
import { ServiceItemCompra } from 'src/app/services/ItemOrdenCompra.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.css']
})
export class OrdencompraComponent implements OnInit,OnDestroy {
  nuevo = false;
  guardar=true;
  cancelar = true;
  recuperarItems=false;
  botones = {'nuevo':this.nuevo,'cancelar':this.cancelar};
  crearDestruir = "neutro";
  subjectProducto = new Subject<ModelItemOrdenCompra[]>();
  subjectOrdenCompra = new Subject<ModelOrdenCompra>();
  subscribProducto : Subscription|any;
  subscribOrdenCompra:Subscription|any;
  subscribItemAgregado:Subscription|any;
  nroDocumento:Number=0;
  constructor(private serviceItemCompra:ServiceItemCompra,private serviceUltimoNro:ServiceUltimoNro) { }
  ngOnDestroy(): void {
    if(this.nuevo==true){
      this.serviceUltimoNro.eliminarNroDocumento(this.nroDocumento,"ordencompra", 1);
    }
    if(this.subscribProducto!=undefined){
      this.subscribProducto.unsubscribe();
    }
    if(this.subscribOrdenCompra!=undefined){
      this.subscribOrdenCompra.unsubscribe();
    }
    if(this.subscribItemAgregado!=undefined){
      this.subscribItemAgregado.unsubscribe();
    }
  }
  ngOnInit(): void {

    this.subscribProducto=this.subjectProducto.subscribe(datos=>{
      this.subscribOrdenCompra=this.subjectOrdenCompra.subscribe(ordenCompra=>{
        var contador = 0;
        datos.forEach(itemsProducto=>{
          itemsProducto.ordencompra=ordenCompra;
          datos[contador]=itemsProducto;
          contador++;
        })
        this.serviceItemCompra.agregarItemOrdenCompra(datos);
        this.subscribItemAgregado = this.serviceItemCompra.listenerSubjectItemAgregado().subscribe(datos=>{
          console.log("entraaa")
          if(datos.respuesta=="exito"){
            var sino = confirm("Desea imprimir?")
            if(sino==true){
              this.serviceItemCompra.imprimir(ordenCompra.nrodoc);

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
    this.guardar = true;
    this.botones={'nuevo':this.nuevo,'cancelar':this.cancelar};
    this.crearDestruir ="destruir";
  }
  buttonGuardar(){
    this.recuperarItems=true;
    this.guardar = true;
    this.nuevo = false;
    this.cancelar = true;
  }
  guardarItemProductoSalida(){

  }
  productosObtener(productos:ModelItemOrdenCompra[]){
    this.subjectProducto.next(productos);

  }
  encabezadoObtener(encabezado:ModelOrdenCompra){
    this.subjectOrdenCompra.next(encabezado);
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
