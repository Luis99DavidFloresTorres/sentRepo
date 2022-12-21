import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-adjudicar-proyecto',
  templateUrl: './adjudicar-proyecto.component.html',
  styleUrls: ['./adjudicar-proyecto.component.css']
})
export class AdjudicarProyectoComponent implements OnInit, OnDestroy {
  formGroup :any;
  estado:String[]=[];
  subscriptionFormularioProyecto:Subscription|any;
  subscriptionEstado:Subscription|any;
  useract:String = "";
  fechaact:String = "";
  constructor(private formBuilder:FormBuilder, private serviceProyecto:ServiceProyecto, private matDialog:MatDialog, private dateAdapter:DateAdapter<any>, @Inject(LOCALE_ID) private locale: string) { }
  ngOnDestroy(): void {
    if(this.subscriptionFormularioProyecto!=undefined) {
      this.subscriptionFormularioProyecto.unsubscribe();
    }
    if(this.subscriptionEstado!=undefined) {
      this.subscriptionEstado.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.formGroup = this.formBuilder.group({
      estado:[''],
      fechaTransaccion:[''],
      codigoProyecto:[''],
      nombreProyecto:[''],
      detalle:[''],
      monto:['']
    })
    if(this.subscriptionFormularioProyecto!=undefined) {
      this.subscriptionFormularioProyecto.unsubscribe();
    }
    if(this.subscriptionEstado!=undefined) {
      this.subscriptionEstado.unsubscribe();
    }
    this.serviceProyecto.estados();
    this.subscriptionEstado  = this.serviceProyecto.listenerEstados().subscribe(datos=>{
      this.estado = datos;
    });
    this.subscriptionFormularioProyecto = this.serviceProyecto.listenerAdjudicarProyectoFormulario().subscribe(data=>{
      this.limpiarForm();
      this.fechaact="";
      this.useract="";
      var codigo = "P-SENT/"
      var value = data.nroprj;
      var oper = data.nroprj;
      switch(oper){
        case 411:
          codigo +="CIV/"+value
          break;
        case 421:
          codigo +="CP/"+value
          break;
        case 431:
          codigo +='CS/'+value;
          break;
      }

      //codigo+='ADM/'+value;
      this.formGroup.patchValue({
        estado:data.estado,
        fechaTransaccion:data.fecha,
        codigoProyecto:codigo,
        nombreProyecto:data.nombre,
        detalle:data.detalle,
        monto:data.totalventas
      })
      var fechaString = formatDate(data.fechaact,'yyyy-MM-dd hh-mm',this.locale);
      this.fechaact = fechaString;
      this.useract = data.useract;
    })
  }
  estadoFunction(){}
  buscar(){
    var mandar = {clase:'adjudicarProyecto'};
    this.matDialog.open(BuscarProyectoComponent,{width:'700px',height:'600px', data:mandar});
  }
  limpiarForm(){
    this.formGroup.patchValue({
      estado:null,
      fechaTransaccion:null,
      codigoProyecto:null,
      nombreProyecto:null,
      detalle:null,
      monto:null
    })
  }
}
