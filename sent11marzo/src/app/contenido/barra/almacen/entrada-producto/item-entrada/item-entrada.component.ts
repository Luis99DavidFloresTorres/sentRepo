import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { NotaEntradaRecuperarComponent } from '../../../RecuperarDocumentos/nota-entrada-recuperar/nota-entrada-recuperar.component';
import { NotaOrdenCompraComponent } from '../../../RecuperarDocumentos/nota-orden-compra/nota-orden-compra.component';
import { NotaSalidaRecuperarComponent } from '../../../RecuperarDocumentos/nota-salida-recuperar/nota-salida-recuperar.component';

@Component({
  selector: 'app-item-entrada',
  templateUrl: './item-entrada.component.html',
  styleUrls: ['./item-entrada.component.css']
})
export class ItemEntradaComponent implements OnInit, OnChanges, OnDestroy {

  myControl = new FormControl();
  ab:any = "sf/01-09-2021/001" ;
  ac:any = "sf01092021001"
  costoTotal= new FormControl({
    value:'',
    disabled:true
  });
  costo = new FormControl({
    value:'',
    disabled:true
  });
  costoInput = new FormControl({
    value:'',
    disabled:true
  });
  bcdisplayvalue = true;
  serialControl = new FormControl();
  options: String[]=[];
  seriales:String[]=[];
  obtenerValores: ProductoModel|any;
  sujeto = new Subject();
  subscriber : Subscription|any;
  suscribeRecuperarDocumentosEntrada:Subscription|any;
  suscribeRecuperarDocumentosSalida:Subscription|any;
  suscribeRecuperarDocumentoNotaVenta:Subscription|any;
  suscribeRecuperarDocumentoOrdenCompra:Subscription|any;
  subscriberNombres: Subscription | any;
  subscribeSerial:Subscription|any;
  filteredOptions: Observable<String[]>|any;
  serialOptions: Observable<String[]>|any;
  tablaDatos:ItemProductoModel[]|any = [];
  cantidad = 1;
  valorColor:String="";
  displayedColumns = ['producto.codigo','producto.nombre','producto.unidad.nombre','producto.serial','cantidad','costo','monto','eliminar'];
  dataSource= new MatTableDataSource<ItemProductoModel>();
  serial="";
  nuevo:boolean=true;
  cancelar:boolean = false;
  @Output() mandarProductos = new EventEmitter<ItemProductoModel[]>();
  @Input() boton:any;

  @Output() canastaVacia = new EventEmitter<void>();

