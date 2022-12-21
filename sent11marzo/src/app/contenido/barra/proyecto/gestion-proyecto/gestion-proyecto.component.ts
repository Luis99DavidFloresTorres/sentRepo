import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-gestion-proyecto',
  templateUrl: './gestion-proyecto.component.html',
  styleUrls: ['./gestion-proyecto.component.css']
})
export class GestionProyectoComponent implements OnInit, OnDestroy {
  formProyecto : FormGroup|any;
  clientes:String[]=[];
  responsables:String[]=[];
  estados:String[]=[]
  ciudades:String[]=[];
  subscriptionCliente:Subscription|any;
  subscriptionGestionProyecto:Subscription|any;
  subscriptionCiudad:Subscription|any;
  subscriptionEstadosResponsables:Subscription|any;
  useract:String = "";
  fechaact:String = "";
  constructor(private formBuilder:FormBuilder, private serviceCliente:ServiceCliente, private dateAdapter:DateAdapter<any>, private serviceCiudad:ServiceCiudad, private matDialog:MatDialog, private serviceProyecto:ServiceProyecto, @Inject(LOCALE_ID) private locale: string) { }
  ngOnDestroy(): void {

   this.desubscribir();
  }
  desubscribir() {
    if(this.subscriptionCliente!=undefined) {
      this.subscriptionCliente.unsubscribe();
    }
    if(this.subscriptionGestionProyecto!=undefined) {
      this.subscriptionGestionProyecto.unsubscribe();
    }
    if(this.subscriptionCiudad!=undefined) {
      this.subscriptionCiudad.unsubscribe();
    }
    if(this.subscriptionEstadosResponsables!=undefined) {
      this.subscriptionEstadosResponsables.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.formProyecto = this.formBuilder.group({
      codigoProyecto:[''],
      nombre:[''],
      detalle:[''],
      cliente:[''],
      estadoForm:[''],
      responsableForm:[''],
      porcentajeDias:[''],
      ciudad:[''],
      fechaRegistro:[''],
      fechaInicio:[''],
      fechaFinal:['']
    })
    this.desubscribir();
    this.serviceCliente.allClientes();
    this.subscriptionCliente = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      var vectorCliente:String[] = [];
      data.forEach(cliente=>{
        vectorCliente.push(cliente.nombre);
      })
      this.clientes = [...new Set(vectorCliente)];
    })
    this.serviceCiudad.obtenerCiudades();
    this.subscriptionCiudad = this.serviceCiudad.listenerDatosCiudad().subscribe(data=>{
      var vectorCiudad:String[] = [];
      data.forEach(ciudad=>{
        vectorCiudad.push(ciudad.nombre);
      })
      this.ciudades = [...new Set(vectorCiudad)];
    })
    this.subscriptionGestionProyecto= this.serviceProyecto.listenerGestionProyecto().subscribe(data=>{
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

      this.formProyecto.patchValue({
        codigoProyecto:codigo,
        nombre:data.nombre,
        detalle:data.detalle,
        cliente:data.cliente.nombre,
        ciudad:data.ciudad,
        responsableForm:data.responsable,
        estadoForm:data.estado,
        fechaInicio:data.fechaini,
        fechaFinal:data.fechafin,
        fechaRegistro:data.fecha,
        porcentajeDias:data.alertaporc
      })
      var fechaString = formatDate(data.fechaact,'yyyy-MM-dd hh-mm',this.locale);
      this.fechaact = fechaString;
      this.useract = data.useract;
    })
    this.serviceProyecto.estadosResponsables();
    this.subscriptionEstadosResponsables = this.serviceProyecto.listenerEstadosResponsables().subscribe(datos=>{
      console.log(datos);
      var estadosV:String[]=[]
      var responsablesV:String[]=[]
      datos.forEach(data=>{
        estadosV.push(data.estado)
        responsablesV.push(data.responsable)
      })
      this.estados =[... new Set(estadosV)];
      this.responsables = [... new Set(responsablesV)];
    })
  }
  clienteS(nombre:String){}
  responsableS(nombre:String){}
  estadoS(nombre:String){}
  ciudadS(nombre:String){}
  buscarProyecto(){

    var mandar={'clase':'gestionProyecto'};
    this.matDialog.open(BuscarProyectoComponent,{width:'800px', height:'800px',data:mandar})
  }
  limpiarForm(){
    this.formProyecto.patchValue({
      codigoProyecto:'',
      nombre:'',
      detalle:'',
      cliente:'',
      estadoForm:'',
      responsableForm:'',
      porcentajeDias:'',
      ciudad:'',
      fechaInicio:'',
      fechaFinal:'',
      fechaRegistro:''
    })
  }
}
