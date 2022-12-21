import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ModelItemnotaventa } from 'src/app/Models/Itemnotaventa.model';
import { ModelNotaventa } from 'src/app/Models/Notaventa.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceNotaVenta } from 'src/app/services/NotaVenta.service';
import { BuscarClientesComponent } from '../buscar-clientes/buscar-clientes.component';

@Component({
  selector: 'app-ventaspor-cliente',
  templateUrl: './ventaspor-cliente.component.html',
  styleUrls: ['./ventaspor-cliente.component.css']
})
export class VentasporClienteComponent implements OnInit {
  subscriptionAllclientes:Subscription|any;
  subscriptionCliente :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionMayordeCompras:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;

  dataSource= new MatTableDataSource<ModelNotaventa>();
  displayedColumns:String[] = []
  clienteModel : ModelCliente|any;
  clienteAll:ModelCliente[] = []
  total=new FormControl();
  @ViewChild(MatSort) sort: MatSort | any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceCliente:ServiceCliente, private dialog:MatDialog, private serviceNotaventa:ServiceNotaVenta) {
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
      console.log(data)
      this.clienteAll = data;
      var clienteNombre:String[] = []
      data.forEach(proveedor=>{
        clienteNombre.push(proveedor.nombre);
      })
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
      this.options = clienteNombre;
    })
    if(this.subscriptionCliente!=undefined){
      this.subscriptionCliente.unsubscribe();
    }
    this.subscriptionCliente = this.serviceCliente.listenerEncontrarVentasPorCliente().subscribe(data=>{
      this.clienteModel = data;
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
    this.serviceNotaventa.ventasporCliente(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionMayordeCompras= this.serviceNotaventa.listenerVentasPorCliente().subscribe((mayorProductosCompra:any)=>{
      this.dataSource.data = mayorProductosCompra
      var total = 0;
      mayorProductosCompra.forEach((productoCompra:any)=>{
          total+=productoCompra.total
      })
      this.displayedColumns = ['fecha','nrodoc','proyecto.nota','cliente.nombre','operacion','detalle','total'];
      this.total.setValue(total);
    })

  }
  buscarClientes(){
    var enviar = {datos:this.clienteAll, clase:'ventasporCliente'};
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
    var total = 0;
      this.dataSource.filteredData.forEach((productoCompra:any)=>{
          total+=productoCompra.total
      })
      this.total.setValue(total);
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
