import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelItemOrdenCompra } from 'src/app/Models/ItemOrdenCompra';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ModelOrdenCompra } from 'src/app/Models/OrdenCompra';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceProducto } from 'src/app/services/producto.service';
@Component({
  selector: 'app-items-orden-compra',
  templateUrl: './items-orden-compra.component.html',
  styleUrls: ['./items-orden-compra.component.css']
})
export class ItemsOrdenCompraComponent implements OnInit {
  sujeto = new Subject();
  myControl = new FormControl();
  costoTotal= new FormControl({
    value:'',
    disabled:true
  });
  precio = new FormControl({
    value:'',
    disabled:true
  });

  options: String[]=[];
  obtenerValores: ProductoModel|any;
  subscriber : Subscription|any;
  subscribesNombres: Subscription|any;
  filteredOptions: Observable<String[]>|any;
  tablaDatos:ModelItemOrdenCompra[]|any = [];
  valorColor:String="";
  cantidad = 1;
  displayedColumns = ['producto.codigo','producto.nombre','producto.unidad.nombre','detalle','cantidad','precio','monto','eliminar'];
  dataSource= new MatTableDataSource<ModelItemOrdenCompra>();
  serial="";
  nuevo:boolean|any;
  cancelar:boolean = false;
  @Output() mandarProductos = new EventEmitter<ModelItemOrdenCompra[]>();
  @Input() boton:any;
  @Input() recuperar:any = false;
  @Output() canastaVacia = new EventEmitter<void>();
  constructor(private serviceProducto: ServiceProducto){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.boton);
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
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
    if(this.subscribesNombres!=undefined){
      this.subscribesNombres.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.nuevo=true
    this.serviceProducto.obtenerbyName();
    this.subscriber= this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map(value => this._filter(value))
      );
    });

  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  agregar(){
    const recuperarInput:String =  this.myControl.value;
    this.serviceProducto.findbyName(recuperarInput);
    this.subscribesNombres= this.serviceProducto.listenerFindByName().subscribe(datos=>{
      const producto:ProductoModel = datos;

      const itemProducto:ModelItemOrdenCompra|any ={precio:producto.costo,producto:producto, monto:producto.costo,cantidad:1, detalle:""};
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
  input(input:String,valorInput:any){
    console.log(input);

    var numero:number = parseInt(valorInput);
    console.log(numero);
    this.dataSource.data.forEach(datos =>{
      if(valorInput==""){

        if(datos.producto.id==input){

          datos.monto=0;
          console.log(datos.monto);
        }

      }else{
        if(datos.producto.id == input){
          datos.monto=numero*datos.precio.valueOf();
          datos.cantidad=numero;
        }

       // datos.producto.id==input? datos.cantidad=numero:0;
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
    //console.log("costo input");
    //console.log(this.tablaDatos);
  }
  eliminarItem(id:Number){
    for(var i=0; i<this.tablaDatos.length;i++){

      if(this.tablaDatos[i].producto.id==id){
        console.log(this.tablaDatos);
        this.tablaDatos = this.tablaDatos.filter((data:ModelOrdenCompra)=> data !=this.tablaDatos[i])
      }
    }
    this.dataSource.data=this.tablaDatos;
    console.log(this.dataSource.data);
    console.log(this.tablaDatos);
  }
}
