import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelItemnotaventa } from 'src/app/Models/Itemnotaventa.model';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { NotaCotizacionRecuperarComponent } from '../../../RecuperarDocumentos/nota-cotizacion-recuperar/nota-cotizacion-recuperar.component';
import { NotaEntradaRecuperarComponent } from '../../../RecuperarDocumentos/nota-entrada-recuperar/nota-entrada-recuperar.component';
import { NotaSalidaRecuperarComponent } from '../../../RecuperarDocumentos/nota-salida-recuperar/nota-salida-recuperar.component';
import { NotaVentaRecuperarComponent } from '../../../RecuperarDocumentos/nota-venta-recuperar/nota-venta-recuperar.component';


@Component({
  selector: 'app-item-salida',
  templateUrl: './item-salida.component.html',
  styleUrls: ['./item-salida.component.css']
})
export class ItemSalidaComponent implements OnInit,OnDestroy, OnChanges {

  myControl = new FormControl();
  costoTotal= new FormControl({
    value:'',
    disabled:true
  });
  costo = new FormControl({
    value:'',
    disabled:true
  });
  sujeto = new Subject();
  ab:any = "sf/01-09-2021/001" ;
  ac:any = "sf01092021001"
  bcdisplayvalue = true;
  serialControl = new FormControl();
  options: String[]=[];
  seriales:String[]=[];
  obtenerValores: ProductoModel|any;
  subscriber : Subscription|any;
  suscribeRecuperarDocumentoEntrada:Subscription|any;
  suscribeRecuperarDocumentoSalida:Subscription|any;
  suscribeRecuperarDocumentoNotaVenta:Subscription|any;
  suscribeRecuperarDocumentoProyecto:Subscription|any;
  subscriberNombres : Subscription|any;
  subscribeSerial:Subscription|any;
  filteredOptions: Observable<String[]>|any;
  serialOptions: Observable<String[]>|any;
  tablaDatos:ItemProductoModel[]|any = [];
  valorColor:String="";
  cantidad = 1;
  displayedColumns = ['producto.codigo','producto.nombre','producto.unidad.nombre','producto.serial','cantidad','costo','monto','eliminar'];
  dataSource= new MatTableDataSource<ItemProductoModel>();
  serial="";
  nuevo:boolean|any;
  cancelar:boolean = false;
  @Output() mandarProductos = new EventEmitter<ItemProductoModel[]>();
  @Input() boton:any;
  @Input() recuperar:any = false;
  @Output() canastaVacia = new EventEmitter<void>();
  constructor(private serviceItemProducto: ServiceItemProducto, private serviceProducto: ServiceProducto, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables, private matDialog:MatDialog){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.boton);
    if(changes.boton!=undefined){//!changes.boton.isFirstChange()
      if(!changes.boton.isFirstChange()){
        this.nuevo = changes.boton.previousValue['nuevo'];
        this.cancelar = !changes.boton.previousValue['cancelar'];
        //console.log('cancelar'+this.cancelar);
        if(this.cancelar){
          //console.log("Entra");
          this.dataSource.data=[];
          this.tablaDatos=[];
        }
      }
    }
    if(changes.recuperar !=undefined){

      if((changes.recuperar.currentValue == true)){
        if(this.tablaDatos.length>0){
          this.emitir();
          this.recuperar =false;
        }else{
          alert("Ingrese productos, no se guardaron los cambios")
          this.canastaVacia.emit();
        }
      }
    }
  }
  ngOnDestroy(): void {
    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentoEntrada!=undefined){
      this.suscribeRecuperarDocumentoEntrada.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentoSalida!=undefined){
      this.suscribeRecuperarDocumentoSalida.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentoNotaVenta!=undefined){
      this.suscribeRecuperarDocumentoNotaVenta.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentoProyecto!=undefined){
      this.suscribeRecuperarDocumentoProyecto.unsubscribe();
    }
    if(this.subscribeSerial!=undefined){
      this.subscribeSerial.unsubscribe();
    }
    if(this.sujeto !== undefined){
      this.sujeto.unsubscribe();
    }
    if(this.subscriberNombres!=undefined){
      this.subscriberNombres.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.nuevo=true
    this.serviceItemProducto.obtenerDistintosSeriales();
    this.subscribeSerial = this.serviceItemProducto.listenerSeriales().subscribe(datos=>{
      this.seriales=datos;
      this.serialOptions = this.serialControl.valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map(value2=> this.filterSerial(value2))
      );
    });
    this.serviceProducto.obtenerbyName();

   this.subscriber= this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
    this.documentoRecuperadoEntrada();
    this.documentoRecuperadSalida();
    this.documentoRecuperadNotaaVenta();
    this.documentoRecuperadCotizacionProyecto();
  }
  documentoRecuperadoEntrada(){
    this.suscribeRecuperarDocumentoEntrada=this.serviceRecuperarDocumentos.listenerSujetoEntrada_Salida().subscribe(datos=>{
      datos.forEach(dato=> {
        dato.monto = dato.cantidad.valueOf() * dato.costo.valueOf()
        dato.costo = dato.producto.precio
        dato.transproducto.fecha =  new Date();
      })
      this.dataSource.data = datos;
      this.tablaDatos=datos;
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  documentoRecuperadSalida(){
    this.suscribeRecuperarDocumentoSalida=this.serviceRecuperarDocumentos.listenerSujetoSalida_Salida().subscribe(datos=>{
      datos.forEach(dato=> {
        dato.monto = dato.cantidad.valueOf() * dato.costo.valueOf()
        dato.costo = dato.producto.precio;
        dato.transproducto.fecha =  new Date();
      })
      this.dataSource.data = datos;
      this.tablaDatos=datos;
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  documentoRecuperadNotaaVenta(){
    this.suscribeRecuperarDocumentoNotaVenta=this.serviceRecuperarDocumentos.listenerSujetoNotaVenta_Salida().subscribe(datos=>{
      //consolethis.serviceProducto.buscarProductoParaRecuperarDocumento(datos[0].producto.id);
      var vector:any = [];
      for(var i = 0; i< datos.length; i++){
          var itemsVenta = datos[i];
          var item_producto:ItemProductoModel|any = {cantidad:itemsVenta.cantidad, monto:itemsVenta.producto.precio.valueOf() * itemsVenta.cantidad.valueOf(), costo:itemsVenta.producto.precio,producto:itemsVenta.producto, fecha:new Date()}
          vector.push(item_producto);
      }
      this.dataSource.data=vector;
      this.tablaDatos = vector;
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  documentoRecuperadCotizacionProyecto(){
    this.suscribeRecuperarDocumentoProyecto=this.serviceRecuperarDocumentos.listenerSujetoProyecto_Salida().subscribe(datos=>{
      var vector:any = [];
      for(var i = 0; i< datos.length; i++){
          var itemsVenta = datos[i];
          if(itemsVenta.origen!="sinItems"){
            var item_producto:ItemProductoModel|any = {cantidad:itemsVenta.cantidad, monto:itemsVenta.producto.precio.valueOf() * itemsVenta.cantidad.valueOf(), costo:itemsVenta.producto.precio,producto:itemsVenta.producto}

            vector.push(item_producto);
          }

      }
      this.dataSource.data=vector;
      this.tablaDatos = vector;
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  private filterSerial(value2: String): String[] {
    const filterValueSerial = value2.toLowerCase();
    var palabra2 =  this.seriales.filter(option2 => option2.toLowerCase().includes(filterValueSerial));
    return palabra2;
  }
  agregar(){
    const recuperarInput:String =  this.myControl.value;
    this.serviceProducto.findbyName(recuperarInput);
    this.subscriberNombres = this.serviceProducto.listenerFindByName().subscribe(datos=>{
      const producto:ProductoModel = datos;
      producto.serial = this.serialControl.value;
      const itemProducto:ItemProductoModel|any ={costo:producto.costo,costome:producto.costome,producto:producto, monto:producto.costo,cantidad:1};
        if(this.tablaDatos.length==0){
          this.tablaDatos.push(itemProducto);
          this.dataSource.data = this.tablaDatos;
          this.totalPrecioFuncion(this.tablaDatos);
        }else{
          if(this.verificarProductosIguales(producto)){
            this.tablaDatos.push(itemProducto);
            this.dataSource.data = this.tablaDatos;
            this.totalPrecioFuncion(this.tablaDatos);
          }
        }
        this.myControl.setValue("");
        this.serialControl.setValue("");
    });
  }
  verificarProductosIguales(producto:ProductoModel){
    var verificar = 1;
    for(var item=0;item<this.tablaDatos.length;item++){
        if(this.tablaDatos[item].producto.id==producto.id){ //this.tablaDatos[item]!=producto nunca entra porque tienen el mismo hash por ser el mismo objeto
          verificar=0;
        }
    }
    return verificar;
  }
  agregarSerial(){

  }
  cambiarColor(nombre:String){
    console.log(nombre);
    this.valorColor =nombre;
  }
  input(input:String,valorInput:any){
    var numero:number = parseInt(valorInput);
    this.dataSource.data.forEach(datos =>{
      if(valorInput==""){
        if(datos.producto.id==input){
          datos.monto=0;
        }
      }else{
        datos.producto.id==input? datos.monto=numero*datos.producto.costo.valueOf():0
        datos.producto.id==input? datos.cantidad=numero:0
      }
    })
    this.tablaDatos = this.dataSource.data;
    this.totalPrecioFuncion(this.tablaDatos);
  }

  totalPrecioFuncion(vector:ItemProductoModel[]){
    var suma:number=0;
    vector.forEach(data=>{
        suma+=data.monto.valueOf();
    })
    this.costo.setValue(suma);
  }
  emitir(){
    this.mandarProductos.emit(this.tablaDatos);
  }
  eliminarItem(id:Number){
    for(var i=0; i<this.tablaDatos.length;i++){

      if(this.tablaDatos[i].producto.id==id){
        console.log(this.tablaDatos);
        this.tablaDatos = this.tablaDatos.filter((data:ItemProductoModel)=> data !=this.tablaDatos[i])
      }
    }
    this.dataSource.data=this.tablaDatos;
    this.totalPrecioFuncion(this.tablaDatos);
    console.log(this.dataSource.data);
    console.log(this.tablaDatos);
  }
  recuperarNotaEntrada(){
    this.matDialog.open(NotaEntradaRecuperarComponent,{width:'700px',data:"salida"});
  }
  recuperarNotaSalida(){
    this.matDialog.open(NotaSalidaRecuperarComponent,{width:'700px',data:"salida"});
  }
  recuperarNotaVenta(){
    this.matDialog.open(NotaVentaRecuperarComponent,{width:'700px',data:"salida"});
  }
  recuperarCotizacion(){
    this.matDialog.open(NotaCotizacionRecuperarComponent,{width:'700px',data:"salida"});
  }
}
