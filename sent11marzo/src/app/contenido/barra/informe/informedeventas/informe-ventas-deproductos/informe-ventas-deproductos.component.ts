import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceInformes } from 'src/app/services/Informes.service';

@Component({
  selector: 'app-informe-ventas-deproductos',
  templateUrl: './informe-ventas-deproductos.component.html',
  styleUrls: ['./informe-ventas-deproductos.component.css']
})
export class InformeVentasDeproductosComponent implements OnInit, OnDestroy {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns:String[]=[]
  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionInformeVentas:Subscription|any;
  constructor(private formBuilder:FormBuilder, private serviceInformes:ServiceInformes) { }
  ngOnDestroy(): void {
    if(this.subscriptionInformeVentas!=undefined) {
      this.subscriptionInformeVentas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:['']
    })
  }
  buscar(){
    if(this.subscriptionInformeVentas!=undefined) {
      this.subscriptionInformeVentas.unsubscribe();
    }
    this.serviceInformes.informesVentasPorProducto(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionInformeVentas = this.serviceInformes.listenerInformeVentasPorProducto().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=['notaventa.fecha','notaventa.nrodoc','producto.codigo','producto.nombre','producto.unidad.nombre','cantidad','precio','precioTotal']
    })
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
}
