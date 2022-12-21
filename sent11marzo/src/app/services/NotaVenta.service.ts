import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { mandarJson } from "../Models/AdministrarRutasBotonces.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { DescripcionNivelUsuario, ModelNivelUsuario } from "../Models/nivelUsuario.model";
import { ModelNotaventa } from "../Models/Notaventa.model";
import { UsuarioModel } from "../Models/UsuarioModel.model";

@Injectable({
  providedIn: "root"
})
export class ServiceNotaVenta{
  baseUrl = environment.baseUrl;
  notaventa = new Subject<ModelNotaventa[]>();
  sujetoventasporCliente = new Subject<ModelNotaventa[]>();
  constructor(private http:HttpClient){}
  obtenerNotasVenta(){
    this.http.get<ModelNotaventa[]>(this.baseUrl+"api/notaventa/obtenerNotasVenta").subscribe(data=>{
      var ModelNotaventa:ModelNotaventa[] = data;
      this.notaventa.next(ModelNotaventa);
    })
  }
  listenerNotaVenta(){
    return this.notaventa.asObservable();
  }
  ventasporCliente(fechaInicio:Date, fechaFinal:Date, nombreCliente:String){
    this.http.get<ModelNotaventa[]>(this.baseUrl+"api/notaventa/porCliente/"+fechaInicio+"/"+fechaFinal+"/"+nombreCliente).subscribe(data=>{
      var ModelNotaventa:ModelNotaventa[] = data;
      console.log(data);
      this.sujetoventasporCliente.next(ModelNotaventa);
    })
  }
  listenerVentasPorCliente(){
    return this.sujetoventasporCliente.asObservable();
  }
}
