import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelCliente } from "../Models/Cliente.model";
import { LoginModel } from "../Models/LoginResponse.model";

@Injectable({
  providedIn: "root"
})
export class ServiceCliente{
  baseUrl = environment.baseUrl;
  subjectoAllClientes = new Subject<ModelCliente[]>();
  subjectoclienteByName = new Subject<ModelCliente>();
  subjectoencontrarGestionCliente= new Subject<ModelCliente>();
  sujetoEntregaProductoPorCliente = new Subject<ModelCliente>();
  sujetoEntregaVentasporCliente = new Subject<ModelCliente>();
  constructor(private http:HttpClient){
  }
  getEncontrarGestionCliente(){
    return this.subjectoencontrarGestionCliente;
  }
  getEncontrarEntregaProductoPorCliente(){
    return this.sujetoEntregaProductoPorCliente;
  }
  getEncontrarVentasporCliente(){
    return this.sujetoEntregaVentasporCliente;
  }
  allClientes(){

    this.http.get<ModelCliente[]>(this.baseUrl+'api/cliente/all').subscribe(data=>{
        var clienteAll:ModelCliente[]|any=[];
        clienteAll= data;
        this.subjectoAllClientes.next(data)
    })
  }
  obtenerClientePorNombre(nombre:String){
    console.log(nombre);
    var mandar:LoginModel={respuesta:nombre};
    this.http.post<ModelCliente>(this.baseUrl+'api/cliente/byName',mandar).subscribe(data=>{
      var cliente:ModelCliente|any;
      cliente= data;
      this.subjectoclienteByName.next(data)
    })
  }
  listenerAllClientes(){
    return this.subjectoAllClientes.asObservable();
  }
  listenerClienteByName(){
    return this.subjectoclienteByName.asObservable();
  }
  listenerEncontrarGestionCliente(){
    return this.subjectoencontrarGestionCliente.asObservable();
  }
  listenerEncontrarProductoPorCliente(){
    return this.sujetoEntregaProductoPorCliente.asObservable();
  }
  listenerEncontrarVentasPorCliente(){
    return this.sujetoEntregaVentasporCliente.asObservable();
  }
}
