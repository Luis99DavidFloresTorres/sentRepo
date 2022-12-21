import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { BuscarProductosComponent } from '../../item-producto/buscar-productos/buscar-productos.component';

@Component({
  selector: 'app-entre2fechasproductodeposito',
  templateUrl: './entre2fechasproductodeposito.component.html',
  styleUrls: ['./entre2fechasproductodeposito.component.css']
})
export class Entre2fechasproductodepositoComponent implements OnInit, OnDestroy {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  productoSubscription:Subscription|any;
  nombreProducto = new FormControl({value:'',disabled:true});
  producto:ProductoModel|any = null;
  depositoElegido:String="";
  depositos:String[]=[];
  deposito = new FormControl();
  depositoSubscription:Subscription|any;
  constructor(private serviceItemDeposito:ServiceItemDeposito, private depositoService:ServiceDeposito, private matDialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data: String, private matDialogRef: MatDialogRef<Entre2fechasproductodepositoComponent>, private datePipe: DatePipe, private serviceProducto:ServiceProducto) { }
  ngOnDestroy(): void {
    if(this.productoSubscription!=undefined) {
      this.productoSubscription.unsubscribe();
    }
    if(this.depositoSubscription!=undefined) {
      this.depositoSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if(this.productoSubscription!=undefined) {
      this.productoSubscription.unsubscribe();
    }
    this.productoSubscription = this.serviceProducto.listenerProductoEntreFechasDeposito().subscribe(data=>{
        this.producto = data;
        this.nombreProducto.setValue(data.nombre);
    })
    this.depositoService.obtenerNombresDepositos();
    this.depositoSubscription = this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.depositos=datos;
    });
  }
  buscar(){

    if(this.data=='entre2FechasSalidasProductos'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasSalidasProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto, this.depositoElegido.toString());
    }
    if(this.data=='entre2FechasIngresosProductos'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasIngresosProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto, this.depositoElegido.toString());
    }
    if(this.data=='entre2FechasKardexProductos'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasKardexProductos(this.range.get('start')?.value,this.range.get('end')?.value,this.producto, this.depositoElegido.toString());
    }
    if(this.data=='entre2FechasProductoPeriodo'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasProductoPeriodo(this.range.get('start')?.value,this.range.get('end')?.value, this.producto, this.depositoElegido.toString());
    }


    var fechaInicio:any = this.datePipe.transform(this.range.get('start')?.value,"yyyy-MM-dd");
    var fechaFinal:any = this.datePipe.transform(this.range.get('end')?.value,"yyyy-MM-dd");
    var mandar = [fechaInicio, fechaFinal,this.nombreProducto.value];
    this.matDialogRef.close(mandar);
    //this.matDialog.closeAll()
  }
  buscarProducto(){
    var mandar = {'clase':'entre2fechasDeposito'};
    this.matDialog.open(BuscarProductosComponent, {width:'800px',height:'800px',data:mandar});
  }
  depositoSeleccionado(deposito:String){
    this.depositoElegido =deposito;
  }
}
