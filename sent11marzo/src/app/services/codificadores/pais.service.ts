import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PaisModel } from "src/app/contenido/barra/codificador/paises/pais.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServicePais{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private paisId: PaisModel | any;
  private paisIdSubject = new Subject<PaisModel>();
  private paisNombresSelect: String[] | any;
  private paisNombresSelectSubject = new Subject<String[]>();
  private pais: PaisModel[]=[];
  private paisSubject = new Subject<PaisModel[]>();
  constructor(private http:HttpClient){

  }
  obtenerPaises(){
    this.http.get<PaisModel[]>(this.baseUrl+'api/pais')
    .subscribe((data)=>{
      this.pais = data;
      this.paisSubject.next(this.pais);
    });
    //return this.autoresLista.slice();
  }
  eliminarPais(id:string){
    this.http.post(this.baseUrl+'api/pais/eliminar/'+id,0)
    .subscribe((data)=>{
      if(data=="exito"){
        window.location.reload();
      }
    });
  }
  obtenerPaisId(id: String){
    this.http.get<PaisModel>(this.baseUrl+'api/pais/byId/'+id)
    .subscribe((data)=>{
      this.paisId = data;
      this.paisIdSubject.next(this.paisId);
    });
    //return this.autoresLista.slice();
  }
  obtenerPaisNombresSelect(){
    this.http.get<String[]>(this.baseUrl+'api/pais/nombres')
    .subscribe((data)=>{
      this.paisNombresSelect = data;
      this.paisNombresSelectSubject.next(this.paisNombresSelect);
    });
  }
  agregarPais(pais: PaisModel){
    this.http.post(this.baseUrl+'api/pais/add',pais)
    .subscribe((data)=>{

    });
  }
  listenerDatosPais(){
    return this.paisSubject.asObservable();
  }
  listenerDatosPaisId(){
    return this.paisIdSubject.asObservable();
  }
  listenerDatosPaisesNombresSelect(){
    return this.paisNombresSelectSubject.asObservable();
  }
}
