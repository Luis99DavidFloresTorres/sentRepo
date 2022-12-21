import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { CotizacionModel } from 'src/app/Models/Cotizacion.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceCotizacionCliente } from 'src/app/services/CotizacionCliente.service';
import { ServiceItemCompra_OrdenCompra } from 'src/app/services/ItemCompra_OrdenCompra.service';

@Component({
  selector: 'app-cotizacionespor-cliente',
  templateUrl: './cotizacionespor-cliente.component.html',
  styleUrls: ['./cotizacionespor-cliente.component.css']
})
export class CotizacionesporClienteComponent implements OnInit, OnDestroy {
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  dataSource= new MatTableDataSource<CotizacionModel>();
  displayedColumns:String[] = []
  subscriptionClientes:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceCliente:ServiceCliente, private serviceCotizacion: ServiceCotizacionCliente) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscriptionClientes!=undefined) {
      this.subscriptionClientes.unsubscribe();
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
    this.subscriptionClientes = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      console.log(data);
      var nombresClientes:String[] = []
      data.forEach(value => {
        nombresClientes.push(value.nombre);
      })
      this.options=nombresClientes;
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
    })

  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  buscar(){


    this.serviceCotizacion.productoOrdenCompra(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.serviceCotizacion.listenerCotizacion().subscribe(cotizacion=>{
      this.dataSource.data = cotizacion
      this.displayedColumns = ['fecha','nrodoc','useract','oper','detalle'];
    })
  }

}
