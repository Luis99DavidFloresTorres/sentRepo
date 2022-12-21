import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelCliente } from "../Models/Cliente.model";
import { ModelItemnotaventa } from "../Models/Itemnotaventa.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { ModelNotaventa } from "../Models/Notaventa.model";

import  {  saveAs  }  from  'file-saver' ;
@Injectable({
  providedIn: "root"
})
export class ServiceItemnotaventa{
  baseUrl = environment.baseUrl;
  subjectAgregar = new Subject<LoginModel>();
  subjectFechasProducto=new Subject<ModelItemnotaventa[]>();
  itemsVentaByNotaventa= new Subject<ModelItemnotaventa[]>();

  constructor(private http:HttpClient){
  }
  agregar(itemnotaventa:ModelItemnotaventa[]){
    this.http.post<LoginModel>(this.baseUrl+'api/itemnotaventa/add',itemnotaventa).subscribe(data=>{
      this.subjectAgregar.next(data);
    })
  }
  imprimir(nrodoc:Number){
    this.http.get(this.baseUrl+'api/itemnotaventa/imprimir/'+nrodoc, {responseType: 'arraybuffer'}).subscribe(response=>{

      // url donde se encontró
      //https://www.it-swarm-es.com/es/angular/como-descargar-un-archivo-de-httpclient/805916122/

      this.downLoadFile(response, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8")//, contentType: 'application/application/vnd.ms-excel'
      location.reload();
    })
  }
  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
  findByNotaventa(id:Number){
   this.http.get<ModelItemnotaventa[]>(this.baseUrl+'api/itemnotaventa/byNotaventa/'+id).subscribe(data=>{
      var items:ModelItemnotaventa[] = data;
      this.itemsVentaByNotaventa.next(items);
    })

  }
  fechasProducto(fecha1:Date,fecha2:Date,nombre:String){
    this.http.get<ModelItemnotaventa[]>(this.baseUrl+'api/itemnotaventa/fechasP/'+fecha1+'/'+fecha2+"/"+nombre).subscribe(data=>{
      var items:ModelItemnotaventa[] = data;
      console.log(data);
      this.subjectFechasProducto.next(items);
    })
  }
  listenerItemsVentaByNotaventa(){
    return this.itemsVentaByNotaventa.asObservable();
  }
  listenerSubjectItemAgregado(){
    return this.subjectAgregar.asObservable();
  }
  listenerFechasProducto(){
    return this.subjectFechasProducto.asObservable();
  }
}
