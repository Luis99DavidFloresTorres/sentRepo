import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";

import { ItemProyectoComponent } from "../contenido/barra/item-proyecto/item-proyecto.component";
import { ItemProyectoModel } from "../contenido/barra/item-proyecto/itemProyecto.model";
import { ModelCotizacionProyecto } from "../Models/CotizacionProyecto.model";
import { ModelItemProyecto } from "../Models/ItemProyecto.model";
import { LoginModel } from "../Models/LoginResponse.model";

@Injectable({
  providedIn: "root"
})
export class ServiceItemProyecto{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private itemProyectoID: ItemProyectoModel|any;
  private itemProyecto: ItemProyectoModel[]=[];
  private itemProyectobyIdSubject = new Subject<ItemProyectoModel>();
  private itemProyectoSubject = new Subject<ItemProyectoModel[]>();
  private itemsByProyect= new Subject<ModelItemProyecto[]>(); // modelitem proyecto es el modelo de proyecto
  itemsProyectoSubject = new Subject<ModelItemProyecto[]>();
  subjectFechasProducto = new Subject<ModelItemProyecto[]>();
  resultadoPresumible = new Subject<ModelCotizacionProyecto>();
  entregaProductoPorFecha = new Subject<any[]>();
  constructor(private http:HttpClient){}
  obtenerProyectos(){
    this.http.get<ItemProyectoModel[]>(this.baseUrl+'api/itemProyecto')
    .subscribe((data)=>{
      this.itemProyecto=data;
      this.itemProyectoSubject.next(this.itemProyecto);
    });
  }
  agregar(itemProyectoP:ModelItemProyecto[]){
    this.http.post<LoginModel>(this.baseUrl+'api/itemProyecto/add',itemProyectoP).subscribe(data=>{
        data.respuesta;
        window.location.reload();
    })
  }
  obtenerByProyecto(id:Number){
    this.http.get<ModelItemProyecto[]>(this.baseUrl+'api/itemProyecto/byProyecto/'+id).subscribe(data=>{
        this.itemsByProyect.next(data);
    })
  }
  entregaProductoFecha(fecha1:Date, fecha2:Date){
    console.log(fecha1)
    console.log(fecha2)
    this.http.get<any[]>(this.baseUrl+'api/itemProyecto/entreFechasProductos/'+fecha1+'/'+fecha2).subscribe(data=>{
      console.log(data);
      this.entregaProductoPorFecha.next(data);
  })
  }
  resultadoPresumibleProyecto(id:Number){
    this.http.get<any>(this.baseUrl+'api/itemProyecto/resultadoPresumibleProyecto/'+id).subscribe(data=>{
      this.resultadoPresumible.next(data);
  })
  }
  fechasProducto(fecha1:Date,fecha2:Date,nombre:String){
    this.http.get<ModelItemProyecto[]>(this.baseUrl+'api/itemProyecto/fechasP/'+fecha1+'/'+fecha2+"/"+nombre).subscribe(data=>{
      var items:ModelItemProyecto[] = data;
      console.log(data);
      this.subjectFechasProducto.next(items);
    })
  }

  listenerByProyecto(){
    return this.itemsByProyect.asObservable();
  }
  listenerDatosItemProyecto(){
    return this.itemProyectoSubject.asObservable();
  }
  listenerFechasProducto(){
    return this.subjectFechasProducto.asObservable();
  }
  listenerResultadoPresumibleProyecto(){
    return this.resultadoPresumible.asObservable();
  }
  listenerEntregaProductoFecha(){
    return this.entregaProductoPorFecha.asObservable();
  }
}
