import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelItemAsigna } from "../Models/ItemAsigna.model";
import { ModelNotaAsigna } from "../Models/NotaAsigna.model";

@Injectable({
  providedIn: "root"
})
export class ServiceItemAsigna{
  baseUrl = environment.baseUrl;
  subjectItemsAsigna = new Subject<ModelItemAsigna[]>();
  subjectAsignacionItems = new Subject<ModelItemAsigna[]>();
  constructor(private http:HttpClient){
  }
  obtenerItemsPorNotaAsigna(nota:ModelNotaAsigna){
    this.http.post<ModelItemAsigna[]>(this.baseUrl+'api/itemasigna/porNota',nota).subscribe(data=>{
        this.subjectItemsAsigna.next(data);
    })
  }
  obtenerItemsPorAsignacionHerramienta(nota:ModelNotaAsigna){
    this.http.post<ModelItemAsigna[]>(this.baseUrl+'api/itemasigna/porNota',nota).subscribe(data=>{
        this.subjectAsignacionItems.next(data);
    })
  }
  listenerItemsPorNotaAsigna(){
    return this.subjectItemsAsigna.asObservable();
  }
  listenerItemsAsignacionHerramienta(){
    return this.subjectAsignacionItems.asObservable();
  }
}
