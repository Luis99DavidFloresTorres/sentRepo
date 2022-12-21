import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelItemAsigna } from "../Models/ItemAsigna.model";
import { ModelItemnotaventa } from "../Models/Itemnotaventa.model";
import { ModelItemOrdenCompra } from "../Models/ItemOrdenCompra";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ModelNotaAsigna } from "../Models/NotaAsigna.model";
import { UsuarioModel } from "../Models/UsuarioModel.model";

@Injectable({
  providedIn: "root"
})
export class ServiceInformes{
  baseUrl = environment.baseUrl;
  subjectInformesVenta = new Subject<ModelItemnotaventa[]>();
  subjectInformesComision = new Subject<ModelItemnotaventa[]>();
  subjectInformesVentasPorProducto = new Subject<ModelItemnotaventa[]>();
  subjectInformesVentasPorVendedor = new Subject<ModelItemnotaventa[]>();
  subjectAlmacenEntrada = new Subject<ItemProductoModel[]>();
  subjectAlmacenSalida = new Subject<ItemProductoModel[]>();
  subjectAlmacenUtilidadPorEntrega = new Subject<ItemProductoModel[]>();
  subjectInformeOrdenCompra= new Subject<ModelItemOrdenCompra[]>();
  subjectAlmacenEntradaConFactura = new Subject<ItemProductoModel[]>();
  subjectAlmacenEntradaSinFactura = new Subject<ItemProductoModel[]>();
  constructor(private http:HttpClient){
  }
  informesventa(fechaInicio:Date,fechaFinal:Date){
    this.http.get<ModelItemnotaventa[]>(this.baseUrl+'api/notaventa/informeVenta/'+fechaInicio+'/'+fechaFinal).subscribe(data=>{
        this.subjectInformesVenta.next(data);
    })
  }
  informesComision(fechaInicio:Date,fechaFinal:Date, usuario:UsuarioModel){
    this.http.post<ModelItemnotaventa[]>(this.baseUrl+'api/notaventa/informePorComision/'+fechaInicio+'/'+fechaFinal,usuario).subscribe(data=>{
        this.subjectInformesComision.next(data);
    })
  }
  informesVentasPorProducto(fechaInicio:Date,fechaFinal:Date){
    this.http.get<ModelItemnotaventa[]>(this.baseUrl+'api/notaventa/informeVentasPorProducto/'+fechaInicio+'/'+fechaFinal).subscribe(data=>{
        this.subjectInformesVentasPorProducto.next(data);
    })
  }
  informesVentasPorVendedor(fechaInicio:Date,fechaFinal:Date, usuario:UsuarioModel){
    console.log(usuario)
    this.http.post<ModelItemnotaventa[]>(this.baseUrl+'api/notaventa/informeVentasPorVendedor/'+fechaInicio+'/'+fechaFinal,usuario).subscribe(data=>{
        console.log(data);
        this.subjectInformesVentasPorVendedor.next(data);
    })
  }
  informeAlmacenPorEntradasDeProductos(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/informeEntradaProducto/'+fechaDesde+'/'+fechaHasta+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      this.subjectAlmacenEntrada.next(data);
    });
  }
  informeAlmacenPorEntradasDeProductosConFactura(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/informeEntradaProductoConFactura/'+fechaDesde+'/'+fechaHasta+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      this.subjectAlmacenEntradaConFactura.next(data);
    });
  }
  informeAlmacenPorEntradasDeProductosSinFactura(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/informeEntradaProductoSinFactura/'+fechaDesde+'/'+fechaHasta+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      this.subjectAlmacenEntradaSinFactura.next(data);
    });
  }
  informeAlmacenPorSalidasDeProductos(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/informeSalidasProducto/'+fechaDesde+'/'+fechaHasta+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data)
      this.subjectAlmacenSalida.next(data);
    });
  }
  informeOrdenCompra(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ModelItemOrdenCompra[]>(this.baseUrl+'api/itemCompra/informeOrdenCompra/'+fechaHasta+'/'+fechaDesde+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data)
      this.subjectInformeOrdenCompra.next(data);
    });
  }
  informeAlmacenPorUtilidadPorEntrega(fechaDesde: Date, fechaHasta: Date){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/informeUtilidadSalidaProducto/'+fechaDesde+'/'+fechaHasta+'/', {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data)
      data.forEach(d=>{
          var n:any = d.producto.precio.valueOf()
          d.precioTotal = d.cantidad.valueOf()*n;
          d.producto.utilidadInforme = d.precioTotal.valueOf()-(d.costo.valueOf()*d.cantidad.valueOf())

      })
      this.subjectAlmacenUtilidadPorEntrega.next(data);
    });
  }
  listenerInformeVentas(){
    return this.subjectInformesVenta.asObservable();
  }
  listenerInformeComision(){
    return this.subjectInformesComision.asObservable();
  }
  listenerInformeVentasPorProducto(){
    return this.subjectInformesVentasPorProducto.asObservable();
  }
  listenerInformeVentasPorVendedor(){
    return this.subjectInformesVentasPorVendedor.asObservable();
  }
  listenerInformeAlmacenEntradaU(){
    return this.subjectAlmacenEntrada.asObservable();
  }
  listenerInformeAlmacenEntradaUConFactura(){
    return this.subjectAlmacenEntradaConFactura.asObservable();
  }
  listenerInformeAlmacenEntradaUSinFactura(){
    return this.subjectAlmacenEntradaSinFactura.asObservable();
  }
  listenerInformeAlmacenSalidaU(){
    return this.subjectAlmacenSalida.asObservable();
  }
  listenerInformeAlmacenPorUtilidadEntrega(){
    return this.subjectAlmacenUtilidadPorEntrega.asObservable();
  }
  listenerInformeOrdenCompra(){
    return this.subjectInformeOrdenCompra.asObservable();
  }
}
