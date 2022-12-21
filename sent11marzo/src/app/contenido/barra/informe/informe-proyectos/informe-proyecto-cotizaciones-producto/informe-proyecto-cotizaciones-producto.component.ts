import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { ItemProyectoModel } from '../../../item-proyecto/itemProyecto.model';
import { BuscarProyectoComponent } from '../../../proyecto/buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-informe-proyecto-cotizaciones-producto',
  templateUrl: './informe-proyecto-cotizaciones-producto.component.html',
  styleUrls: ['./informe-proyecto-cotizaciones-producto.component.css']
})
export class InformeProyectoCotizacionesProductoComponent implements OnInit, OnDestroy {
  documento:FormGroup|any;
  dataSource = new MatTableDataSource<ItemProyectoModel>();
  displayedColumns:String[] = []
  proyecto:ModelCotizacionProyecto|any;
  subscribeInformeProyectoCotizacion:Subscription|any;
  subscriptionItemsProyecto:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(public formBuilder:FormBuilder, private serviceInforme:ServiceInformes, private matDialog:MatDialog, private serviceProyecto:ServiceProyecto, private serviceItemProyecto:ServiceItemProyecto, private dateAdapter:DateAdapter<any>) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscribeInformeProyectoCotizacion!=undefined) {
      this.subscribeInformeProyectoCotizacion.unsubscribe();
    }
    if(this.subscriptionItemsProyecto!=undefined) {
      this.subscriptionItemsProyecto.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.documento  = this.formBuilder.group({
      nombre:[''],
      nro:[''],
      detalle:[''],
      cliente:[''],
      contacto:[''],
      fechaInicio:[''],
      fechaFinal:[''],
      fecha:['']
    })
    if(this.subscribeInformeProyectoCotizacion!=undefined) {
      this.subscribeInformeProyectoCotizacion.unsubscribe();
    }
    this.serviceProyecto.getInformeProyectoCotizacionProducto();
    this.subscribeInformeProyectoCotizacion = this.serviceProyecto.listenerInformeProyectoCotizacionProducto().subscribe(data=>{
      this.documento.patchValue({
        nombre:data.nombre,
        nro:data.nroprj,
        detalle:data.detalle,
        cliente:data.cliente.nombre,
        contacto:data.contactopre,
        fechaInicio:data.fechaini,
        fechaFinal:data.fechafin,
        fecha:data.fecha
      })
      this.proyecto = data;
      //console.log(data.id);
      if(this.subscriptionItemsProyecto!=undefined) {
        this.subscriptionItemsProyecto.unsubscribe();
      }
      this.serviceItemProyecto.obtenerByProyecto(data.id);
      this.subscriptionItemsProyecto = this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
        var boolean = true;
          datos.forEach(pro=>{
            if(pro.producto==null){
              boolean = false;
            }
          })
          if(boolean){
            this.dataSource.data = datos;
         // console.log(datos);
          this.displayedColumns = ['producto.codigo','producto.nombre','producto.unidad.nombre','producto.tipo','cantidad'];
          }else{
            this.dataSource.data = [];
          }

      })
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
  buscar(){
    var mandar = {clase:'informeProyectoCotizacionProducto'};
    this.matDialog.open(BuscarProyectoComponent,{data:mandar});
  }
}