  @Input() recuperar:any = false;
  constructor(private serviceItemProducto: ServiceItemProducto, private serviceProducto: ServiceProducto, private matDialog:MatDialog,  private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.boton);
    if(changes.boton!=undefined){
      if(!changes.boton.isFirstChange()){
        this.nuevo = changes.boton.previousValue['nuevo'];
        this.cancelar = changes.boton.previousValue['cancelar'];
        if(this.cancelar){
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
          alert("Ingrese productos, no se guardaron los cambios");
          this.canastaVacia.emit();
        }

      }
    }

  }
  ngOnDestroy(): void {

    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentosEntrada!=undefined){
      this.suscribeRecuperarDocumentosEntrada.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentosSalida!=undefined){
      this.suscribeRecuperarDocumentosSalida.unsubscribe();
    }
    if(this.suscribeRecuperarDocumentoOrdenCompra!=undefined){
      this.suscribeRecuperarDocumentoOrdenCompra.unsubscribe();
    }
    if(this.subscribeSerial!=undefined){
      this.subscribeSerial.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
    if(this.subscriberNombres!=undefined){
      this.subscriberNombres.unsubscribe();
    }
   /* if(this.filteredOptions!=undefined){

      this.filteredOptions.unsubscribe();
    }
    if(this.serialOptions!=undefined){
      this.serialOptions.unsubscribe();
    }*/
  }
  ngOnInit(): void {

    this.serviceItemProducto.obtenerDistintosSeriales();
    this.subscribeSerial = this.serviceItemProducto.listenerSeriales().subscribe(datos=>{

      this.seriales=datos;
      console.log(this.seriales);
      this.serialOptions = this.serialControl.valueChanges.pipe(
        startWith(''),
        map(value2=> this.filterSerial(value2))
      );
    });
   this.serviceProducto.obtenerbyName();
   this.subscriber= this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map(value => this._filter(value))
      );
    });
    this.documentoEntradaObtenidoReemplazar();
    this.documentoSalidaObtenidoReemplazar();
    this.documentoRecuperadoOrdenCompraReemplazar();
  }
  documentoEntradaObtenidoReemplazar(){
    this.suscribeRecuperarDocumentosEntrada=this.serviceRecuperarDocumentos.listenerSujetoEntrada_Entrada().subscribe(datos=>{
      datos.forEach(dato=>{
        dato.monto = dato.cantidad.valueOf() * dato.costo.valueOf();
        dato.costo = dato.costo
      })

      this.dataSource.data = datos;
      this.tablaDatos=datos;
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  documentoSalidaObtenidoReemplazar(){
    this.suscribeRecuperarDocumentosSalida=this.serviceRecuperarDocumentos.listenerSujetoSalida_Entrada().subscribe(datos=>{
      datos.forEach(dato=> {
        dato.monto = dato.cantidad.valueOf() * dato.costo.valueOf()
        dato.costo = dato.costo
      })
      this.dataSource.data = datos;
      this.tablaDatos=datos;
      console.log(this.tablaDatos);
      console.log(this.dataSource.data);
      this.totalPrecioFuncion(this.tablaDatos);
  })
  }
  documentoRecuperadoOrdenCompraReemplazar(){
    this.suscribeRecuperarDocumentoOrdenCompra=this.serviceRecuperarDocumentos.listenerSujetoOrdenCompra_Entrada().subscribe(datos=>{
      var vector:any = [];
      for(var i = 0; i< datos.length; i++){
          var itemCompra = datos[i];
          var item_producto:ItemProductoModel|any = {cantidad:itemCompra.cantidad, monto:itemCompra.precio.valueOf() * itemCompra.cantidad.valueOf(), costo:itemCompra.precio,producto:itemCompra.producto}
          vector.push(item_producto);
          //vector.push(item_producto);

      }
      this.dataSource.data = vector;
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

    this.valorColor =nombre;
  }
  input(input:String,valorInput:any){


    var numero:number = parseInt(valorInput);

    this.dataSource.data.forEach(datos =>{
      if(valorInput==""){

        if(datos.producto.id==input){
          datos.monto=0;
          datos.cantidad = 0;
        }
      }else{
        datos.producto.id==input? datos.monto=numero*datos.costo.valueOf():0
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
  costoinput(input:String,valorInput:any){
    if(valorInput==""){
      valorInput=0;
    }

    var id:Number = parseInt(input.toString());
    for(var i=0; i<this.dataSource.data.length;i++){
        if(this.dataSource.data[i].id==id){
            this.dataSource.data[i].costo = parseInt(valorInput);
            this.dataSource.data[i].monto = this.dataSource.data[i].costo.valueOf()*this.dataSource.data[i].cantidad.valueOf()
        }
        if(this.tablaDatos[i].producto.id==id){
          this.tablaDatos[i].costo=parseInt(valorInput);
          this.tablaDatos[i].monto = this.tablaDatos[i].costo.valueOf()*this.tablaDatos[i].cantidad.valueOf();
        }
    }
  }
  eliminarItem(id:Number){
    for(var i=0; i<this.tablaDatos.length;i++){

      if(this.tablaDatos[i].producto.id==id){
        this.tablaDatos = this.tablaDatos.filter((data:ItemProductoModel)=> data !=this.tablaDatos[i])
      }
    }
    this.dataSource.data=this.tablaDatos;
    this.totalPrecioFuncion(this.tablaDatos);
  }
  recuperarNotaEntrada(){
    this.matDialog.open(NotaEntradaRecuperarComponent,{width:'700px',data:"entrada"});
  }
  recuperarNotaSalida(){
    this.matDialog.open(NotaSalidaRecuperarComponent,{width:'700px',data:"entrada"});
  }
  recuperarOrdenCompra(){
    this.matDialog.open(NotaOrdenCompraComponent,{width:'700px',data:"entrada"});
  }
}
