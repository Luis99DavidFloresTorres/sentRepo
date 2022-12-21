import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelTransproducto } from 'src/app/Models/Transproducto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceTransproducto } from 'src/app/services/Transproducto.service';

@Component({
  selector: 'app-nota-salida-recuperar',
  templateUrl: './nota-salida-recuperar.component.html',
  styleUrls: ['./nota-salida-recuperar.component.css']
})
export class NotaSalidaRecuperarComponent implements OnInit {

  dataSource= new MatTableDataSource<ModelTransproducto>();
   suscribrEntradas:Subscription|any;
   suscribrItems:Subscription|any;
   @ViewChild(MatSort) sort: MatSort | any;
   displayedColumns = ['nrodoc','fecha','proyecto.nombre','cliente.nombre','insertar'];
  constructor( private dialog: MatDialog, private serviceTransproducto:ServiceTransproducto, private serviceRecuperarDoc: ServiceRecuperarDocumentosObservables, private serviceItemProducto:ServiceItemProducto, @Inject(MAT_DIALOG_DATA) private data: String) { }
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
    this.serviceTransproducto.obtenerSalidasProducto();
    this.suscribrEntradas = this.serviceTransproducto.listenerSalidasProducto().subscribe(datos=>{
      for(var i = 0; i<datos.length;i++){
        if(datos[i].cliente!=null){
          datos[i].clienteNombre=datos[i].cliente.nombre;
        }else{
          datos[i].clienteNombre = "Sin Cliente";
        }
        if(datos[i].proyecto!=null){
          datos[i].proyectoNombre=datos[i].proyecto.nombre;
        }else{
          datos[i].proyectoNombre = "Sin Proyecto";
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
        this.serviceItemProducto.obtenerItemsByTransproducto(id);
        this.suscribrItems=this.serviceItemProducto.listenerItemByTransproducto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextSalida_Entrada(datos);
          this.dialog.closeAll();
        })
      }
      if(this.data=="salida"){
        this.serviceItemProducto.obtenerItemsByTransproducto(id);
        this.suscribrItems=this.serviceItemProducto.listenerItemByTransproducto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextSalida_Salida(datos);
          this.dialog.closeAll();
        })
      }
  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
}
