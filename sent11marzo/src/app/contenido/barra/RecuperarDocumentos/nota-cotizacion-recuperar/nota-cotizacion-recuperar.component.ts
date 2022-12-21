import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ServiceCotizacionCliente } from 'src/app/services/CotizacionCliente.service';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';

@Component({
  selector: 'app-nota-cotizacion-recuperar',
  templateUrl: './nota-cotizacion-recuperar.component.html',
  styleUrls: ['./nota-cotizacion-recuperar.component.css']
})
export class NotaCotizacionRecuperarComponent implements OnInit {

  dataSource= new MatTableDataSource<ModelCotizacionProyecto>();
   suscribrEntradas:Subscription|any;
   suscribrItems:Subscription|any;
   @ViewChild(MatSort) sort: MatSort | any;
   displayedColumns = ['fecha','nroprj','nombre','estado','cliente','insertar'];
  constructor( private dialog: MatDialog, private serviceProyecto:ServiceProyecto, private serviceRecuperarDoc: ServiceRecuperarDocumentosObservables, private serviceItemProyecto:ServiceItemProyecto, @Inject(MAT_DIALOG_DATA) private data: String) { }
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
    this.serviceProyecto.obtenerTodosProyectos();
    this.suscribrEntradas = this.serviceProyecto.listenerTodosProyecto().subscribe(datos=>{
        for(var i = 0; i<datos.length;i++){
          if(datos[i].cliente!=null){
            datos[i].nombreCliente=datos[i].cliente.nombre;
          }else{
            datos[i].nombreCliente = "Sin Cliente";
          }
        }
      this.dataSource.data = datos;
    })
  }
  insertarDocumento(id:Number){
    if(this.suscribrItems!=undefined){
      this.suscribrItems.unsubscribe();
    }   /// tal vez aqui este mal por los listener que se repiten.
      if(this.data=="salida"){
        this.serviceItemProyecto.obtenerByProyecto(id);
        this.suscribrItems=this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextProyecto_Salida(datos);
          this.dialog.closeAll();
        })
      }
      if(this.data=="notaventa"){
        this.serviceItemProyecto.obtenerByProyecto(id);
        this.suscribrItems=this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextProyecto_NotaVenta(datos);
          this.dialog.closeAll();
        })
      }
      if(this.data=="proyecto"){
        this.serviceItemProyecto.obtenerByProyecto(id);
        this.suscribrItems=this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextProyecto_Proyecto(datos);
          this.dialog.closeAll();
        })
      }
  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
}
