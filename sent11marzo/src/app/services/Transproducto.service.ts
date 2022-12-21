import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscriber, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../Models/LoginResponse.model";
import { ModelTransproducto } from "../Models/Transproducto.model";


@Injectable({
  providedIn: "root"
})
export class ServiceTransproducto{
  baseUrl = environment.baseUrl;
  private crearNroVentasSubject = new Subject<String>();  //loginModel es usado como objeto de transferencia para datos simples como numeros o strings
  private entradasProducto = new Subject<ModelTransproducto[]>();
  private salidasProducto= new Subject<ModelTransproducto[]>();

  constructor(private http:HttpClient){}
  obtenerEntradasProducto(){
    this.http.get<ModelTransproducto[]>(this.baseUrl+"api/transproducto/entradasProducto").subscribe(data=>{
      var ModelTransproducto:ModelTransproducto[]=data;
      this.entradasProducto.next(ModelTransproducto);
    })

  }
  obtenerSalidasProducto(){
    this.http.get<ModelTransproducto[]>(this.baseUrl+"api/transproducto/salidasProducto").subscribe(data=>{
      var ModelTransproducto:ModelTransproducto[]=data;
      this.salidasProducto.next(ModelTransproducto);
    })
  }
  listenerEntradasProducto(){
    return this.entradasProducto.asObservable();
  }
  listenerSalidasProducto(){
    return this.salidasProducto.asObservable();
  }
}
