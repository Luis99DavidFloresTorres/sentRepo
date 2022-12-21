import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tipoGastoModel } from "src/app/contenido/barra/codificador/tipos-gasto/tipoGasto.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceTipoGasto{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private gastos: tipoGastoModel[]=[];
  private tipoGastoIdSubject = new Subject<tipoGastoModel>();
  private gastoSubject = new Subject<tipoGastoModel[]>();
  constructor(private http:HttpClient){

  }
  agregar(gasto:tipoGastoModel){
    this.http.post(this.baseUrl+'api/tipoGasto/add',gasto)
    .subscribe((data)=>{});
  }
  obtenerPorId(id:String){
    this.http.get<tipoGastoModel>(this.baseUrl+'api/tipoGasto/byId/'+id)
    .subscribe((data)=>{
      this.tipoGastoIdSubject.next(data);
    });
  }
  obtenerGastos(){
    this.http.get<tipoGastoModel[]>(this.baseUrl+'api/tipoGasto')
    .subscribe((data)=>{
      this.gastos = data;
      this.gastoSubject.next(this.gastos);
    });
    //return this.autoresLista.slice();
  }
  listenerDatosGasto(){
    return this.gastoSubject.asObservable();
  }
  listenerPorId(){
    return this.tipoGastoIdSubject.asObservable();
  }
}
