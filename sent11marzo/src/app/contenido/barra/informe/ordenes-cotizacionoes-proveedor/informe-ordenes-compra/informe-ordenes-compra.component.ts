import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelItemOrdenCompra } from 'src/app/Models/ItemOrdenCompra';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceInformes } from 'src/app/services/Informes.service';

@Component({
  selector: 'app-informe-ordenes-compra',
  templateUrl: './informe-ordenes-compra.component.html',
  styleUrls: ['./informe-ordenes-compra.component.css']
})
export class InformeOrdenesCompraComponent implements OnInit {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<ModelItemOrdenCompra>();
  displayedColumns:String[]=[]
  informeOrdenesCompra:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  costoTotal = new FormControl();
  constructor(private formBuilder:FormBuilder, private serviceInforme:ServiceInformes, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>) { }
  ngOnDestroy(): void {
    if(this.informeOrdenesCompra!=undefined){
      this.informeOrdenesCompra.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:['']
    })
  }
  buscarItems(){
    if(this.informeOrdenesCompra!=undefined){
      this.informeOrdenesCompra.unsubscribe();
    }
    this.serviceInforme.informeOrdenCompra(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.informeOrdenesCompra = this.serviceInforme.listenerInformeOrdenCompra().subscribe(data=>{
      this.dataSource.data=data;
      var sumaCostoTotal = 0;

      data.forEach(suma=>{
        sumaCostoTotal+=suma.costoTotal.valueOf();
      })
      this.displayedColumns = ['ordencompra.fecha','ordencompra.nrodoc','ordencompra.proveedor.nombre','ordencompra.contactopre','ordencompra.detalle','costoTotal'];
      this.costoTotal.setValue(sumaCostoTotal);
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
