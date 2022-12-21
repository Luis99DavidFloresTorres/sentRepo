import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ModelTransproducto } from 'src/app/Models/Transproducto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-entrada-producto',
  templateUrl: './entrada-producto.component.html',
  styleUrls: ['./entrada-producto.component.css']
})
export class EntradaProductoComponent implements OnInit,OnDestroy {
  nuevo = false;
  guardar=true;
  cancelar = true;
  recuperarItems=false;
  inicio = 0;
  botones = {'nuevo':this.nuevo,'cancelar':this.cancelar};
  crearDestruir = "neutro";
  subjectProducto = new Subject<ItemProductoModel[]>();
  subjectTransproducto = new Subject<ModelTransproducto>();
  subscribProducto : Subscription|any;
  subscribTransproducto:Subscription|any;

  eliminarDocumento:String="";
  nroDocumento:Number = 0;
  operacion:Number = 0;

  constructor(private serviceItemProducto:ServiceItemProducto, private serviceUltimoNro: ServiceUltimoNro, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables) { }

  ngOnDestroy(): void {
    if(this.nuevo==true){

      this.serviceUltimoNro.eliminarNroDocumento(this.nroDocumento,"entrada", this.operacion);

    }
    if(this.subscribProducto!=undefined){
      this.subscribProducto.unsubscribe();
    }
    if(this.subscribTransproducto!=undefined){
      this.subscribTransproducto.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.subscribProducto = this.subjectProducto.subscribe(datos=>{
     this.subscribTransproducto= this.subjectTransproducto.subscribe(transproducto=>{
        var contador = 0;
        datos.forEach(itemsProducto=>{
          itemsProducto.transproducto=transproducto;

          datos[contador]=itemsProducto;
          contador++;
        })
        this.serviceItemProducto.agregarItemProducto(datos);
        location.reload();
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
    this.cancelar = true;
    this.guardar = true;
    this.nuevo = false;

  }

  guardarItemProductoEntrada(){

  }
  productosObtener(productos:ItemProductoModel[]){
    this.subjectProducto.next(productos);

  }
  encabezadoObtener(encabezado:ModelTransproducto){
    this.subjectTransproducto.next(encabezado);
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
  operacionDestruir(operacion:Number){
    this.operacion=operacion;
  }
}
