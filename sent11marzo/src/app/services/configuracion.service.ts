import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../Models/LoginResponse.model";

/*@Injectable({
  providedIn: "root"
})
export class ServiceConfiguration{
  baseUrl = environment.baseUrl;
  subjectInsertar = new Subject<Number>();
  subjectLimpiar = new Subject<Number>();
  constructor(private http:HttpClient){}
  insertarCodigos(){
    var login:LoginModel = {respuesta:'ok'}
    this.http.post(this.baseUrl+'/api/configuration/insert',login).subscribe(dato=>{
      this.subjectInsertar.next();
    })
  }
  limpiarCodigos(){
    var login:LoginModel = {respuesta:'ok'}
    this.http.post(this.baseUrl+'/api/configuration/limpiar',login).subscribe(dato=>{
      this.subjectLimpiar.next();
    })
  }
  listenerInsertar(){
    return this.subjectInsertar.asObservable();
  }
  listenerLimpiar(){
    return this.subjectLimpiar.asObservable();
  }
}
*/
