import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceZona } from 'src/app/services/codificadores/zona.service';
import { BuscarClientesComponent } from '../../buscar-clientes/buscar-clientes.component';

@Component({
  selector: 'app-formulario-gestioncliente',
  templateUrl: './formulario-gestioncliente.component.html',
  styleUrls: ['./formulario-gestioncliente.component.css']
})
export class FormularioGestionclienteComponent implements OnInit, OnDestroy{
  ciudades:String[] = []
  zonas:String[] = []
  descuentos:String[]=[]
  index = 0;
  clienteAll:ModelCliente[]=[]
  subscriptionClienteEncontrado:Subscription|any;
  formGroup:FormGroup|any;
  subscriptionZona:Subscription|any;
  subscriptionDeposito:Subscription|any;
  useract:String = "";
  fechaact:String ="";
  tiposcliente:String[] = []

  subscribeAllCliente:Subscription|any;
  constructor(private formBuilder:FormBuilder, private dialog:MatDialog, private serviceCliente:ServiceCliente, private serviceZona:ServiceZona, private serviceCiudad:ServiceCiudad, private dateAdapter: DateAdapter<any>) { }
  ngOnDestroy(): void {
   this.desubscribir();
  }
  ngOnInit(): void {

    this.dateAdapter.setLocale('es');
    this.formGroup = this.formBuilder.group({
      codigoF:[''],
      direccionF:[''],
      telefonoF:[''],
      ciudadF:[''],
      zonaF:[''],
      fechaF:[''],
      nombreClienteF:[''],
      desctoF:[''],
      tipoclienteF:['']
    })
    this.desubscribir();
    this.serviceCliente.allClientes();
    this.subscribeAllCliente = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      var listatiposcliente:String[]=[]
      data.forEach(d=>{
          if(d.tipocliente!=undefined){
            listatiposcliente.push(d.tipocliente.nombre);
          }

      })
      var vectorCliente:ModelCliente[]=[]
      var vectorDescto : String[]=[]
      data.forEach(cliente=>{vectorCliente.push(cliente); vectorDescto.push(cliente.tipodescto)})
      this.clienteAll = vectorCliente;
      this.descuentos = [...new Set(vectorDescto)];
      this.tiposcliente = [...new Set(listatiposcliente)];
      this.cambiarValoresFormulario();
    })
    this.serviceZona.obtenerZonas();
    this.subscriptionZona = this.serviceZona.listenerDatosZona().subscribe(datos=>{
      var vectorZona:String[] = []
      datos.forEach(zona=>{vectorZona.push(zona.nombre); });
      this.zonas = vectorZona;
    })
    this.subscriptionClienteEncontrado = this.serviceCliente.listenerEncontrarGestionCliente().subscribe(datos=>{
      console.log(datos);
      var fecha:Date = new Date(this.clienteAll[this.index].fechaact);
      var fechaString:String = this.clienteAll[this.index].fechaact.toString()
      fecha.setDate(parseInt(fechaString.split("-")[2]));
      var tipocliente:String = ""
      if(datos.tipocliente!=undefined){

          tipocliente = datos.tipocliente.nombre;
      }
      if(datos.zona!=undefined){
        this.formGroup.patchValue({
          nombreClienteF:datos.nombre,
          codigoF:datos.codigo,
          direccionF:datos.direccion,
          telefonoF:datos.telefono,
          ciudadF:datos.ciudad.nombre,
          fechaF:fecha,
          zonaF:datos.zona.nombre,
          desctoF:datos.tipodescto,
          tipoclienteF:tipocliente
        })
      }else{
        this.formGroup.patchValue({
          nombreClienteF:datos.nombre,
          codigoF:datos.codigo,
          direccionF:datos.direccion,
          telefonoF:datos.telefono,
          ciudadF:datos.ciudad.nombre,
          fechaF:fecha,
          desctoF:datos.tipodescto,
          tipoclienteF:tipocliente
        })
      }
      var fechaString:String = this.clienteAll[this.index].fechaact.toString()
      this.fechaact = fechaString;
      this.useract = this.clienteAll[this.index].useract;
      this.index = this.clienteAll.findIndex(data=> data==datos);
    })
    this.serviceCiudad.obtenerCiudades();
    this.subscriptionDeposito=  this.serviceCiudad.listenerDatosCiudad().subscribe(datos=>{
      var ciudadesVector:String[] = []
      datos.forEach(deposito=>{
        ciudadesVector.push(deposito.nombre)
      })
      this.ciudades = ciudadesVector;
    })
  }
  desubscribir(){
    if(this.subscriptionClienteEncontrado!=undefined) {
      this.subscriptionClienteEncontrado.unsubscribe();
    }
    if(this.subscriptionZona!=undefined) {
      this.subscriptionZona.unsubscribe();
    }
    if(this.subscriptionDeposito!=undefined) {
      this.subscriptionDeposito.unsubscribe();
    }
    if(this.subscribeAllCliente!=undefined){
      this.subscribeAllCliente.unsubscribe();
    }
  }
  ciudadS(nombre:any){
  }
  zonaS(nombre:any){
  }
  desctoS(nombre:any){

  }

  buscarCiudades(){

  }
  buscarZonas(){}
  buscarClientes(){
    var enviar = {datos:this.clienteAll, clase:'gestionCliente'};
    this.dialog.open(BuscarClientesComponent,{width:'700px',height:'800px', data:enviar});
  }
  primer(){
    this.index = 0;
    this.cambiarValoresFormulario();
  }
  siguiente(){
    if(this.index<this.clienteAll.length-1){
      this.index++;
  }
    this.cambiarValoresFormulario();
  }
  anterior(){
    if(this.index>0){
      this.index--;
    }

    this.cambiarValoresFormulario();
  }
  ultimo(){
    this.index=this.clienteAll.length-1;
    this.cambiarValoresFormulario();
  }
  cambiarValoresFormulario(){
    console.log(this.clienteAll[this.index]);
    var fecha:Date = new Date(this.clienteAll[this.index].fechaact);
    var fechaString:String = this.clienteAll[this.index].fechaact.toString()
    fecha.setDate(parseInt(fechaString.split("-")[2]));
    this.vaciarFormulario();
    var tipocliente:String="";
    if(this.clienteAll[this.index].tipocliente!=undefined){

      tipocliente = this.clienteAll[this.index].tipocliente.nombre;
  }
    if(this.clienteAll[this.index].zona!=undefined && this.clienteAll[this.index].ciudad!=undefined){
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        ciudadF:this.clienteAll[this.index].ciudad.nombre,
        fechaF:fecha,
        desctoF:this.clienteAll[this.index].tipodescto,
        zonaF:this.clienteAll[this.index].zona.nombre,
        tipoclienteF:tipocliente
      })
    }else if(this.clienteAll[this.index].ciudad!=undefined && this.clienteAll[this.index].zona==undefined){
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        ciudadF:this.clienteAll[this.index].ciudad.nombre,
        desctoF:this.clienteAll[this.index].tipodescto,
        fechaF:fecha,
        tipoclienteF:tipocliente
      })
    }else if(this.clienteAll[this.index].ciudad==undefined && this.clienteAll[this.index].zona!=undefined){
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        zonaF:this.clienteAll[this.index].zona.nombre,
        desctoF:this.clienteAll[this.index].tipodescto,
        fechaF:fecha,
        tipoclienteF:tipocliente
      })
    }else if(this.clienteAll[this.index].ciudad==undefined && this.clienteAll[this.index].zona==undefined){
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        desctoF:this.clienteAll[this.index].tipodescto,
        fechaF:fecha,
        tipoclienteF:tipocliente
      })
    }
    var fechaString:String = this.clienteAll[this.index].fechaact.toString()
    this.fechaact = fechaString;
    this.useract = this.clienteAll[this.index].useract;
  }
  vaciarFormulario(){
    this.fechaact = "";
    this.useract = "";
    this.formGroup.patchValue({
      nombreClienteF:"",
      codigoF:"",
      direccionF:"",
      telefonoF:null,
      zonaF:null,
      fechaF:null,
      desctoF:null,
      ciudadF:null
    })
  }
  tipoclienteS(nombres:String){

  }
}
