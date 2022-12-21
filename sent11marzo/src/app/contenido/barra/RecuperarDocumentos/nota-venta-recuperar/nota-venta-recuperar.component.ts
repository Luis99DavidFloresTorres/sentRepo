import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelNotaventa } from 'src/app/Models/Notaventa.model';
import { ServiceItemnotaventa } from 'src/app/services/Itemnotaventa.service';
import { ServiceNotaVenta } from 'src/app/services/NotaVenta.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
@Component({
  selector: 'app-nota-venta-recuperar',
  templateUrl: './nota-venta-recuperar.component.html',
  styleUrls: ['./nota-venta-recuperar.component.css']
})
export class NotaVentaRecuperarComponent implements OnInit {
  dataSource= new MatTableDataSource<ModelNotaventa>();
  suscribrEntradas:Subscription|any;
  suscribrItems:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns = ['nrodoc','fecha','detalle','cliente','insertar'];
 constructor( private dialog: MatDialog, private serviceNotaVenta:ServiceNotaVenta, private serviceRecuperarDoc: ServiceRecuperarDocumentosObservables, private serviceItemVenta: ServiceItemnotaventa, @Inject(MAT_DIALOG_DATA) private data: String) { }
 ngOnDestroy(): void {
   if(this.suscribrEntradas!=undefined){
     this.suscribrEntradas.unsubscribe();
   }
   if(this.suscribrItems!=undefined){
     this.suscribrItems.unsubscribe();

   }
 }
 ngAfterViewInit(): void {
   this.dataSource.sort = this.sort;
 }
 ngOnInit(): void {
   this.serviceNotaVenta.obtenerNotasVenta();
   this.suscribrEntradas = this.serviceNotaVenta.listenerNotaVenta().subscribe(datos=>{
      for(var i = 0; i<datos.length;i++){
        if(datos[i].cliente!=null){
          datos[i].nombreCliente=datos[i].cliente.nombre;
        }else{
          datos[i].nombreCliente = "Sin Cliente";
        }
        if(datos[i].proyecto!=null){
          datos[i].nombreProyecto=datos[i].proyecto.nombre;
        }else{
          datos[i].nombreProyecto="Sin Proyecto"
        }
      }
     this.dataSource.data = datos;
   })
   if(this.data=="proyecto"){
    this.displayedColumns = ['nrodoc','fecha','proyecto','cliente','insertar'];
   }
 }
 insertarDocumento(id:Number){
  if(this.suscribrItems!=undefined){
    this.suscribrItems.unsubscribe();

  }
     if(this.data=="salida"){
       this.serviceItemVenta.findByNotaventa(id);
       this.suscribrItems=this.serviceItemVenta.listenerItemsVentaByNotaventa().subscribe(datos=>{
         this.serviceRecuperarDoc.nextNotaVenta_Salida(datos);
         this.dialog.closeAll();
       })
     }
     if(this.data=="proyecto"){
      this.serviceItemVenta.findByNotaventa(id);
      this.suscribrItems=this.serviceItemVenta.listenerItemsVentaByNotaventa().subscribe(datos=>{
        this.serviceRecuperarDoc.nextNotaVenta_Proyecto(datos);
        this.dialog.closeAll();
      })
    }
 }
 hacerFiltro(filtro:string){
   this.dataSource.filter=filtro;
 }
}
