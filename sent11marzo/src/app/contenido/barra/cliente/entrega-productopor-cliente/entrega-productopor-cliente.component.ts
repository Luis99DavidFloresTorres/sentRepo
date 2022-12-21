import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { BuscarClientesComponent } from '../buscar-clientes/buscar-clientes.component';

@Component({
  selector: 'app-entrega-productopor-cliente',
  templateUrl: './entrega-productopor-cliente.component.html',
  styleUrls: ['./entrega-productopor-cliente.component.css']
})
export class EntregaProductoporClienteComponent implements OnInit {
  subscriptionAllclientes:Subscription|any;
  subscriptionCliente :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionMayordeCompras:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  dataSource= new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[] = []
  clienteModel : ModelCliente|any;
  clienteAll:ModelCliente[] = []
  cantidad= new FormControl();
  costoTotal =  new FormControl();
  @ViewChild(MatSort) sort: MatSort | any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceCliente:ServiceCliente, private dialog:MatDialog, private serviceItemProducto:ServiceItemProducto) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscriptionAllclientes!=undefined){
      this.subscriptionAllclientes.unsubscribe();
    }
    if(this.subscriptionCliente!=undefined){
      this.subscriptionCliente.unsubscribe();
    }
    if(this.subscriptionProveedor2Fechas!=undefined){
      this.subscriptionProveedor2Fechas.unsubscribe();
    }
    if(this.subscriptionMayordeCompras!=undefined){
      this.subscriptionMayordeCompras.unsubscribe();
    }
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
  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })

    this.serviceCliente.allClientes();
    this.subscriptionAllclientes = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      this.clienteAll = data;
      var clienteNombre:String[] = []
      data.forEach(proveedor=>{
        clienteNombre.push(proveedor.nombre);
      })
      this.options = clienteNombre;
    })
    if(this.subscriptionCliente!=undefined){
      this.subscriptionCliente.unsubscribe();
    }
    this.subscriptionCliente = this.serviceCliente.listenerEncontrarProductoPorCliente().subscribe(data=>{
      this.clienteModel = data;
     // console.log(data);
      this.formGroup.get('myControl').setValue(data.nombre);
    })
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
    this.serviceItemProducto.entregaProductoPorCliente(this.range.get('start')?.value,this.range.get('end')?.value, this.clienteModel);
    this.subscriptionMayordeCompras= this.serviceItemProducto.listenerBuscarEntregasProductoPorCliente().subscribe((mayorProductosCompra:any)=>{
      var cantidadTotal = 0;
      var costoTotal = 0;

      mayorProductosCompra.forEach((d:any)=>{
        var monto = d.cantidad.valueOf() * d.costo.valueOf();
        d.monto = monto
        costoTotal += monto;
        cantidadTotal +=d.cantidad;
      })
      this.dataSource.data = mayorProductosCompra
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper','transproducto.proyecto.nombre','producto.nombre','serial','cantidad','producto.precio','costo','monto'];
      this.cantidad.setValue(cantidadTotal);
      this.costoTotal.setValue(costoTotal)
    })
  }
  buscarClientes(){
    var enviar = {datos:this.clienteAll, clase:'entregaProductoPorCliente'};
    this.dialog.open(BuscarClientesComponent,{width:'700px',height:'800px', data:enviar});
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
  clienteGuardar(index:any){
    this.clienteModel = this.clienteAll[index];
  }
}
