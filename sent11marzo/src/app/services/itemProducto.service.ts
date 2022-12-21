import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";

import {LoginModel} from "../Models/LoginResponse.model";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ProductoModel } from "../Models/producto.model";
import { ClaseExportar } from "../Models/iInterface.model";
import { ModelCliente } from "../Models/Cliente.model";
@Injectable({
  providedIn: "root"
})
export class ServiceItemProducto{
  baseUrl = environment.baseUrl;

  private itemProductoID: ItemProductoModel|any;
  private itemProducto: ItemProductoModel[]=[];
  private itemProductobyIdSubject = new Subject<ItemProductoModel>();
  //private buscarFechaPeriodo : ItemProductoModel[]= [];
  //private buscarFechaPeriodoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2Fechas = new Subject<ItemProductoModel[]>();
  private itemProducto1000Primeros = new Subject<ItemProductoModel[]>();
  private itemProductoKardex = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorSalidas= new Subject<ItemProductoModel[]>();
  private itemProductoSeriales= new Subject<String[]>();
  private itemByTransproducto = new Subject<ItemProductoModel[]>();
  private buscarporFechasCliente = new Subject<ItemProductoModel[]>();
  private informeSalidaEntradaProducto = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasSalidas = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasKardex = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasSalidasProductos = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasIngresosProductos = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasKardexProductos= new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasProductoPeriodo= new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasProductoValorado = new Subject<ItemProductoModel[]>();
  constructor(private http:HttpClient){

  }
  obtenerProductos(){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto')
    .subscribe((data)=>{
      var itemP: ItemProductoModel[]|null;
      itemP=data;
      this.itemProductoSubject.next(itemP);
    });
  }
  obtenerPorPeriodo(fecha: string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/getOperaciones', fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo.next(vector);
    });
  }
  obtenerPorPeriodoEntre2Fechas(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperaciones/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2Fechas.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasProductoValorado(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperaciones/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasProductoValorado.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasSalidasProductos(fecha: string,fecha2:string, producto:ProductoModel){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperacionesSalidasProducto/${fecha}/${fecha2}`, producto)
    .subscribe((data)=>{
      console.log("Entraaaaa")
      console.log(data);
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasSalidasProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasIngresosProductos(fecha: string,fecha2:string, producto:ProductoModel){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperacionesIngresosProducto/${fecha}/${fecha2}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasIngresosProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasKardexProductos(fecha: string,fecha2:string,producto:ProductoModel){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperacionesKardexProducto/${fecha}/${fecha2}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasKardexProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasProductoPeriodo(fecha: string,fecha2:string, producto:ProductoModel){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperacionesProductoPeriodo/${fecha}/${fecha2}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasProductoPeriodo.next(vector);
    });
  }

  obtenerPorPeriodoEntre2FechasSalidas(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperaciones4/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasSalidas.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasIngresos(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperaciones3/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasIngresos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasKardex(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperacionesKardex/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasKardex.next(vector);
    });
  }
  informeSalidaEntrada(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/informeSalidaEntrada/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.informeSalidaEntradaProducto.next(vector);
    });
  }
  obtenerDistintosSeriales(){
    this.http.get<String[]>(this.baseUrl+'api/itemProducto/findSeriales')
    .subscribe((data)=>{
      var vector: String[]=data;
      this.itemProductoSeriales.next(vector);
    });
  }
  obtenerPorMayorIngresos(fecha: string, nombre: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/mayorIngresos', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      var vector: ItemProductoModel[]=data;
      this.itemProductoPorMayorIngresos.next(vector);
    });
  }
  obtener1000Primeros(){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/getPorFechas1000', { headers: httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]|any=data;
      this.itemProducto1000Primeros.next(vector);
    });
  }
  obtenerPorKardex(fecha: string, nombre: String){
    console.log(fecha)
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/kardex', objeto, {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      var vector: ItemProductoModel[]=data;
      this.itemProductoKardex.next(vector);
    });
  }
  obtenerPorMayorSalidas(fecha: string, nombre:String){
     const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/mayorSalidas', objeto,{headers:httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPorMayorSalidas.next(vector);
    });
  }
  obtenerbyIdItemProductos(id: String){
    this.http.get<ProductoModel>(this.baseUrl+'api/itemProducto/byId/'+id)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]|any=data;
      this.itemProductoPeriodo.next(vector);
    });
  }
  obtenerItemsByTransproducto(id:Number){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/byTransproducto/'+id).subscribe(datos=>{
      var items:ItemProductoModel[]= datos;
      this.itemByTransproducto.next(items);
    })
  }
  agregarItemProducto(producto:ItemProductoModel[]){
    producto.forEach(mostrar=>{
      console.log("product");
      console.log(mostrar);
    })
    this.http.post<LoginModel>(this.baseUrl+'api/itemProducto/add',producto)
    .subscribe((data)=>{
        console.log('respuesta = '+data.respuesta);
    });
  }
  entregaProductoPorCliente(fecha1:Date, fecha2:Date, modelCliente:ModelCliente){
    this.http.post<any[]>(this.baseUrl+'api/itemProducto/tablasEntregaporCliente/'+fecha1+'/'+fecha2+'/',modelCliente).subscribe(data=>{

        this.buscarporFechasCliente.next(data);
    })
  }
  listenerDatosItemProducto(){
    return this.itemProductoSubject;
  }
  listenerBuscarFecha(){
    return this.itemProductoSubject.asObservable();
  }
  listenerMayorIngresos(){
    return this.itemProductoPorMayorIngresos.asObservable();
  }
  listenerMayorSalidas(){
    return this.itemProductoPorMayorSalidas.asObservable();
  }
  listenerKardex(){
    return this.itemProductoKardex.asObservable();
  }
  listener1000Datos(){
    return this.itemProducto1000Primeros.asObservable();
  }
  listenerDatosItemProductoID(){
    return this.itemProductobyIdSubject;
  }
  listenerDatosItemProductoPeriodo(){
    return this.itemProductoPeriodo.asObservable();
  }

  listenerSeriales(){
    return this.itemProductoSeriales.asObservable();
  }
  listenerItemByTransproducto(){
    return this.itemByTransproducto.asObservable();
  }
  listeneritemProductoPeriodo2Fechas(){
    return this.itemProductoPeriodo2Fechas.asObservable();
  }
  listeneritemProductoPeriodo2FechasProductoValorado(){
    return this.itemProductoPeriodo2FechasProductoValorado.asObservable();
  }
  listeneritemProductoPeriodo2FechasSalidas(){
    return this.itemProductoPeriodo2FechasSalidas.asObservable();
  }
  listeneritemProductoPeriodo2FechasKardex(){
    return this.itemProductoPeriodo2FechasKardex.asObservable();
  }
  listeneritemProductoPeriodo2FechasIngresos(){
    return this.itemProductoPeriodo2FechasIngresos.asObservable();
  }
  listeneritemProductoPeriodo2FechasProductoPeriodo(){
    return this.itemProductoPeriodo2FechasProductoPeriodo.asObservable();
  }
  listeneritemProductoPeriodo2FechasSalidasProductos(){
    return this.itemProductoPeriodo2FechasSalidasProductos.asObservable();
  }
  listeneritemProductoPeriodo2FechasKardexProductos(){
    return this.itemProductoPeriodo2FechasKardexProductos.asObservable();
  }
  listeneritemProductoPeriodo2FechasIngresosProductos(){
    return this.itemProductoPeriodo2FechasIngresosProductos.asObservable();
  }
  listenerBuscarEntregasProductoPorCliente(){
    return this.buscarporFechasCliente.asObservable();
  }
  listenerInformeSalidaEntrada(){
    return this.informeSalidaEntradaProducto.asObservable();
  }
}
