import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceZona{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private zona: ZonaModel[]=[];
  zonaSubjectId = new Subject<ZonaModel>();
  private zonaSubject = new Subject<ZonaModel[]>();
  constructor(private http:HttpClient){

  }
  insertarZona(zona:ZonaModel){
    this.http.post<ZonaModel>(this.baseUrl+'api/zona/add', zona)
    .subscribe((data)=>{

    });
  }
  editarZona(zona:ZonaModel){
    this.http.post<ZonaModel>(this.baseUrl+'api/zona/editar', zona)
    .subscribe((data)=>{

    });
  }
  obtenerZonaId(id:String){
    this.http.get<ZonaModel>(this.baseUrl+'api/zona/findByIdZona/'+id)
    .subscribe((data)=>{

      this.zonaSubjectId.next(data);
    });
  }
  listenerDatosIdZona(){
    return this.zonaSubjectId.asObservable();
  }
  obtenerZonas(){
    this.http.get<ZonaModel[]>(this.baseUrl+'api/zona/find')
    .subscribe((data)=>{

      this.zonaSubject.next(data);
    });
    //return this.autoresLista.slice();
  }
  listenerDatosZona(){
    return this.zonaSubject.asObservable();
  }

}
