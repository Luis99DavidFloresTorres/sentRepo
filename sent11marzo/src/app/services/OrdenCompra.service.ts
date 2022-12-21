import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelItemOrdenCompra } from "../Models/ItemOrdenCompra";
import { LoginModel } from "../Models/LoginResponse.model";
import { ModelOrdenCompra } from "../Models/OrdenCompra";
@Injectable({
  providedIn: "root"
})
export class ServiceOrdenCompra{
  baseUrl = environment.baseUrl;
  subjectOrdenCompraAll = new Subject<ModelOrdenCompra[]>();

  constructor(private http:HttpClient){
  }
  obtenerOrdenesCompra(){

    this.http.get<ModelOrdenCompra[]>(this.baseUrl+'api/ordencompra/findAll')
    .subscribe((data)=>{
       this.subjectOrdenCompraAll.next(data);
    });
  }
  listenerOrdenCompraAll(){
    return this.subjectOrdenCompraAll.asObservable();
  }
}
