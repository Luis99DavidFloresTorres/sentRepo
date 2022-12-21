import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
import { ProductoModel } from "../Models/producto.model";
import { LoginModel } from "../Models/LoginResponse.model";
@Injectable({
  providedIn: "root"
})
export class ServiceProducto{
  baseUrl = environment.baseUrl;
  private productoUnidad: ProductoModel|any;
  private producto: ProductoModel[]=[];
  private productobyIdSubject = new Subject<ProductoModel>();
  private productaddProductoSubject = new Subject<ProductoModel>();
  private productaddIDImageSubject = new Subject<ProductoModel>();
  private editarRespuesta = new Subject<Number>();
  private productoSubject = new Subject<ProductoModel[]>();
  private productoImagenSubject = new Subject<ProductoModel[]>();
  private productoSubjectNombre = new Subject<String[]>();
  private productoSubjectFindByname = new Subject<ProductoModel>();
  private clienteShowSubject = new Subject<ProductoModel[]>();
  private obtenerCodigos = new Subject<String[]>();
  private subjectProductoEntreFechas = new Subject<ProductoModel>();
  private recuperarDocumentoWithProducto = new Subject<ProductoModel>();
  private subjectProductoEntreFechasDeposito= new Subject<ProductoModel>();
  constructor(private http:HttpClient){
  }
  getEntre2Fechas(){
    return this.subjectProductoEntreFechas;
  }
  getEntre2FechasDeposito(){
    return this.subjectProductoEntreFechasDeposito;
  }
  obtenerProductos(){
    this.http.get<ProductoModel[]>(this.baseUrl+'api/producto/saldo')
    .subscribe((data)=>{
      this.producto=data;
      this.productoSubject.next(this.producto);
    });
  }
  buscarProductoParaRecuperarDocumento(id:Number){
    this.http.get<ProductoModel>(this.baseUrl+'api/producto/byId/'+id)
    .subscribe((data)=>{
      var productoMandar:ProductoModel = data;
      this.recuperarDocumentoWithProducto.next(productoMandar);
    });
  }
  listenerProductoParaRecuperarDocumento(){
    return this.recuperarDocumentoWithProducto.asObservable();
  }
  findbyName(nombre:String){
    var login:LoginModel={respuesta:nombre};
    this.http.post<ProductoModel>(this.baseUrl+'api/producto/byName',login)
    .subscribe((data)=>{
      const productoO=data;
      console.log(data);
      this.productoSubjectFindByname.next(productoO);
    });
  }
  clienteShow(){
    this.http.get<ProductoModel[]>(this.baseUrl+'api/producto/clienteMostrar')
    .subscribe((data)=>{
      this.producto=data;
      this.clienteShowSubject.next(this.producto);
    });
  }
  obtenerAllCodigos(){
    this.http.get<any>(this.baseUrl+'api/producto/obtenerCodigos').subscribe((data)=>{
      console.log("kasdjkasjdkas")
      console.log(data);
      this.obtenerCodigos.next(data);
    })
  }
  obtenerProductosImagen(){
    this.http.get<ProductoModel[]>(this.baseUrl+'api/producto/findAll')
    .subscribe((data)=>{
      this.producto=data;
      this.productoImagenSubject.next(this.producto);
    });
  }
  obtenerbyIdProductos(id: String){
    this.http.get<ProductoModel>(this.baseUrl+'api/producto/byId/'+id)
    .subscribe((data)=>{
      console.log(data);
      this.productoUnidad=data;

      this.productobyIdSubject.next(this.productoUnidad);
    });
  }
  obtenerbyName(){
    this.http.get<ProductoModel[]>(this.baseUrl+'api/producto/tipoProductoNombres')
    .subscribe((data)=>{
      var vector:String[] = [];
      data.forEach(datos=>{
        if(datos.nombre!=null){
        vector.push(datos.nombre);
        }
      })
      this.productoSubjectNombre.next(vector);
    });
  }
  agregarProducto(producto:ProductoModel){
    const httpOptions = new HttpHeaders({

      'Content-Type': 'application/json'
    })

    this.http.post<ProductoModel>(this.baseUrl+'api/producto/add',producto,{headers:httpOptions})
    .subscribe((data)=>{
        const producto:ProductoModel= data;
        console.log(data);
        this.productaddProductoSubject.next(producto);
    });
  }
  editarProducto(producto:ProductoModel){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    this.http.post<Number>(this.baseUrl+'api/producto/editar',producto,{headers:httpOptions})
    .subscribe((data)=>{
       var respuesta= data;
       console.log(respuesta);
       this.obtenerProductosImagen();
       this.editarRespuesta.next(respuesta);
    });
  }
  eliminarProducto(id:String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    var producto: ProductoModel|any = {id:id};
    this.http.post<Number>(this.baseUrl+'api/producto/eliminar',producto,{headers:httpOptions}).subscribe((datos)=>{console.log(datos)});
  }
  agregarImagen(imagen:FormData){

    this.http.post<ProductoModel>(this.baseUrl+'api/assets/upload',imagen)
    .subscribe((data)=>{
      const producto:ProductoModel= data;
      this.productaddIDImageSubject.next(producto);
    });
  }
  listenerDatosProducto(){
    return this.productoSubject.asObservable();
  }
  listenerDatosProductoID(){
    return this.productobyIdSubject;
  }
  listenerDatosProductoNombre(){
    return this.productoSubjectNombre.asObservable();
  }
  listenerDatosProductoImagen(){
    return this.productoImagenSubject.asObservable();
  }
  listeneraddProduct(){
    return this.productaddProductoSubject.asObservable();
  }
  listeneraddImage(){
    return this.productaddIDImageSubject.asObservable();
  }
  listenerEditarProduct(){
    return this.editarRespuesta.asObservable();
  }
  listenerClienteShow(){
    return this.clienteShowSubject.asObservable();
  }
  listenerFindByName(){
    return this.productoSubjectFindByname.asObservable();
  }
  listenerObtenerAllCodigos(){
    return this.obtenerCodigos.asObservable();
  }
  listenerProductoEntreFechas(){
    return this.subjectProductoEntreFechas.asObservable();
  }
  listenerProductoEntreFechasDeposito(){
    return this.subjectProductoEntreFechasDeposito.asObservable();
  }
}
