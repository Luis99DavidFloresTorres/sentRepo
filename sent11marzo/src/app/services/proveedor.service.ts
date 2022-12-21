import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelCliente } from "../Models/Cliente.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { ProveedorModel } from "../Models/proveedor.model";


@Injectable({
  providedIn: "root"
})
export class ServiceProveedor{
  baseUrl = environment.baseUrl;
  subjectProveedor = new Subject<ProveedorModel[]>();
  subjectProveedorByName = new Subject<ProveedorModel>();
  sujetoGestionProveedor = new Subject<ProveedorModel>();
  sujetoMayorDeCompras = new Subject<ProveedorModel>();
  sujetoProveedorEntre2Fechas = new Subject<ProveedorModel[]>();
  sujetoMayorOrdenesCompras = new Subject<ProveedorModel>();
  sujetoMayorCotizaciones = new Subject<ProveedorModel>();
  sujetoProductoItemCompra = new Subject<ProveedorModel>();
  sujetoProductoOrdenCompra = new Subject<ProveedorModel>();
  sujetoProductoCotizacion = new Subject<ProveedorModel>();
  constructor(private http:HttpClient){
  }
  getEncontrarGestionProveedor(){
    return this.sujetoGestionProveedor;
  }
  getEncontrarMayorDeCompras(){
    return this.sujetoMayorDeCompras;
  }
  getEncontrarMayorOrdenesCompras(){
    return this.sujetoMayorOrdenesCompras;
  }
  getEncontrarMayorCotizaciones(){
    return this.sujetoMayorCotizaciones;
  }
  getEncontrarProductoItemCompra(){
    return this.sujetoProductoItemCompra;
  }
  getEncontrarProductoCotizacion(){
    return this.sujetoProductoCotizacion;
  }
  getEncontrarProductoOrdenCompra(){
    return this.sujetoProductoOrdenCompra;
  }
  allProveedores(){
    this.http.get<ProveedorModel[]>(this.baseUrl+'api/proveedor/all').subscribe(data=>{
        var proveedorAll:ProveedorModel[]|any=[];
        proveedorAll= data;
        this.subjectProveedor.next(data)
    })
  }
  findByName(nombre:String){
    var mandar:LoginModel={respuesta:nombre};
    this.http.post<ProveedorModel>(this.baseUrl+'api/proveedor/findByName/',mandar).subscribe(data=>{
      var proveedorAll:ProveedorModel|any;
      proveedorAll= data;
      this.subjectProveedorByName.next(data)
  })
  }
  proveedorEntre2Fechas(proveedor:ProveedorModel, fecha1:Date, fecha2:Date){
    this.http.post<ProveedorModel[]>(this.baseUrl+'api/proveedor/proveedor2fechas/'+fecha1+"/"+fecha2,proveedor).subscribe(data=>{
      var proveedorAll:ProveedorModel[]=[];
      proveedorAll= data;
      this.sujetoProveedorEntre2Fechas.next(data)

  })
  }
  listenerProveedor(){
    return this.subjectProveedor.asObservable();
  }
  listenerProveedorByName(){
    return this.subjectProveedorByName.asObservable();
  }
  listenerGestionProveedor(){
    return this.sujetoGestionProveedor.asObservable();
  }
  listenerMayorDeCompras(){
    return this.sujetoMayorDeCompras.asObservable();
  }
  listenerProveedorEntre2Fechas(){
    return this.sujetoProveedorEntre2Fechas.asObservable();
  }
  listenerMayorOrdenCompra(){
    return this.sujetoMayorOrdenesCompras.asObservable();
  }
  listenerMayorCotizaciones(){
    return this.sujetoMayorCotizaciones.asObservable();
  }
  listenerProductoOrdenCompra(){
    return this.sujetoProductoItemCompra.asObservable();
  }
  listenerProductoCotizacion(){
    return this.sujetoProductoCotizacion.asObservable();
  }
  listenerProductoItemOrdenCompra(){
    return this.sujetoProductoOrdenCompra.asObservable();
  }
}
