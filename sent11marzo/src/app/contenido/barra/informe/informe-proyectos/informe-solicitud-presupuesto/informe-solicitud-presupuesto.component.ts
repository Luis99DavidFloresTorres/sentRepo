import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { NotaSolicitudModel } from 'src/app/Models/NotaSolicitud.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceNotaSolicitud } from 'src/app/services/NotaSolicitud.service';

@Component({
  selector: 'app-informe-solicitud-presupuesto',
  templateUrl: './informe-solicitud-presupuesto.component.html',
  styleUrls: ['./informe-solicitud-presupuesto.component.css']
})
export class InformeSolicitudPresupuestoComponent implements OnInit {

  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<NotaSolicitudModel>();
  displayedColumns:String[]=[]
  subscriptionPeriodo2Fechas:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceNotaSolicitud:ServiceNotaSolicitud, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>) { }
  ngOnDestroy(): void {
    if(this.subscriptionPeriodo2Fechas!=undefined){
      this.subscriptionPeriodo2Fechas.unsubscribe();
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
    if(this.subscriptionPeriodo2Fechas!=undefined){
      this.subscriptionPeriodo2Fechas.unsubscribe();
    }
    this.serviceNotaSolicitud.entreFechas(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionPeriodo2Fechas = this.serviceNotaSolicitud.listenerEntreFechas().subscribe(data=>{
      this.dataSource.data=data;
      this.displayedColumns = ['fecha','nrodoc','proyecto.nombre','proyecto.cliente.nombre','useract','detalle','monto'];
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
