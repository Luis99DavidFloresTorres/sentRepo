import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelItemOrdenCompra } from 'src/app/Models/ItemOrdenCompra';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceItemCompra_OrdenCompra } from 'src/app/services/ItemCompra_OrdenCompra.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { BuscarProveedoresComponent } from '../buscar-proveedores/buscar-proveedores.component';

@Component({
  selector: 'app-producto-orden-compra-prov',
  templateUrl: './producto-orden-compra-prov.component.html',
  styleUrls: ['./producto-orden-compra-prov.component.css']
})
export class ProductoOrdenCompraProvComponent implements OnInit {
  subscriptionAllproveedores:Subscription|any;
  subscriptionProveedor :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionProductoOrdenCompra:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  totalCosto = new FormControl();
  formGroup:FormGroup|any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource= new MatTableDataSource<ModelItemOrdenCompra>();
  displayedColumns:String[] = []//"ordencompra.fecha","ordencompra.nrodoc","ordencompra.oper","ordencompra.nrocot","ordencompra.useract","ordencompra.detalle",""
  proveedorModel : ProveedorModel|any;
  proveedoresAll:ProveedorModel[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceProveedor:ServiceProveedor, private serviceItemCompra_OrdenCompra: ServiceItemCompra_OrdenCompra, private dialog:MatDialog) {
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
    if(this.subscriptionProductoOrdenCompra!=undefined){
      this.subscriptionProductoOrdenCompra.unsubscribe();
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
    this.subscriptionProveedor = this.serviceProveedor.listenerProductoItemOrdenCompra().subscribe(data=>{
      this.proveedorModel = data;
      this.formGroup.get('myControl').setValue(data.nombre);
    })

  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.pathDataAccessor;

  }
  pathDataAccessor(item: any, path: string): any {

    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
  buscar(){
    if(this.subscriptionProductoOrdenCompra!=undefined){
      this.subscriptionProductoOrdenCompra.unsubscribe();
    }
    this.serviceItemCompra_OrdenCompra.productoOrdenCompra(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionProductoOrdenCompra = this.serviceItemCompra_OrdenCompra.listenerProductoOrdenCompra().subscribe(proveedor=>{
      this.dataSource.data = proveedor
      this.displayedColumns = ['ordencompra.fecha','ordencompra.nrodoc','ordencompra.oper','ordencompra.useract','producto.nombre','cantidad','precio','monto'];
      var suma:number = 0;
      proveedor.forEach(d=>{
        if(d.monto!=undefined)
        suma+=d.monto.valueOf();
      })
      this.totalCosto.setValue(suma);
    })
  }
  buscarProveedores(){
    var enviar = {datos:this.proveedoresAll, clase:'productoOrdenCompra'};
    this.dialog.open(BuscarProveedoresComponent,{width:'700px',height:'800px', data:enviar});
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
}
