import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CotizacionModel } from "../Models/Cotizacion.model";


@Injectable({
  providedIn: "root"
})
export class ServiceCotizacionCliente{
  baseUrl = environment.baseUrl;
  sujetoCotizacion = new Subject<CotizacionModel[]>();
  constructor(private http:HttpClient){}
  productoOrdenCompra(fecha1:Date, fecha2:Date, nombreCliente:String){
    this.http.get<any[]>(this.baseUrl+'api/cotizacion/'+fecha1+'/'+fecha2+'/'+nombreCliente).subscribe(data=>{

        this.sujetoCotizacion.next(data);
    })
  }
  listenerCotizacion(){
    return this.sujetoCotizacion.asObservable();
  }
}
