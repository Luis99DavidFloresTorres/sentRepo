import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelItemnotaventa } from 'src/app/Models/Itemnotaventa.model';
import { ModelNotaventa } from 'src/app/Models/Notaventa.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { NotaCotizacionRecuperarComponent } from '../../RecuperarDocumentos/nota-cotizacion-recuperar/nota-cotizacion-recuperar.component';

@Component({
  selector: 'app-items-nota-venta',
  templateUrl: './items-nota-venta.component.html',
  styleUrls: ['./items-nota-venta.component.css']
})
export class ItemsNotaVentaComponent implements OnInit {
  myControl = new FormControl();
  costoTotal= new FormControl({
    value:'',
    disabled:true
  });
  precio = new FormControl({
    value:'',
    disabled:true
  });
  sujeto = new Subject();
  options: String[]=[];
  obtenerValores: ProductoModel|any;
  subscriberProducoByName:Subscription|any;
  subscriber : Subscription|any;
  filteredOptions: Observable<String[]>|any;
  tablaDatos:ModelItemnotaventa[]|any = [];
  valorColor:String="";
  suscribeRecuperarDocumentoProyecto:Subscription|any;
  cantidad = 1;
  displayedColumns = ['producto.codigo','producto.nombre','producto.unidad.nombre','producto.tipo','cantidad','precio','producto.descto','subtotal','eliminar'];
  dataSource= new MatTableDataSource<ModelItemnotaventa>();
  serial="";
  nuevo:boolean|any;
  cancelar:boolean = false;
  @Output() mandarProductos = new EventEmitter<ModelItemnotaventa[]>();
  @Input() boton:any;
  @Input() recuperar:any = false;
  @Output() canastaVacia = new EventEmitter<void>();
  constructor(private serviceProducto: ServiceProducto, private matDialog:MatDialog, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.boton!=undefined){
      if(!changes.boton.isFirstChange()){
        this.nuevo = changes.boton.previousValue['nuevo'];
        this.cancelar = !changes.boton.previousValue['cancelar'];
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
    if(this.suscribeRecuperarDocumentoProyecto!=undefined){
      this.suscribeRecuperarDocumentoProyecto.unsubscribe();
    }
    if(this.subscriberProducoByName!=undefined){
      this.subscriberProducoByName.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.nuevo=true
    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }
    this.serviceProducto.obtenerbyName();
    this.subscriber= this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map(value => this._filter(value))
      );
    });
    this.documentoRecuperadCotizacionProyecto();
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  agregar(){
    if(this.subscriberProducoByName!=undefined){
      this.subscriberProducoByName.unsubscribe();
    }
    const recuperarInput:String =  this.myControl.value;
    this.serviceProducto.findbyName(recuperarInput);
    this.subscriberProducoByName= this.serviceProducto.listenerFindByName().subscribe(datos=>{
      const producto:ProductoModel = datos;
      if( isNaN(producto.precio.valueOf())){
        producto.precio=0;
      }
      const itemProducto:ModelItemnotaventa|any ={precio:producto.precio,producto:producto, subtotal:producto.precio,cantidad:1};
        if(this.tablaDatos.length==0){
          this.tablaDatos.push(itemProducto);
          this.dataSource.data = this.tablaDatos;
          this.totalPrecioFuncion(this.tablaDatos);
        }else{
            this.tablaDatos.push(itemProducto);
            this.dataSource.data = this.tablaDatos;
            this.totalPrecioFuncion(this.tablaDatos);
        }
        this.myControl.setValue("");

    });
  }
  documentoRecuperadCotizacionProyecto(){
    if(this.suscribeRecuperarDocumentoProyecto!=undefined){
      this.suscribeRecuperarDocumentoProyecto.unsubscribe();
    }
    this.suscribeRecuperarDocumentoProyecto=this.serviceRecuperarDocumentos.listenerSujetoProyecto_NotaVenta().subscribe(datos=>{
      var vector:any = [];
      for(var i = 0; i< datos.length; i++){
          var itemsVenta = datos[i];
          if(itemsVenta.origen!="sinItems"){

            var item_producto:ModelItemnotaventa|any = {cantidad:itemsVenta.cantidad, subtotal:itemsVenta.precioventa.valueOf() * itemsVenta.cantidad.valueOf(), precio:itemsVenta.precioventa,producto:itemsVenta.producto}

            vector.push(item_producto);
          }

      }
      this.dataSource.data=vector;
      this.tablaDatos = vector;
      this.totalPrecioFuncion(this.tablaDatos);
  })
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
  input(input:String,valorInput:any, indice:number){
    var numero:number = parseInt(valorInput);
    if(valorInput==''){
      this.dataSource.data[indice].subtotal = 0;
    }else{
      this.dataSource.data[indice].subtotal=numero*this.dataSource.data[indice].producto.precio.valueOf();
      this.dataSource.data[indice].cantidad=numero;
    }
    this.tablaDatos = this.dataSource.data;
    this.totalPrecioFuncion(this.tablaDatos);
  }
  totalPrecioFuncion(vector:ModelItemnotaventa[]){
    var suma:number=0;
    vector.forEach(data=>{
        suma+=data.subtotal.valueOf();
    })
    this.precio.setValue(suma);
  }
  emitir(){
    this.mandarProductos.emit(this.tablaDatos);
  }
  precioinput(input:String,valorInput:any){
    var id:Number = parseInt(input.toString());
    for(var i=0; i<this.dataSource.data.length;i++){
        if(this.dataSource.data[i].id==id){
            this.dataSource.data[i].precio = parseInt(valorInput);
        }
        if(this.tablaDatos[i].producto.id==id){
          this.tablaDatos[i].precio=parseInt(valorInput);
        }
    }
  }
  eliminarItem(id:Number){
    for(var i=0; i<this.tablaDatos.length;i++){

      if(this.tablaDatos[i].producto.id==id){
        this.tablaDatos = this.tablaDatos.filter((data:ModelNotaventa)=> data !=this.tablaDatos[i])
      }
    }
    this.dataSource.data=this.tablaDatos;
    var suma:number=0;
    this.dataSource.data.forEach(data=>{
        suma+=data.subtotal.valueOf();
    })
    this.precio.setValue(suma);
  }
  recuperarCotizacion(){
    this.matDialog.open(NotaCotizacionRecuperarComponent,{width:'700px',data:"notaventa"});
  }
}
