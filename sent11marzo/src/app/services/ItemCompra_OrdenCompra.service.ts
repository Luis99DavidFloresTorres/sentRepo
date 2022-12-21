import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CotizProductoModel } from "../Models/CotizProducto.model";
import { ImprimirConsultas } from "../Models/ImprimirConsultaMetodo.model";
import { ModelItemOrdenCompra } from "../Models/ItemOrdenCompra";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ModelOrdenCompra } from "../Models/OrdenCompra";
import { ProveedorModel } from "../Models/proveedor.model";
@Injectable({
  providedIn: "root"
})
export class ServiceItemCompra_OrdenCompra{
  baseUrl = environment.baseUrl;
  sujetoProveedorOrdenCompra = new Subject<ModelItemOrdenCompra[]>();
  sujetoProveedorMayorCompra = new Subject<ItemProductoModel[]>();
  sujetoProveedorCotizaciones = new Subject<CotizProductoModel[]>();
  sujetoProveedorproductoOrdenCompra = new Subject<ModelItemOrdenCompra[]>();
  sujetoProveedorMayorProductoCompra = new Subject<ItemProductoModel[]>();
  sujetoProveedorProductoCotizacion = new Subject<CotizProductoModel[]>();
  constructor(private http:HttpClient){
  }
  ordenCompra(fecha1:Date, fecha2:Date, nombreProveedor:String){
    this.http.get<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'ordencompra/'+fecha1+'/'+fecha2+'/'+nombreProveedor).subscribe(data=>{
      var enviar:ModelItemOrdenCompra[]=[];
        for(var i =0; i<data.length;i++){
          if(data[i].ordencompra.nrocot==undefined){
            data[i].ordencompra.nrocot=0;
          }

          if(i>0){

            if(data[i].ordencompra.nrodoc==data[i-1].ordencompra.nrodoc){

              data[i].monto +=  data[i-1].monto;
              if(i==data.length-1){
                enviar.push(data[i]);
              }
            }else{

                enviar.push(data[i-1]);
                if(i==data.length-1){
                  enviar.push(data[i]);
                }
            }
          }
        }

        this.sujetoProveedorOrdenCompra.next(enviar);
    })
  }
  mayorCompra(fecha1:Date, fecha2:Date, nombreProveedor:String){
    console.log(fecha1,fecha2,nombreProveedor);
    this.http.get<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'compra/'+fecha1+'/'+fecha2+'/'+nombreProveedor).subscribe(data=>{

      var enviar:ItemProductoModel[]=[];
        for(var i =0; i<data.length;i++){
          if(data[i].transproducto.factura==undefined){
            data[i].transproducto.factura=0;
          }
          if(i>0){
            if(data[i].transproducto.nrodoc==data[i-1].transproducto.nrodoc){
              data[i].costoTotal +=  data[i-1].costoTotal;
              if(i==data.length-1){
                enviar.push(data[i]);
              }
            }else{
                enviar.push(data[i-1]);
            }
          }
        }
        this.sujetoProveedorMayorCompra.next(enviar);
    })
  }
  mayorCotizaciones(fecha1:Date, fecha2:Date, proveedor:ProveedorModel){
    this.http.post<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'cotizacionProveedor/'+fecha1+'/'+fecha2+'/', proveedor).subscribe(data=>{
      var enviar:CotizProductoModel[]=[];
      console.log(data);
        for(var i =0; i<data.length;i++){
          console.log(data[i]);
          /*if(data[i].ordencompra.nrocot==undefined){
            data[i].ordencompra.nrocot=0;
          }*/
          if(i>0){
            if(data[i].ordencompra.nrodoc==data[i-1].ordencompra.nrodoc){
              data[i].monto +=  data[i-1].monto;
              if(i==data.length-1){
                enviar.push(data[i]);
              }
            }else{
                enviar.push(data[i-1]);
            }
          }
        }

        if(data.length==1){
          enviar.push(data[0]);
        }
        console.log(enviar);
        this.sujetoProveedorCotizaciones.next(enviar);
    })
  }
  productoOrdenCompra(fecha1:Date, fecha2:Date, nombreProveedor:String){
    this.http.get<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'mayorProductosOrdenCompra/'+fecha1+'/'+fecha2+'/'+nombreProveedor).subscribe(data=>{

        this.sujetoProveedorproductoOrdenCompra.next(data);
    })
  }
  mayorProductoCompra(fecha1:Date, fecha2:Date, nombreProveedor:String){
    this.http.get<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'mayorProductosCompra/'+fecha1+'/'+fecha2+'/'+nombreProveedor).subscribe(data=>{
        this.sujetoProveedorMayorProductoCompra.next(data);
    })
  }
  productoCotizacion(fecha1:Date, fecha2:Date, nombreProveedor:String){
    this.http.get<any[]>(this.baseUrl+'api/itemcompra_ordencompra/tablas/'+'productosCotizacion/'+fecha1+'/'+fecha2+'/'+nombreProveedor).subscribe(data=>{
        this.sujetoProveedorProductoCotizacion.next(data);
    })
  }
  listenerProveedorOrdenCompra(){
    return this.sujetoProveedorOrdenCompra.asObservable();
  }
  listenerMayorCompra(){
    return this.sujetoProveedorMayorCompra.asObservable();
  }
  listenerMayorCotizaciones(){
    return this.sujetoProveedorCotizaciones.asObservable();
  }
  listenerProductoOrdenCompra(){
    return this.sujetoProveedorproductoOrdenCompra.asObservable();
  }
  listenerMayorProductoCompra(){
    return this.sujetoProveedorMayorProductoCompra.asObservable();
  }
  listenerProductoCotizacion(){
    return this.sujetoProveedorProductoCotizacion.asObservable();
  }
}
