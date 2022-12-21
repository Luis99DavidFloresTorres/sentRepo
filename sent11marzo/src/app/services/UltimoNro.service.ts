import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../Models/LoginResponse.model";


@Injectable({
  providedIn: "root"
})
export class ServiceUltimoNro{
  baseUrl = environment.baseUrl;
  crearNroSalidasSubject = new Subject<String>();  //loginModel es usado como objeto de transferencia para datos simples como numeros o strings
  crearNroEntradasSubject = new Subject<String>();
  crearNroOrdenCompraSubject = new Subject<String>();
  crearNroNotaventaSubject = new Subject<String>();
  crearNroProyectoprj = new Subject<String>();
  crearCodigoNumero = new Subject<String>();
  constructor(private http:HttpClient){}
  crearNroSalidas(){
    this.http.get<LoginModel>(this.baseUrl+'api/ultimoNro/salidasAlmacen').subscribe(datos=>{
        console.log(datos.respuesta);
        let mandar:String = datos.respuesta;
        this.crearNroSalidasSubject.next(mandar);
    })
  }

  crearNroEntradas(){
    this.http.get<LoginModel>(this.baseUrl+'api/ultimoNro/entradasAlmacen').subscribe(datos=>{
        console.log(datos.respuesta);
        let mandar:String = datos.respuesta;
        this.crearNroEntradasSubject.next(mandar);
    })
  }
  crearNroOrdenCompra(){
    this.http.get<LoginModel>(this.baseUrl+'api/ultimoNro/ordencompra').subscribe(datos=>{
        console.log(datos.respuesta);
        let mandar:String = datos.respuesta;

        this.crearNroOrdenCompraSubject.next(mandar);
    })
  }
  crearNroNotaventa(){
    this.http.get<LoginModel>(this.baseUrl+'api/ultimoNro/notaventa').subscribe(datos=>{
      console.log(datos.respuesta);
      let mandar:String = datos.respuesta;
      this.crearNroNotaventaSubject.next(mandar);
  })
  }
  crearNroProyecto(){
    this.http.get<LoginModel>(this.baseUrl+'api/ultimoNro/proyecto').subscribe(datos=>{
      console.log(datos.respuesta);
      let mandar:String = datos.respuesta;
      this.crearNroProyectoprj.next(mandar);
  })
  }
  crearCodigoProducto(codigo:String){
    this.http.get<any>(this.baseUrl+'api/ultimoNro/productoCodigo/'+codigo+'-'+0).subscribe(datos=>{
      console.log(datos);
      this.crearCodigoNumero.next(datos);
  })
  }
  eliminarNroDocumento(numero:Number,nombredocumento:String, oper: Number){
    this.http.delete<LoginModel>(this.baseUrl+'api/ultimoNro/liberarNroDoc/'+numero+"/"+nombredocumento+"/"+oper).subscribe(datos=>{})
  }
  listenerCrearNroSalidas(){
    return this.crearNroSalidasSubject.asObservable();
  }
  listenerCodigoProducto(){
    return this.crearCodigoNumero.asObservable();
  }
  listenerCrearNroEntradas(){
    return this.crearNroEntradasSubject.asObservable();
  }
  listenerCrearNroOrdenCompra(){
    return this.crearNroOrdenCompraSubject.asObservable();
  }
  listenerCrearNotaventaSubject(){
    return this.crearNroNotaventaSubject.asObservable();
  }
  listenerNroProyecto(){
    return this.crearNroProyectoprj.asObservable();
  }
}
