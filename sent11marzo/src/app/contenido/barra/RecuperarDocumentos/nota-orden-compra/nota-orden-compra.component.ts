import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelOrdenCompra } from 'src/app/Models/OrdenCompra';
import { ServiceItemCompra } from 'src/app/services/ItemOrdenCompra.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceOrdenCompra } from 'src/app/services/OrdenCompra.service';

@Component({
  selector: 'app-nota-orden-compra',
  templateUrl: './nota-orden-compra.component.html',
  styleUrls: ['./nota-orden-compra.component.css']
})
export class NotaOrdenCompraComponent implements OnInit {
  dataSource= new MatTableDataSource<ModelOrdenCompra>();
  suscribOrdenCompra:Subscription|any;
  suscribrItems:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns = ['nrodoc','fecha','detalle','proveedor','insertar'];
 constructor( private dialog: MatDialog, private serviceOrdenCompra:ServiceOrdenCompra, private serviceRecuperarDoc: ServiceRecuperarDocumentosObservables, private serviceItemCompra:ServiceItemCompra, @Inject(MAT_DIALOG_DATA) private data: String) { }
 ngOnDestroy(): void {
   if(this.suscribOrdenCompra!=undefined){
     this.suscribOrdenCompra.unsubscribe();
   }
   if(this.suscribrItems!=undefined){
     this.suscribrItems.unsubscribe();

   }
 }
 ngAfterViewInit(): void {
   this.dataSource.sort = this.sort;
 }
 ngOnInit(): void {
   this.serviceOrdenCompra.obtenerOrdenesCompra();
   this.suscribOrdenCompra = this.serviceOrdenCompra.listenerOrdenCompraAll().subscribe(datos=>{
    for(var i = 0; i<datos.length;i++){
      if(datos[i].proveedor!=null){
        datos[i].proveedorNombre=datos[i].proveedor.nombre;
      }else{
        datos[i].proveedorNombre = "Sin Proveedor";
      }
    }
     this.dataSource.data = datos;
   })
 }
 insertarDocumento(id:Number){
  if(this.suscribrItems!=undefined){
    this.suscribrItems.unsubscribe();

  }
     if(this.data=="entrada"){
       this.serviceItemCompra.findByOrdenCompra(id);
       this.suscribrItems=this.serviceItemCompra.listenerByOrdenCompra().subscribe(datos=>{
         console.log(datos);
         this.serviceRecuperarDoc.nextOrdenCompra_Entrada(datos);
         this.dialog.closeAll();
       })
     }
     if(this.data=="proyecto"){
      this.serviceItemCompra.findByOrdenCompra(id);
      this.suscribrItems=this.serviceItemCompra.listenerByOrdenCompra().subscribe(datos=>{
        console.log(datos);
        this.serviceRecuperarDoc.nextOrdenCompra_Proyecto(datos);

        this.dialog.closeAll();
      })
    }
 }
 hacerFiltro(filtro:string){
   this.dataSource.filter=filtro;
 }
}
