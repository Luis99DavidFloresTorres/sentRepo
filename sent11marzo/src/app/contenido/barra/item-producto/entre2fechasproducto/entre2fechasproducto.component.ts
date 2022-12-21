import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { BuscarProductosComponent } from '../buscar-productos/buscar-productos.component';
import { Entre2fechasComponent } from '../entre2fechas/entre2fechas.component';

@Component({
  selector: 'app-entre2fechasproducto',
  templateUrl: './entre2fechasproducto.component.html',
  styleUrls: ['./entre2fechasproducto.component.css']
})
export class Entre2fechasproductoComponent implements OnInit,OnDestroy {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  nombreProducto = new FormControl({value:'',disabled:true});
  producto:ProductoModel|any = null;
  productoSubscription:Subscription|any;
  constructor(private serviceItemProducto:ServiceItemProducto, private matDialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data: String, private matDialogRef: MatDialogRef<Entre2fechasComponent>, private datePipe: DatePipe, private serviceProducto:ServiceProducto) { }
  ngOnDestroy(): void {
    if(this.productoSubscription!=undefined){
      this.productoSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if(this.productoSubscription!=undefined){
      this.productoSubscription.unsubscribe();
    }
    this.productoSubscription = this.serviceProducto.listenerProductoEntreFechas().subscribe(data=>{
        this.producto = data;
        this.nombreProducto.setValue(data.nombre);
    })
  }
  buscar(){

    if(this.data=='entre2FechasSalidasProductos'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasSalidasProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto);
    }
    if(this.data=='entre2FechasIngresosProductos'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasIngresosProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto);
    }
    if(this.data=='entre2FechasKardexProductos'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasKardexProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto);
    }
    if(this.data=='entre2FechasProductoPeriodo'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasProductoPeriodo(this.range.get('start')?.value,this.range.get('end')?.value, this.producto);
    }


    var fechaInicio:any = this.datePipe.transform(this.range.get('start')?.value,"yyyy-MM-dd");
    var fechaFinal:any = this.datePipe.transform(this.range.get('end')?.value,"yyyy-MM-dd");
    var mandar = [fechaInicio, fechaFinal,this.nombreProducto.value];
    this.matDialogRef.close(mandar);
    //this.matDialog.closeAll()
  }
  buscarProducto(){
    var mandar = {'clase':'entre2fechas'};
    this.matDialog.open(BuscarProductosComponent, {width:'800px',height:'800px',data:mandar});
  }
}
