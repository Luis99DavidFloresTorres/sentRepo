import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelItemnotaventa } from 'src/app/Models/Itemnotaventa.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ItemsNotaVentaComponent } from '../../../notaventa/items-nota-venta/items-nota-venta.component';

@Component({
  selector: 'app-informe-ventas',
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.css']
})
export class InformeVentasComponent implements OnInit, OnDestroy {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<ModelItemnotaventa>();
  displayedColumns:String[]=[]
  subscriptionInformVentas:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceInformes:ServiceInformes, private dateAdapter:DateAdapter<any>) {
    this.dateAdapter.setLocale('es');
  }
  ngOnDestroy(): void {
    if(this.subscriptionInformVentas!=undefined) {
      this.subscriptionInformVentas.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:['']
    })
  }
  buscarVentas(){
    if(this.subscriptionInformVentas!=undefined) {
      this.subscriptionInformVentas.unsubscribe();
    }
    this.serviceInformes.informesventa(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionInformVentas = this.serviceInformes.listenerInformeVentas().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=['notaventa.fecha','notaventa.useract','notaventa.cliente.nombre','notaventa.nrodoc','notaventa.nrofact','notaventa.proyecto.nombre','costoTotal','precioTotal','impuestoReservado','utilidad']
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
}
