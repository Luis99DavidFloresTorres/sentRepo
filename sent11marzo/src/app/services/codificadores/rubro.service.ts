import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RubroModel } from "src/app/contenido/barra/codificador/rubros/rubros.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceRubro{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private rubro: RubroModel[]=[];
  private rubroIdSubject = new Subject<RubroModel>();
  private rubroSubject = new Subject<RubroModel[]>();
  constructor(private http:HttpClient){

  }
  agregar(rubro: RubroModel){
    this.http.post(this.baseUrl+'api/rubro/add',rubro)
    .subscribe((data)=>{

    });
  }
  obtenerPorId(id:string){
    this.http.get<RubroModel>(this.baseUrl+'api/rubro/byId/'+id)
    .subscribe((data)=>{
      this.rubroIdSubject.next(data);
    });
  }
  obtenerRubros(){
    this.http.get<RubroModel[]>(this.baseUrl+'api/rubro')
    .subscribe((data)=>{

      this.rubroSubject.next(data);
    });
    //return this.autoresLista.slice();
  }
  listenerDatosRubro(){
    return this.rubroSubject.asObservable();
  }
  listenerRubroById(){
    return this.rubroIdSubject.asObservable();
  }

}
