import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

@Component({
  selector: 'app-entre2fechas',
  templateUrl: './entre2fechas.component.html',
  styleUrls: ['./entre2fechas.component.css']
})
export class Entre2fechasComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private serviceItemProducto:ServiceItemProducto, private matDialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data: String, private matDialogRef: MatDialogRef<Entre2fechasComponent>, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }
  buscar(){
    if(this.data=='entre2FechasSalidas'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasSalidas(this.range.get('start')?.value,this.range.get('end')?.value);
    }
    if(this.data=='entre2FechasIngresos'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasIngresos(this.range.get('start')?.value,this.range.get('end')?.value);
    }
    if(this.data=='entre2FechasKardex'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasKardex(this.range.get('start')?.value,this.range.get('end')?.value);
    }
    if(this.data=='entre2fechasProductoValorado'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2FechasProductoValorado(this.range.get('start')?.value,this.range.get('end')?.value);
    }

    if(this.data=='entre2fechasProductoPeriodo'){
      this.serviceItemProducto.obtenerPorPeriodoEntre2Fechas(this.range.get('start')?.value,this.range.get('end')?.value);
    }

    var fechaInicio:any = this.datePipe.transform(this.range.get('start')?.value,"yyyy-MM-dd");
    var fechaFinal:any = this.datePipe.transform(this.range.get('end')?.value,"yyyy-MM-dd");
    var mandar = [fechaInicio, fechaFinal];
    this.matDialogRef.close(mandar);
    //this.matDialog.closeAll()
  }
}
