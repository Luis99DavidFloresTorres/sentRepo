import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CotizProductoModel } from 'src/app/Models/CotizProducto.model';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceItemCompra_OrdenCompra } from 'src/app/services/ItemCompra_OrdenCompra.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { BuscarProveedoresComponent } from '../buscar-proveedores/buscar-proveedores.component';

@Component({
  selector: 'app-productos-cotizacion-prov',
  templateUrl: './productos-cotizacion-prov.component.html',
  styleUrls: ['./productos-cotizacion-prov.component.css']
})
export class ProductosCotizacionProvComponent implements OnInit {
  subscriptionAllproveedores:Subscription|any;
  subscriptionProveedor :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionMayordeCompras:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  dataSource= new MatTableDataSource<CotizProductoModel>();
  displayedColumns:String[] = []
  proveedorModel : ProveedorModel|any;
  proveedoresAll:ProveedorModel[] = []
  @ViewChild(MatSort) sort: MatSort | any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceProveedor:ServiceProveedor, private dialog:MatDialog, private serviceItemCompra_OrdenCompra:ServiceItemCompra_OrdenCompra) {
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
    if(this.subscriptionMayordeCompras!=undefined){
      this.subscriptionMayordeCompras.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })

    this.serviceProveedor.allProveedores();
    this.subscriptionAllproveedores = this.serviceProveedor.listenerProveedor().subscribe(data=>{
      this.proveedoresAll = data;
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
    this.subscriptionProveedor = this.serviceProveedor.listenerProductoCotizacion().subscribe(data=>{
      this.proveedorModel = data;
      this.formGroup.get('myControl').setValue(data.nombre);
    })
  }
  pathDataAccessor(item: any, path: string): any {

    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.pathDataAccessor;

  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  buscar(){
    if(this.subscriptionMayordeCompras!=undefined){
      this.subscriptionMayordeCompras.unsubscribe();
    }
  /*  this.serviceItemCompra_OrdenCompra.productoCotizacion(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionMayordeCompras= this.serviceItemCompra_OrdenCompra.listenerProductoCotizacion().subscribe((mayorProductosCompra:any)=>{
      this.dataSource.data = mayorProductosCompra
      this.displayedColumns = ['cotizProducto.fecha','cotizProducto.nrodoc','cotizProducto.oper','cotizProducto.factura','producto.nombre','cantidad','precio','monto'];
    })*/
    this.serviceItemCompra_OrdenCompra.mayorCotizaciones(this.range.get('start')?.value,this.range.get('end')?.value,this.proveedorModel);
    this.subscriptionMayordeCompras= this.serviceItemCompra_OrdenCompra.listenerMayorCotizaciones().subscribe(proveedor=>{
      this.dataSource.data = proveedor

      this.displayedColumns = ['cotizProducto.fecha','cotizProducto.nrodoc','cotizProducto.oper','cotizProducto.useract','producto.nombre','cantidad'];
    })
  }
  buscarProveedores(){
    var enviar = {datos:this.proveedoresAll, clase:'productoCotizacion'};
    this.dialog.open(BuscarProveedoresComponent,{width:'700px',height:'800px', data:enviar});
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm:any, key:any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  nestedFilterCheck(search:any, data:any, key:any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
