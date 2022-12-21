import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';

@Component({
  selector: 'app-entre2fechas-deposito',
  templateUrl: './entre2fechas-deposito.component.html',
  styleUrls: ['./entre2fechas-deposito.component.css']
})
export class Entre2fechasDepositoComponent implements OnInit, OnDestroy {
  depositos:String[]=[];
  deposito = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  depositoElegido:String="";
  depositoSubscription:Subscription|any;
  constructor(private serviceItemDeposito:ServiceItemDeposito,  private matDialogRef: MatDialogRef<Entre2fechasDepositoComponent>, private depositoService: ServiceDeposito, @Inject(MAT_DIALOG_DATA) private data:any) { }
  ngOnDestroy(): void {
    if(this.depositoSubscription!=undefined){
      this.depositoSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.depositoService.obtenerNombresDepositos();
    this.depositoSubscription = this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.depositos=datos;
    });
  }
  buscar(){
    if(this.data=='entre2FechasSalidas'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasSalidas(this.range.get('start')?.value,this.range.get('end')?.value, this.depositoElegido.toString());
    }
    if(this.data=='entre2FechasIngresos'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasIngresos(this.range.get('start')?.value,this.range.get('end')?.value, this.depositoElegido.toString());
    }
    if(this.data=='entre2FechasKardex'){
      this.serviceItemDeposito.obtenerPorPeriodoEntre2FechasKardex(this.range.get('start')?.value,this.range.get('end')?.value, this.depositoElegido.toString());
    }

    if(this.data=='entre2fechasProductoPeriodo'){
      console.log("entraaa")
      this.serviceItemDeposito.obtenerPorPeriodoEntre2Fechas(this.range.get('start')?.value,this.range.get('end')?.value,this.depositoElegido.toString());
    }

    var fecha1 = new Date(this.range.get('start')?.value);
    var fecha2 = new Date(this.range.get('end')?.value);

    var fecha1Formateada = fecha1.getFullYear()+"-"+(fecha1.getMonth()+1)+"-"+fecha1.getDate()
    var fecha2Formateada = fecha2.getFullYear()+"-"+(fecha2.getMonth()+1)+"-"+fecha2.getDate()

    var fecha = fecha1Formateada + " Hasta  "+fecha2Formateada
    this.matDialogRef.close(fecha);
  }
  depositoSeleccionado(deposito:String){
    this.depositoElegido =deposito;
  }
}
