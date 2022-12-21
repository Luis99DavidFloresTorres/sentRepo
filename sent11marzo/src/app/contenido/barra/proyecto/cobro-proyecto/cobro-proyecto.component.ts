import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-cobro-proyecto',
  templateUrl: './cobro-proyecto.component.html',
  styleUrls: ['./cobro-proyecto.component.css']
})
export class CobroProyectoComponent implements OnInit {

  formGroup :any;
  estado:String[]=[];
  useract:String = "";
  fechaact:String = "";
  subscriptionFormularioProyecto:Subscription|any;
  constructor(private formBuilder:FormBuilder, private serviceProyecto:ServiceProyecto, private matDialog:MatDialog, private dateAdapter:DateAdapter<any>,  @Inject(LOCALE_ID) private locale: string) { }
  ngOnDestroy(): void {
    if(this.subscriptionFormularioProyecto!=undefined) {
      this.subscriptionFormularioProyecto.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.formGroup = this.formBuilder.group({
      fechaTransaccion:[''],
      codigoProyecto:[''],
      nombreProyecto:[''],
      detalle:[''],
      fechacobro:[''],
      fechacobroret:[''],
      montocobrado:[''],
      montoretencion:['']
    })
    if(this.subscriptionFormularioProyecto!=undefined) {
      this.subscriptionFormularioProyecto.unsubscribe();
    }
    this.subscriptionFormularioProyecto = this.serviceProyecto.listenerCobroProyecto().subscribe(data=>{
      this.useract= "";
      this.fechaact= "";
      this.limpiarForm();
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

      this.formGroup.patchValue({
        fechaTransaccion:data.fecha,
        codigoProyecto:codigo,
        nombreProyecto:data.nombre,
        detalle:data.detalle,
        fechacobroret:data.fecharet,
        fechacobrado:data.fechacob,
        monto:data.totalventas
      })
      var fechaString = formatDate(data.fechaact,'dd-MM-yyyy hh-mm',this.locale);
      this.fechaact = fechaString;
      this.useract = data.useract;
    })
  }
  estadoFunction(){}
  buscar(){
    var mandar = {clase:'cobroProyecto'};
    this.matDialog.open(BuscarProyectoComponent,{width:'700px',height:'700px',data:mandar});

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
