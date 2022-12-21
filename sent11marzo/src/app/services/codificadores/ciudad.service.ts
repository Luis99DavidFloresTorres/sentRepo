import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CiudadesModel } from "src/app/contenido/barra/codificador/ciudades/ciudades.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceCiudad{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private ciudades: CiudadesModel[]=[];
  private ciudadSubject = new Subject<CiudadesModel[]>();
  private ciudadId: CiudadesModel|any;
  private ciudadSubjectId = new Subject<CiudadesModel>();
  constructor(private http:HttpClient){

  }
  obtenerCiudades(){
    this.http.get<CiudadesModel[]>(this.baseUrl+'api/ciudad')
    .subscribe((data)=>{
      this.ciudades = data;
      this.ciudadSubject.next(this.ciudades);
    });
  }
  insertarCiudad(ciudad: CiudadesModel){
    this.http.post<CiudadesModel>(this.baseUrl+'api/ciudad/add', ciudad)
    .subscribe((data)=>{

    });
  }
  listenerDatosCiudad(){
    return this.ciudadSubject.asObservable();
  }
  obtenerCiudadId(id:String){
    this.http.get<CiudadesModel>(this.baseUrl+'api/ciudad/byId/'+id)
    .subscribe((data)=>{
      console.log(data);
      this.ciudadId = data;
      this.ciudadSubjectId.next(this.ciudadId);
    });
  }
  listenerDatosIdCiudad(){
    return this.ciudadSubjectId.asObservable();
  }

}
