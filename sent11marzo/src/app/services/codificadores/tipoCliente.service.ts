import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tipoClienteModel } from "src/app/contenido/barra/codificador/tipos-cliente/tiposCliente.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceTipoCliente{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private tipoCliente: tipoClienteModel[]=[];
  private tipoClienteIdSubject = new Subject<tipoClienteModel>();
  private tipoClienteSubject = new Subject<tipoClienteModel[]>();
  constructor(private http:HttpClient){}
  agregar(tipoCliente: tipoClienteModel){
    this.http.post(this.baseUrl+'api/tipoCliente/add',tipoCliente)
    .subscribe((data)=>{});}
  obtenerPorId(id:string){
    this.http.get<tipoClienteModel>(this.baseUrl+'api/tipoCliente/byId/'+id)
    .subscribe((data)=>{
      this.tipoClienteIdSubject.next(data);
    });
  }
  obtenerTiposCliente(){
    this.http.get<tipoClienteModel[]>(this.baseUrl+'api/tipoCliente')
    .subscribe((data)=>{
      this.tipoClienteSubject.next(data);
    });
  }
  listenerDatosTipoCliente(){
    return this.tipoClienteSubject.asObservable();
  }
  listenertipoClienteId(){
    return this.tipoClienteIdSubject.asObservable();
  }
}
