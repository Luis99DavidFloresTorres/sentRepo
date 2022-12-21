import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ActivoFijoModel } from "../Models/ActivoFijo.model";
import { ModelCliente } from "../Models/Cliente.model";
import { LoginModel } from "../Models/LoginResponse.model";

@Injectable({
  providedIn: "root"
})
export class ServiceActivoFijo{

  baseUrl = environment.baseUrl;
  subjectoHerramientasNombre = new Subject<ActivoFijoModel[]>();
  subjectHerramienta = new Subject<ActivoFijoModel>();
  constructor(private http:HttpClient){
  }
  getSubjectHerramienta(){
    return this.subjectHerramienta;
  }
  listenerHerramienta(){
    return this.subjectHerramienta.asObservable();
  }
  herramientasPorNombre(){
    this.http.get<ActivoFijoModel[]>(this.baseUrl+'api/activoFijo/herramientas').subscribe(data=>{

        this.subjectoHerramientasNombre.next(data)
    })
  }
  listenerHerramientasPorNombre(){
    return this.subjectoHerramientasNombre.asObservable();
  }
}
