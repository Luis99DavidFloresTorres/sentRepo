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
export class ServiceItemCompra{
  baseUrl = environment.baseUrl;
  subjectItemCompraGuardar = new Subject<LoginModel>();
  subjectByOrdenCompra = new Subject<ModelItemOrdenCompra[]>();
  subjectFechasProducto = new Subject<ModelItemOrdenCompra[]>();
  itemsOrdenCompra = new Subject<ModelItemOrdenCompra[]>();
  constructor(private http:HttpClient){
  }
  agregarItemOrdenCompra(producto:ModelItemOrdenCompra[]){
    producto.forEach(mostrar=>{
      console.log("product");
      console.log(mostrar);
    })
    this.http.post<LoginModel>(this.baseUrl+'api/itemCompra/add',producto)
    .subscribe((data)=>{
       // console.log('respuesta = '+data.respuesta);
       this.subjectItemCompraGuardar.next(data);
    });
  }
  imprimir(nrodoc:Number){
    this.http.get(this.baseUrl+'api/itemCompra/imprimir/'+nrodoc, {responseType: 'arraybuffer'}).subscribe(response=>{

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
  findByOrdenCompra(id:Number){
    this.http.get<ModelItemOrdenCompra[]>(this.baseUrl+'api/itemCompra/byOrdenCompra/'+id).subscribe(data=>{
      var items:ModelItemOrdenCompra[] = data;
      this.subjectByOrdenCompra.next(items);
    })
  }
  fechasProducto(fecha1:Date,fecha2:Date,nombre:String){
    this.http.get<ModelItemOrdenCompra[]>(this.baseUrl+'api/itemCompra/fechasP/'+fecha1+'/'+fecha2+"/"+nombre).subscribe(data=>{
      var items:ModelItemOrdenCompra[] = data;
      console.log(data);
      this.subjectFechasProducto.next(items);
    })
  }
  findByNotaventa(id:Number){
    this.http.get<ModelItemOrdenCompra[]>(this.baseUrl+'api/itemCompra/byOrdenCompra/'+id).subscribe(data=>{
       var items:ModelItemOrdenCompra[] = data;
       this.itemsOrdenCompra.next(items);
     })

   }
  listenerSubjectItemAgregado(){
    return this.subjectItemCompraGuardar.asObservable();
  }
  listenerByOrdenCompra(){
    return this.subjectByOrdenCompra.asObservable();
  }
  listenerFechasProducto(){
    return this.subjectFechasProducto.asObservable();
  }
  listenerItemsVentaByNotaventa(){
    return this.itemsOrdenCompra.asObservable();
  }
}
