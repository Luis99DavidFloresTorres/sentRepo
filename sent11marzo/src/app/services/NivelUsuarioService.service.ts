import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { mandarJson } from "../Models/AdministrarRutasBotonces.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { DescripcionNivelUsuario, ModelNivelUsuario } from "../Models/nivelUsuario.model";
import { UsuarioModel } from "../Models/UsuarioModel.model";

@Injectable({
  providedIn: "root"
})
export class ServiceNivelUsuario{
  baseUrl = environment.baseUrl;
  subjectUsuarioGestion = new Subject<UsuarioModel[]>();
  subjectNivelesUsuario = new Subject<ModelNivelUsuario[]>();
  subjectNivelesSubniveles = new Subject<ModelNivelUsuario>();
  constructor(private http: HttpClient){}
  buscarNivelesUsuarios(){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })

    this.http.get<ModelNivelUsuario[]>(this.baseUrl+'api/nivelUsuario/buscarNiveles',{headers:httpOptions})
    .subscribe((data)=>{
      console.log(data);
      var respuesta:ModelNivelUsuario[]|any = [];
      respuesta = data;
      this.subjectNivelesUsuario.next(respuesta);
    });
  }
  agregarNivelUsuario(mandarJson:mandarJson[]){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    this.http.post<any>(this.baseUrl+'api/nivelUsuario/addNiveles', mandarJson,{headers:httpOptions})
    .subscribe((data)=>{
      console.log(data);

    });
  } //findAll

  editarNivelUsuario(mandarJson:ModelNivelUsuario){
    console.log(mandarJson);
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    this.http.post<any>(this.baseUrl+'api/nivelUsuario/editar', mandarJson,{headers:httpOptions})
    .subscribe((data)=>{
      console.log(data);
    });
  }
  listenerNivelesUsuario(){
    return this.subjectNivelesUsuario.asObservable();
  }
}
