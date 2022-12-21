import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber, Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ModelTransproducto } from 'src/app/Models/Transproducto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceTransproducto } from 'src/app/services/Transproducto.service';

@Component({
  selector: 'app-nota-entrada-recuperar',
  templateUrl: './nota-entrada-recuperar.component.html',
  styleUrls: ['./nota-entrada-recuperar.component.css']
})
export class NotaEntradaRecuperarComponent implements OnInit, OnDestroy, AfterViewInit {
   dataSource= new MatTableDataSource<ModelTransproducto>();
   suscribrEntradas:Subscription|any;
   suscribrItems:Subscription|any;
   @ViewChild(MatSort) sort: MatSort | any;
   displayedColumns = ['nrodoc','fecha','detalle','proveedor','insertar'];
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
    this.serviceTransproducto.obtenerEntradasProducto();
    this.suscribrEntradas = this.serviceTransproducto.listenerEntradasProducto().subscribe(datos=>{
      //console.log(datos);
      /*for(var i = 0; i<datos.length;i++){
        if(datos[i].proveedor!=null){
          datos[i].proveedorNombre=datos[i].proveedor.nombre;
        }else{
          datos[i].proveedorNombre = "Sin Proveedor";
        }
      }*/
      this.dataSource.data = datos;
    })
  }
  insertarDocumento(id:Number){
      if(this.suscribrItems!=undefined){
        this.suscribrItems.unsubscribe();
      } // tal vez esta mal el listener pues se repite en ambos el mismo listener
      if(this.data=="entrada"){
        this.serviceItemProducto.obtenerItemsByTransproducto(id);
        this.suscribrItems=this.serviceItemProducto.listenerItemByTransproducto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextEntrada_Entrada(datos);
          this.dialog.closeAll();
        })
      }
      if(this.data=="salida"){
        this.serviceItemProducto.obtenerItemsByTransproducto(id);
        this.suscribrItems=this.serviceItemProducto.listenerItemByTransproducto().subscribe(datos=>{
          this.serviceRecuperarDoc.nextEntrada_Salida(datos);
          this.dialog.closeAll();
        })
      }


  }
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
}
