import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

@Component({
  selector: 'app-utilidad-salidadeproductos',
  templateUrl: './utilidad-salidadeproductos.component.html',
  styleUrls: ['./utilidad-salidadeproductos.component.css']
})
export class UtilidadSalidadeproductosComponent implements OnInit {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[]=[]
  informeAlmacenSalida:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceInforme:ServiceInformes, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>) { }
  ngOnDestroy(): void {
    if(this.informeAlmacenSalida!=undefined){
      this.informeAlmacenSalida.unsubscribe();
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
    if(this.informeAlmacenSalida!=undefined){
      this.informeAlmacenSalida.unsubscribe();
    }
    this.serviceInforme.informeAlmacenPorUtilidadPorEntrega(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.informeAlmacenSalida = this.serviceInforme.listenerInformeAlmacenPorUtilidadEntrega().subscribe(data=>{

      this.dataSource.data=data;
      data.forEach(fecha=>{

        let latest_date:any =this.datepipe.transform(fecha.transproducto.fecha, 'yyyy-MM-dd');
        fecha.fechaact = new Date(latest_date[0]) ;
      })
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper','producto.nombre','salidas','costo','monto','producto.precio','precioTotal','producto.utilidadInforme'];
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
