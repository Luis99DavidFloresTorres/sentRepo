import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DepositoModel } from "src/app/contenido/barra/codificador/depositos/deposito.model";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ServiceDeposito{
  baseUrl = environment.baseUrl;
  //private nombreLista: String[] = []
  private deposito: DepositoModel[]=[];
  private depositoSubject = new Subject<DepositoModel[]>();
  private nombresDepositosSubject = new Subject<String[]>();
  private depositoByName=new Subject<DepositoModel>();
  constructor(private http:HttpClient){

  }
  agregarDeposito(deposito: DepositoModel){
    this.http.post(this.baseUrl+'api/deposito/add',deposito)
    .subscribe((data)=>{

    });
  }
  obtenerDepositos(){
    this.http.get<DepositoModel[]>(this.baseUrl+'api/deposito')
    .subscribe((data)=>{
      this.deposito = data;
      this.depositoSubject.next(this.deposito);
    });

  }
  obtenerDepositoPorNombre(deposito: String){
    this.http.get<DepositoModel>(this.baseUrl+'api/deposito/byName/'+deposito)
    .subscribe((data)=>{
      var depositoMandar:DepositoModel|null;
      depositoMandar = data;
      this.depositoByName.next(depositoMandar);
    });
  }
  obtenerNombresDepositos(){
    this.http.get<DepositoModel[]>(this.baseUrl+'api/deposito/byName')
    .subscribe((data)=>{
      const vector:String[] =[];
      this.deposito = data;
      this.deposito.forEach(datos=>{
        vector.push(datos.nombre);
      })
      this.nombresDepositosSubject.next(vector);
    });
  }
  listenerDatosDeposito(){
    return this.depositoSubject.asObservable();
  }
  listenerDatosNombresDepositos(){
    return this.nombresDepositosSubject.asObservable();
  }
  listenerDepositoByName(){
    return this.depositoByName.asObservable();
  }
}
