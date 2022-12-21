import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ImprimirConsultas } from "../Models/ImprimirConsultaMetodo.model";
import { ItemProductoModel } from "../Models/itemProducto.model";

@Injectable({
  providedIn: "root"
})
export class ServiceImprimirConsulta{
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient){
  }
  public imprimirMayorIngresos(itemProducto:ItemProductoModel[]){
    this.http.post(this.baseUrl+"api/imprimirConsulta/mayorIngresos",itemProducto,{responseType: 'arraybuffer'}).subscribe(data =>{
      var imprimirConsulta:ImprimirConsultas  = new ImprimirConsultas();
      imprimirConsulta.downLoadFile(data, "application/vnd.ms-excel;charset=UTF-8");
    })
  }
  public imprimirMayorSalidas(itemProducto: ItemProductoModel[]){
    this.http.post(this.baseUrl+"api/imprimirConsulta/mayorSalidas",itemProducto,{responseType: 'arraybuffer'}).subscribe(data =>{
      var imprimirConsulta:ImprimirConsultas  = new ImprimirConsultas();
      imprimirConsulta.downLoadFile(data, "application/vnd.ms-excel;charset=UTF-8");
    })
  }
  public imprimirKardex(itemProducto: ItemProductoModel[]){
    this.http.post(this.baseUrl+"api/imprimirConsulta/kardex",itemProducto,{responseType: 'arraybuffer'}).subscribe(data =>{
      var imprimirConsulta:ImprimirConsultas  = new ImprimirConsultas();
      imprimirConsulta.downLoadFile(data, "application/vnd.ms-excel;charset=UTF-8");
    })
  }
  public productoPeriodo(itemProducto: ItemProductoModel[]){
    this.http.post(this.baseUrl+"api/imprimirConsulta/productoPeriodo",itemProducto,{responseType: 'arraybuffer'}).subscribe(data =>{
      var imprimirConsulta:ImprimirConsultas  = new ImprimirConsultas();
      imprimirConsulta.downLoadFile(data, "application/vnd.ms-excel;charset=UTF-8");//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    })
  }
  public datos1000(itemProducto: ItemProductoModel[]){
    this.http.post(this.baseUrl+"api/imprimirConsulta/primeros1000",itemProducto,{responseType: 'arraybuffer'}).subscribe(data =>{
      var imprimirConsulta:ImprimirConsultas  = new ImprimirConsultas();
      console.log("jkasjdkl")
      imprimirConsulta.downLoadFile(data, "application/vnd.ms-excel;charset=UTF-8");//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    })
  }
}
