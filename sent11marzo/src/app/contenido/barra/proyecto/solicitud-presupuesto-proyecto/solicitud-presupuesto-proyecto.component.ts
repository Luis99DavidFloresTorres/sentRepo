import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceNotaSolicitud } from 'src/app/services/NotaSolicitud.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';
import { BuscarnotasolicitudComponent } from '../buscarnotasolicitud/buscarnotasolicitud.component';

@Component({
  selector: 'app-solicitud-presupuesto-proyecto',
  templateUrl: './solicitud-presupuesto-proyecto.component.html',
  styleUrls: ['./solicitud-presupuesto-proyecto.component.css']
})
export class SolicitudPresupuestoProyectoComponent implements OnInit {
  solicitudPresupuesto:FormGroup|any;
  nombreUsuario:String = "";
  fechaact:String="";
  subscriptionSolicitudPresupuesto:Subscription|any;
  subscriptionNotaSolicitud:Subscription|any;
  constructor(private formBuilder:FormBuilder,private matDialog:MatDialog,private serviceNotaSolicitud:ServiceNotaSolicitud, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.solicitudPresupuesto = this.formBuilder.group({
      nrodoc:[''],
      operacionproyecto:[''],
      codigo:[''],
      cliente:[''],
      detalle:[''],
      montoBs:[''],
      montoUs:[''],
      concepto:[''],
      responsable:[''],
      fecha:[''],
      estado:[{value:'',disabled:true}]
    })
    this.subscriptionSolicitudPresupuesto = this.serviceNotaSolicitud.listenerSolicitudPresupuesto().subscribe(data=>{
      this.limpiarForm();
      var estado = "";
      if(data.estado=='t'){
        estado = "ACTIVO";
      }
      this.solicitudPresupuesto.patchValue({
          nrodoc:data.nrodoc,
          estado:estado,
          fecha:data.fecha,
          //operacionproyecto:data.,
          detalle:data.proyecto.detalle,
          cliente:data.proyecto.cliente,
          concepto:data.detalle,
          montoUs:data.montome,
          montoBs:data.monto,
          responsable:data.useract
      })
      this.fechaact = data.fechaact.toString();
      this.nombreUsuario = data.useract;

    })
    this.subscriptionNotaSolicitud = this.serviceNotaSolicitud.listenerNotaSolicitud().subscribe(data=>{
      this.limpiarForm();
      var estado = "";
      if(data.estado=='t'){
        estado = "ACTIVO";
      }
      var codigo = "P-SENT/"
      var value = data.proyecto.nroprj;
      var oper = data.proyecto.nroprj;
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

      this.solicitudPresupuesto.patchValue({
          operacionproyecto:data.proyecto.nombre,
          nrodoc:codigo,
          estado:estado,
          fecha:data.fecha,
          //operacionproyecto:data.,
          detalle:data.proyecto.detalle,
          cliente:data.proyecto.cliente.nombre,
          concepto:data.detalle,
          montoUs:data.montome,
          montoBs:data.monto,
          responsable:data.useract
      })
     var fecha:any = this.datePipe.transform(data.fechaact,"yyyy-MM-dd h:mm:ss");
      this.fechaact = fecha.toString();
      this.nombreUsuario = data.useract;
    });
  }
  buscarSolicitud(){
    var mandar={clase:'solicitudPresupuesto'};
    this.matDialog.open(BuscarnotasolicitudComponent,{width:'800px',height:'500px',data:mandar})
  }
  limpiarForm(){
    this.fechaact="";
    this.nombreUsuario="";
    this.solicitudPresupuesto.patchValue({
        nrodoc:"",
        operacionProyecto:"",
        codigo:"",
        cliente:"",
        detalle:"",
        montoBs:"",
        montoUs:"",
        concepto:"",
        responsable:"",
        fecha:"",
        estado:""
    })
  }
}
