import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../Models/LoginResponse.model";
/*
@Injectable({
  providedIn: "root"
})
export class ServiceCodigoProducto{
  baseUrl = environment.baseUrl;
  subjectoMaximoCodigo = new Subject<Number>();
  constructor(private http:HttpClient){

  }
  retornarMaximoCodigo(codigo:String){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    var respuesta:LoginModel={respuesta:codigo}
    this.http.post<LoginModel>(this.baseUrl+'api/codigoProducto/returnId',respuesta,{headers:httpOptions}).subscribe(datos=>{

      var numero =parseInt(datos.respuesta.valueOf());
      console.log(numero);
      console.log(datos.respuesta.valueOf())
      console.log(datos.respuesta.toString())
      this.subjectoMaximoCodigo.next(numero);
    })
  }
  listenerMaximoCodigo(){
    return this.subjectoMaximoCodigo.asObservable();
  }
}
*/
