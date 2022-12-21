import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ProductoModel } from "../Models/producto.model";

import { ClaseDepositoExportar } from "../Models/ExportarDeposito.model";
import { ExportarOperacion } from "../Models/ExportarOperacion.model";
import { ClaseExportar } from "../Models/iInterface.model";
@Injectable({
  providedIn: "root"
})
export class ServiceItemDeposito{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private itemProductoID: ItemProductoModel|any;
  private itemProducto: ItemProductoModel[]=[];
  private itemProductobyIdSubject = new Subject<ItemProductoModel>();
  //private buscarFechaPeriodo : ItemProductoModel[]= [];
  //private buscarFechaPeriodoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo = new Subject<ItemProductoModel[]>();
  private itemProductoKardex = new Subject<ItemProductoModel[]>();
  private datos1000PorFechaYDeposito = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorSalidas= new Subject<ItemProductoModel[]>();
  private itemProductoOperacion = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2Fechas = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasKardex = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasSalidas = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasSalidasProductos = new Subject<ItemProductoModel[]|any[]>();
  private itemProductoPeriodo2FechasIngresosProductos = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasKardexProductos= new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2FechasProductoPeriodo= new Subject<ItemProductoModel[]>();
  constructor(private http:HttpClient){

  }
  obtenerProductos(){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto')
    .subscribe((data)=>{
      this.itemProducto=data;
      this.itemProductoSubject.next(this.itemProducto);
    });
  }
  obtenerPorMayorIngresos(fecha: string, nombre: String, nombreDeposito: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre, depositoNombre: nombreDeposito}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/mayorIngresos', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      this.itemProducto=data;
      console.log(data);
      this.itemProductoPorMayorIngresos.next(this.itemProducto);
    });
  }
  obtenerPorKardex(fecha: string, nombre: String, nombreDeposito:String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre,depositoNombre:nombreDeposito}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/kardexDeposito', objeto, {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      this.itemProducto=data;
      this.itemProductoKardex.next(this.itemProducto);
    });
  }
  obtenerPorMayorSalidas(fecha: string, nombre:String, nombreDeposito:String){
     const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre, depositoNombre: nombreDeposito};
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/mayorSalidas', objeto,{headers:httpOptions})
    .subscribe((data)=>{
      var itemProducto:ItemProductoModel[]=data;
      this.itemProductoPorMayorSalidas.next(itemProducto);
    });
  }
  obtenerbyIdItemProductos(id: String){
    this.http.get<ProductoModel>(this.baseUrl+'api/itemDepositoProducto/byId/'+id)
    .subscribe((data)=>{
      this.itemProductoID=data;
      this.itemProductoPeriodo.next(this.itemProductoID);
    });
    //return this.autoresLista.slice();
  }
  obtenerPorOperaciones(fecha: string, operacion: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ExportarOperacion={fecha:fecha,operacion:operacion}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/operaciones', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      this.itemProducto=data;
      this.itemProductoOperacion.next(this.itemProducto);
    });
  }
  obtener1000DatosPorFechaYDeposito(){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
   // const objeto: ExportarOperacion={fecha:fecha,operacion:operacion}
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/getPorFechas1000')
    .subscribe((data)=>{
      console.log(data)
      this.datos1000PorFechaYDeposito.next(data);
    });
  }
  obtenerPorPeriodoEntre2Fechas(fecha: string,fecha2:string,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperaciones/${fecha}/${fecha2}/${depositoNombre}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2Fechas.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasSalidas(fecha: string,fecha2:string,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperaciones4/${fecha}/${fecha2}/${depositoNombre}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasSalidas.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasIngresos(fecha: string,fecha2:string,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperaciones3/${fecha}/${fecha2}/${depositoNombre}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasIngresos.next(vector);
    });
  }

  obtenerPorPeriodoEntre2FechasKardex(fecha: string,fecha2:string,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperacionesKardex/${fecha}/${fecha2}/${depositoNombre}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasKardex.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasSalidasProductos(fecha: string,fecha2:string, producto:ProductoModel,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperacionesSalidasProducto/${fecha}/${fecha2}/${depositoNombre}`, producto)
    .subscribe((data)=>{
      console.log("Entraaaaa")
      console.log(data);
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasSalidasProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasIngresosProductos(fecha: string,fecha2:string, producto:ProductoModel,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperacionesIngresosProducto/${fecha}/${fecha2}/${depositoNombre}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasIngresosProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasKardexProductos(fecha: string,fecha2:string,producto:ProductoModel,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperacionesKardexProducto/${fecha}/${fecha2}/${depositoNombre}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasKardexProductos.next(vector);
    });
  }
  obtenerPorPeriodoEntre2FechasProductoPeriodo(fecha: string,fecha2:string, producto:ProductoModel,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperacionesProductoPeriodo/${fecha}/${fecha2}/${depositoNombre}`, producto)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2FechasProductoPeriodo.next(vector);
    });
  }
  listenerProductoPeriodo2Fechas(){
    return this.itemProductoPeriodo2Fechas.asObservable();
  }
  listenerProductoPeriodo2FechasIngresos(){
    return this.itemProductoPeriodo2FechasIngresos.asObservable();
  }
  listenerProductoPeriodo2FechasSalidas(){
    return this.itemProductoPeriodo2FechasSalidas.asObservable();
  }
  listenerProductoPeriodo2FechasKardex(){
    return this.itemProductoPeriodo2FechasKardex.asObservable();
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
  listenerDatosItemProductoID(){
    return this.itemProductobyIdSubject;
  }
  listenerDatosItemProductoPeriodo(){
    return this.itemProductoPeriodo.asObservable();
  }
  listenerOperaciones(){
    return this.itemProductoOperacion.asObservable();
  }
  listener1000PorFechaYDeposito(){
    return this.datos1000PorFechaYDeposito.asObservable();
  }
  agregarItemProducto(producto:ItemProductoModel){
    this.http.post(this.baseUrl+'api/producto/add',producto)
    .subscribe((data)=>{

    });
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
}
