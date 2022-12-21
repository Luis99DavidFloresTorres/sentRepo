import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ItemDescargoModel } from 'src/app/Models/ItemDescargo.model';
import { NotaDescargoModel } from 'src/app/Models/NotaDescargo.model';
import { ServiceItemDescargo } from 'src/app/services/ItemDescargo.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { tipoGastoModel } from '../../codificador/tipos-gasto/tipoGasto.model';
import { BuscarDescargoGastoComponent } from '../buscar-descargo-gasto/buscar-descargo-gasto.component';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-descargogastos',
  templateUrl: './descargogastos.component.html',
  styleUrls: ['./descargogastos.component.css']
})
export class DescargogastosComponent implements OnInit,OnDestroy {
  documento:FormGroup|any;
  proyectos:String[]=[]
  total=new FormControl();
  actualizadoPor = "";
  dataSource = new MatTableDataSource<ItemDescargoModel>();
  totalSuma:any=0
  subscriptionProyecto:Subscription|any;
  subscriptionNotaDescargo:Subscription|any;
  subscriptionBuscarProyecto:Subscription|any;
  displayedColumns:String[]=[]
  proyecto:ModelCotizacionProyecto|any;
  constructor(private formBuilder:FormBuilder, private matDialog:MatDialog, private serviceItemGasto:ServiceItemDescargo, private serviceProyecto:ServiceProyecto, private datePipe: DatePipe) { }
  ngOnDestroy(): void {
    if(this.subscriptionBuscarProyecto!=undefined){
      this.subscriptionBuscarProyecto.unsubscribe();
    }
    if(this.subscriptionNotaDescargo!=undefined){
      this.subscriptionNotaDescargo.unsubscribe();
    }
    if(this.subscriptionProyecto!=undefined){
      this.subscriptionProyecto.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.desubscribir();
    this.documento = this.formBuilder.group({
      nrodoc:[''],
      fecha:[''],
      notasolicitud:[''],
      monto:[''],
      proyecto:[''],
      responsable:[''],
      observaciones:[''],
      gasto:[''],
      detalle:[''],
    })
    this.serviceProyecto.byName();
    this.subscriptionProyecto = this.serviceProyecto.listenerByName().subscribe(data=>{

      this.proyectos=data;
    })
    this.subscriptionNotaDescargo = this.serviceItemGasto.listenerByNotaDescargo().subscribe(data=>{

      this.dataSource.data = data;
      this.displayedColumns = ["fecha","gasto.nombre","detalle","nrofact","precio"]
      this.limpiarFormulario();
      this.cambiarFormulario(data[0].notadescargo);
      data.forEach(total=>{
        this.totalSuma+=total.precio
      })
    })
    this.subscriptionBuscarProyecto = this.serviceProyecto.listenerDescargoGasto().subscribe((proyecto:ModelCotizacionProyecto)=>{
      this.proyecto=null;
      this.proyecto = proyecto;
      this.documento.patchValue({proyecto:proyecto.nombre})
    })
  }
  proyectoS(nombre:String){}
  buscar(){
    var mandar = {clase:'descargogasto'};
    this.matDialog.open(BuscarDescargoGastoComponent,{width:'700px',height:'700px',data:mandar});
  }
  cambiarFormulario(documento:NotaDescargoModel|any){
    console.log(documento);
    this.documento.patchValue({
        nrodoc:documento.nrodoc,
        fecha:documento.fecha,
        responsable:documento.responsable,
        observaciones:documento.detalle,
        proyecto:documento.proyecto.nombre,
        notasolicitud:documento.solicitud,
        monto:documento.montosol
    })
    var fecha:any = this.datePipe.transform(documento.fechaact,"dd-MM-yyyy h:mm:ss");
    this.total.setValue(documento.montoTotal);
    this.actualizadoPor="Actualizado por "+documento.responsable+" en: "+fecha;
  }
  limpiarFormulario(){
    this.totalSuma=0;
    this.actualizadoPor="";
    this.documento.patchValue({
        nrodoc:"",
        fecha:"",
        responsable:"",
        observaciones:"",
        proyecto:null,
        notasolicitud:""
    })
  }
  desubscribir(){
    if(this.subscriptionNotaDescargo!=undefined){
      this.subscriptionNotaDescargo.unsubscribe();
    }
    if(this.subscriptionProyecto != undefined){
      this.subscriptionProyecto.unsubscribe();
    }
    if(this.subscriptionBuscarProyecto!= undefined){
      this.subscriptionBuscarProyecto.unsubscribe();
    }
  }
  buscarProyecto(){
    this.matDialog.open(BuscarProyectoComponent,{width:'800px',height:'500px',data:{clase:'descargoGasto'}})
  }
}
