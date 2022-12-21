import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CodigoEntity } from "src/app/Models/Codigo.model";
import { environment } from "src/environments/environment";
import { LoginModel } from "../../Models/LoginResponse.model";
/*
@Injectable({
  providedIn: "root"
})
export class ServiceCodigo{
  private subjectCodigo = new Subject<CodigoEntity[]>();
  private subjectInsertar = new Subject<CodigoEntity>();
  private subjectEditar = new Subject<CodigoEntity>();
  private subjectCodigoId = new Subject<CodigoEntity>();
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient){

  }
  obtenerAllCodigo(){
    this.http.get<CodigoEntity[]>(this.baseUrl+'api/codigo').subscribe(data=>{
        var objeto:CodigoEntity|any =[];
        objeto=data;
        this.subjectCodigo.next(objeto);
    })
  }
  insertarCodigo(codigo:CodigoEntity){
    this.http.post<CodigoEntity>(this.baseUrl+'api/codigo/add',codigo).subscribe(data=>{
        var objeto:CodigoEntity|any;
        objeto=data;
        this.subjectInsertar.next(objeto);
    })
  }
  editarCodigo(codigo:CodigoEntity){
    this.http.post<CodigoEntity>(this.baseUrl+'api/codigo/editar',codigo).subscribe(data=>{
        var objeto:CodigoEntity|any ;
        objeto=data;
        this.subjectEditar.next(objeto);
    })
  }

  obtenerById(id:String){
    this.http.get<CodigoEntity>(this.baseUrl+'api/codigo/ById/'+id).subscribe(data=>{
      var objeto:CodigoEntity|any =[];
      objeto=data;
      this.subjectCodigoId.next(objeto);
  })
  }
  listenerAllCodigo(){
    return this.subjectCodigo.asObservable();
  }
  listenerById(){
    return this.subjectCodigoId.asObservable();
  }
  listenerInsertar(){
    return this.subjectInsertar.asObservable();
  }
  listenerEditar(){
    return this.subjectEditar.asObservable();
  }
}
*/
