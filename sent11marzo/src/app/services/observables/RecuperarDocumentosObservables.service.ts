import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ModelItemnotaventa } from "src/app/Models/Itemnotaventa.model";
import { ModelItemOrdenCompra } from "src/app/Models/ItemOrdenCompra";
import { ItemProductoModel } from "src/app/Models/itemProducto.model";
import { ModelItemProyecto } from "src/app/Models/ItemProyecto.model";
import { ModelNotaventa } from "src/app/Models/Notaventa.model";
import { ModelOrdenCompra } from "src/app/Models/OrdenCompra";

@Injectable({
  providedIn: "root"
})
export class ServiceRecuperarDocumentosObservables{
  private sujetoEntrada_Entrada = new Subject<ItemProductoModel[]>();
  private sujetoEntrada_Salida = new Subject<ItemProductoModel[]>();
  private sujetoSalida_Entrada = new Subject<ItemProductoModel[]>();
  private sujetoSalida_Salida = new Subject<ItemProductoModel[]>();
  private sujetoCotizacion_Salida = new Subject<ModelItemProyecto[]>();
  private sujetoNotaventa_Salida = new Subject<ModelItemnotaventa[]>();
  private sujetoOrdenCompra_Entrada= new Subject<ModelItemOrdenCompra[]>();
  private sujetoCotizacion_NotaVenta= new Subject<ModelItemProyecto[]>();
  //proyecto
  private sujetoNotaVenta_Proyecto = new Subject<ModelItemnotaventa[]>();
  private sujetoProyecto_Proyecto = new Subject<ModelItemProyecto[]>();
  private sujetoOrdenCompra_Proyecto= new Subject<ModelItemOrdenCompra[]>();
  constructor(){
  }
  nextEntrada_Entrada(items:ItemProductoModel[]){
    this.sujetoEntrada_Entrada.next(items);
  }
  listenerSujetoEntrada_Entrada(){
    return this.sujetoEntrada_Entrada.asObservable();
  }
  nextEntrada_Salida(items:ItemProductoModel[]){
    this.sujetoEntrada_Salida.next(items);
  }
  listenerSujetoEntrada_Salida(){
    return this.sujetoEntrada_Salida.asObservable();
  }
  nextSalida_Entrada(items:ItemProductoModel[]){
    this.sujetoSalida_Entrada.next(items);
  }
  listenerSujetoSalida_Entrada(){
    return this.sujetoSalida_Entrada.asObservable();
  }
  nextSalida_Salida(items:ItemProductoModel[]){
    this.sujetoSalida_Salida.next(items);
  }
  listenerSujetoSalida_Salida(){
    return this.sujetoSalida_Salida.asObservable();
  }
  nextNotaVenta_Salida(items:ModelItemnotaventa[]){
    this.sujetoNotaventa_Salida.next(items);
  }
  listenerSujetoNotaVenta_Salida(){
    return this.sujetoNotaventa_Salida.asObservable();
  }
  nextProyecto_Salida(items:ModelItemProyecto[]){
    this.sujetoCotizacion_Salida.next(items);
  }
  listenerSujetoProyecto_Salida(){
    return this.sujetoCotizacion_Salida.asObservable();
  }
  nextOrdenCompra_Entrada(items:ModelItemOrdenCompra[]){
    this.sujetoOrdenCompra_Entrada.next(items);
  }
  listenerSujetoOrdenCompra_Entrada(){
    return this.sujetoOrdenCompra_Entrada.asObservable();
  }
  nextProyecto_NotaVenta(items:ModelItemProyecto[]){
    return this.sujetoCotizacion_NotaVenta.next(items);
  }
  listenerSujetoProyecto_NotaVenta(){
    return this.sujetoCotizacion_NotaVenta.asObservable();
  }
  nextNotaVenta_Proyecto(items:ModelItemnotaventa[]){
    this.sujetoNotaVenta_Proyecto.next(items);
  }
  listenerSujetoNotaVenta_Proyecto(){
    return this.sujetoNotaVenta_Proyecto.asObservable();
  }
  nextProyecto_Proyecto(items:ModelItemProyecto[]){
    this.sujetoProyecto_Proyecto.next(items);
  }
  listenerSujetoProyecto_Proyecto(){
    return this.sujetoProyecto_Proyecto.asObservable();
  }
  nextOrdenCompra_Proyecto(items:ModelItemOrdenCompra[]){
    this.sujetoOrdenCompra_Proyecto.next(items);
  }
  listenerSujetoOrdenCompra_Proyecto(){
    return this.sujetoOrdenCompra_Proyecto.asObservable();
  }
}
