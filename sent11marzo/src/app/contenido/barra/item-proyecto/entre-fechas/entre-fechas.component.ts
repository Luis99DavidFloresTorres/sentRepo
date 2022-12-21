import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
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
  dataSource= new MatTableDataSource<ModelItemProyecto>();
  itemsNotaVenta = new MatTableDataSource<ModelItemProyecto>();
  displayedColumns:String[] = []//"ordencompra.fecha","ordencompra.nrodoc","ordencompra.oper","ordencompra.nrocot","ordencompra.useract","ordencompra.detalle",""
  producto : ProductoModel|any;
  productoAll:ProductoModel[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceProveedor:ServiceProveedor, private serviceItemProyecto: ServiceItemProyecto, private dialog:MatDialog, private serviceProducto:ServiceProducto) {
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
  }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })

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

    this.serviceItemProyecto.fechasProducto(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionOrdenCompra = this.serviceItemProyecto.listenerFechasProducto().subscribe(notaventas=>{

      this.dataSource.data = notaventas;
      this.displayedColumns = ['proyecto.nroprj','proyecto.cliente.nombre','proyecto.fecha','proyecto.totalventas','proyecto.estado','boton'];
    })
  }
  buscarProveedores(){
    //var enviar = {datos:this.proveedoresAll, clase:'mayorOrdenesCompra'};
   // this.dialog.open(BuscarProveedoresComponent,{width:'700px',height:'800px', data:enviar});
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  items(proyecto:ModelCotizacionProyecto){
    this.serviceItemProyecto.obtenerByProyecto(proyecto.id);
    if(this.subscribeNotaVenta!=undefined){
      this.subscribeNotaVenta.unsubscribe();
    }
    this.subscribeNotaVenta = this.serviceItemProyecto.listenerByProyecto().subscribe(item=>{
      this.itemsNotaVenta.data = item
      this.displayedColumnsItems = ['producto.nombre','producto.codigo','cantidad','monto']
    })
  }
}
