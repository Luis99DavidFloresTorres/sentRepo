import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UnidadModel } from "src/app/contenido/barra/codificador/unidades/unidad.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceUnidad{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private unidad: UnidadModel[]=[];
  private unidadSubject = new Subject<UnidadModel[]>();
  private unidadId=new Subject<UnidadModel>();
  constructor(private http:HttpClient){

  }
  agregar(unidad:UnidadModel){
    this.http.post(this.baseUrl+'api/unidad/add',unidad)
    .subscribe((data)=>{});
  }
  obtenerById(id:String){
    this.http.get<UnidadModel>(this.baseUrl+'api/unidad/byId/'+id)
    .subscribe((data)=>{
      this.unidadId.next(data);
    });
  }
  obtenerUnidades(){
    this.http.get<UnidadModel[]>(this.baseUrl+'api/unidad')
    .subscribe((data)=>{
      this.unidad = data;
      this.unidadSubject.next(this.unidad);
    });
    //return this.autoresLista.slice();
  }
  listenerDatosUnidad(){
    return this.unidadSubject;
  }
  listenerById(){
    return this.unidadId.asObservable();
  }
}
