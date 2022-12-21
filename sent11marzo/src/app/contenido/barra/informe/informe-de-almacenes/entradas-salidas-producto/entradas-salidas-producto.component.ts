import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

@Component({
  selector: 'app-entradas-salidas-producto',
  templateUrl: './entradas-salidas-producto.component.html',
  styleUrls: ['./entradas-salidas-producto.component.css']
})
export class EntradasSalidasProductoComponent implements OnInit, OnDestroy{

  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[]=[]
  ingresos = new FormControl();
  salidas= new FormControl();
  subscriptionPeriodo2Fechas:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceItemProducto:ServiceItemProducto, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>) { }
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
    this.serviceItemProducto.informeSalidaEntrada(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionPeriodo2Fechas = this.serviceItemProducto.listenerInformeSalidaEntrada().subscribe(data=>{
      this.dataSource.data=data;
      var sumaIngresos = 0;
      var sumaSalidas = 0;
      data.forEach(fecha=>{

        let latest_date:any =this.datepipe.transform(fecha.transproducto.fecha, 'yyyy-MM-dd');
        fecha.fechaact = new Date(latest_date[0]) ;
        sumaIngresos+=fecha.ingresos.valueOf();
        sumaSalidas+=fecha.salidas.valueOf();
      })
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper','producto.codigo','producto.nombre','producto.unidad.nombre','serial','ingresos','salidas'];
      this.ingresos.setValue(sumaIngresos);
      this.salidas.setValue(sumaSalidas);
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
