import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelItemOrdenCompra } from 'src/app/Models/ItemOrdenCompra';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemCompra } from 'src/app/services/ItemOrdenCompra.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-entre-fechas',
  templateUrl: './entre-fechas.component.html',
  styleUrls: ['./entre-fechas.component.css']
})
export class EntreFechasComponent implements OnInit {
  subscriptionAllproveedores:Subscription|any;
  subscriptionProveedor :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionOrdenCompra:Subscription|any;
  subscribeNotaVenta:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  displayedColumnsItems:String[] = [];
  formGroup:FormGroup|any;
  activar=false;
  dataSource= new MatTableDataSource<ModelItemOrdenCompra>();
  itemsOrdenCompra = new MatTableDataSource<ModelItemOrdenCompra>();
  displayedColumns:String[] = []
  producto : ProductoModel|any;
  productoAll:ProductoModel[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceProveedor:ServiceProveedor, private serviceItemNotaVenta: ServiceItemCompra, private dialog:MatDialog, private serviceProducto:ServiceProducto) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscriptionAllproveedores!=undefined){
      this.subscriptionAllproveedores.unsubscribe();
    }
    if(this.subscriptionProveedor!=undefined){
      this.subscriptionProveedor.unsubscribe();
    }
    if(this.subscriptionProveedor2Fechas!=undefined){
      this.subscriptionProveedor2Fechas.unsubscribe();
    }
    if(this.subscriptionOrdenCompra!=undefined){
      this.subscriptionOrdenCompra.unsubscribe();
    }
    if(this.subscribeNotaVenta!=undefined){
      this.subscribeNotaVenta.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })
    if(this.subscriptionAllproveedores!=undefined){
      this.subscriptionAllproveedores.unsubscribe();
    }
    this.serviceProducto.obtenerProductos();
    this.subscriptionAllproveedores = this.serviceProducto.listenerDatosProducto().subscribe(data=>{
      this.productoAll = data;
      var proveedoresNombre:String[] = []
      data.forEach(proveedor=>{
        proveedoresNombre.push(proveedor.nombre);
      })
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
      this.options = proveedoresNombre;
    })
   /* this.subscriptionProveedor = this.serviceProveedor.listenerMayorOrdenCompra().subscribe(data=>{
      this.proveedorModel = data;
      this.formGroup.get('myControl').setValue(data.nombre);
    })*/

  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  buscar(){
    this.activar=true;
    if(this.subscriptionOrdenCompra!=undefined){
      this.subscriptionOrdenCompra.unsubscribe();
    }
    this.serviceItemNotaVenta.fechasProducto(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionOrdenCompra = this.serviceItemNotaVenta.listenerFechasProducto().subscribe(notaventas=>{
      this.dataSource.data = notaventas;
      this.displayedColumns = ['ordencompra.nrodoc','ordencompra.cliente.nombre','ordencompra.fecha','ordencompra.total','boton'];
    })
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  items(notaventa:ModelItemOrdenCompra){
    this.serviceItemNotaVenta.findByNotaventa(notaventa.id);
    if(this.subscribeNotaVenta!=undefined){
      this.subscribeNotaVenta.unsubscribe();
    }
    this.subscribeNotaVenta = this.serviceItemNotaVenta.listenerItemsVentaByNotaventa().subscribe(item=>{
      this.itemsOrdenCompra.data = item
      this.displayedColumnsItems = ['producto.nombre','producto.codigo','cantidad','subtotal']
    })
  }
}
