import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { DerechosModel } from "../Models/Derechos.model";
import { LoginModel } from "../Models/LoginResponse.model";
import { DescripcionNivelUsuario, MandarUsuarioAgregarNivelUsuario, ModelNivelUsuario, UsuarioJson } from "../Models/nivelUsuario.model";
import { UsuarioModel } from "../Models/UsuarioModel.model";

@Injectable({
  providedIn: "root"
})
export class ServiceUsuario{
  baseUrl = environment.baseUrl;
  subjectRespuestaLogin = new Subject<LoginModel>();
  subjectUsuarioGestion = new Subject<UsuarioModel[]>();
  subjectNivelesSubniveles = new Subject<ModelNivelUsuario>();
  subjectUsuarioRegistrado = new Subject<UsuarioModel>();
  subjectEditarNivel = new Subject<ModelNivelUsuario>();
  subjectNivelUsuario = new Subject<DerechosModel[]>();
  constructor(private http: HttpClient){}

  buscarUsuario(cuenta: String, contrasena: String){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    var usuario: UsuarioModel|any={cuenta:cuenta, contrasena:contrasena};
    this.http.post<LoginModel>(this.baseUrl+'api/usuario/login', usuario)
    .subscribe((data)=>{
      console.log(data);
      var respuesta = data;
      this.subjectRespuestaLogin.next(respuesta);
    });
  }

  mostrarUsuarios(){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })

    this.http.get<UsuarioModel[]>(this.baseUrl+'api/usuario/mostrarUsuarios',{headers:httpOptions})
    .subscribe((data)=>{
      console.log(data);
      var respuesta:UsuarioModel[]|any = [];
      respuesta = data;
      this.subjectUsuarioGestion.next(respuesta);
    });
  }

  agregarNivelUsuarioAUsuario(mandar: MandarUsuarioAgregarNivelUsuario){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    console.log(mandar);
    this.http.post<UsuarioModel>(this.baseUrl+'api/usuario/agregarUsuarioNivel',mandar,{headers:httpOptions})
    .subscribe((data)=>{

    });
  }
  gestionNiveles(id:String){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    this.http.get<ModelNivelUsuario>(this.baseUrl+'api/usuario/gestionNiveles?id='+id,{headers:httpOptions})
    .subscribe((data)=>{

      var objeto:ModelNivelUsuario|any= {descripcionNivelUsuario:[],nombre:'',id:0};
      objeto = data;
      this.subjectEditarNivel.next(objeto);
    });
  }

  agregarUsuario(usuario:UsuarioJson){
    console.log(usuario);
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    this.http.post<UsuarioModel>(this.baseUrl+'api/usuario/agregarUsuario', usuario,{headers:httpOptions})
    .subscribe((data)=>{
      console.log(data);
      var respuesta:UsuarioModel = data;
      this.subjectUsuarioRegistrado.next(respuesta);
    });
  }
  buscarNivelUsuario(cuenta:String, contrasena:String){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })
    var usuario: UsuarioModel|any={cuenta:cuenta, contrasena:contrasena};
    this.http.post<DerechosModel>(this.baseUrl+'api/usuario/buscarSubNivel',usuario,{headers:httpOptions})//ModelNivelUsuario
    .subscribe((data)=>{

      var respuesta:DerechosModel[]|any;
      respuesta = data;
      this.subjectNivelUsuario.next(respuesta);
    });
  }
  listenerRespuestaLogin(){
    return this.subjectRespuestaLogin.asObservable();
  }

  listenerGestionNiveles(){
    return this.subjectNivelesSubniveles.asObservable();
  }
  listenerGestionUsuarios(){
    return this.subjectUsuarioGestion.asObservable();
  }
  listenerUsuarioRegistrado(){
    return this.subjectUsuarioRegistrado.asObservable();
  }
  listenerNivelUsuario(){
    return this.subjectNivelUsuario.asObservable();
  }
  listenerEditarSubnivel(){
    return this.subjectEditarNivel.asObservable();
  }
}
