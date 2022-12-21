import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServicePais } from 'src/app/services/codificadores/pais.service';
import { ServiceRubro } from 'src/app/services/codificadores/rubro.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { BuscarProveedoresComponent } from '../buscar-proveedores/buscar-proveedores.component';

@Component({
  selector: 'app-gestion-proveedor',
  templateUrl: './gestion-proveedor.component.html',
  styleUrls: ['./gestion-proveedor.component.css']
})
export class GestionProveedorComponent implements OnInit, OnDestroy {
  ciudades:String[] = []
  rubros:String[] = []
  paises:String[]=[]
  proveedoresAll:ProveedorModel[] = []
  formGroup:FormGroup|any;
  subscriptionCiudad:Subscription|any;
  subscriptionRubro:Subscription|any;
  subscriptionPais:Subscription|any;
  subscriptionBuscarProveedor:Subscription|any;
  subscriptionAllProveedores:Subscription|any;
  index = 0;
  useract:String = "";
  fechaact:String = "";
  constructor(private formBuilder:FormBuilder, private servicePais:ServicePais, private serviceRubro:ServiceRubro, private serviceCiudad:ServiceCiudad, private serviceProveedor:ServiceProveedor, private dialog:MatDialog) { }
  ngOnDestroy(): void {
   this.desubscribir();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombreF:[''],
      codigoF:[''],
      direccionF:[''],
      telefonoF:[''],
      ciudadF:[''],
      rubroF:[''],
      paisF:[''],
      fechaCliente:[''],
      celularF:[''],
      faxF:[''],
      casillaF:[''],
      emailF:[''],
      cuentaBancariaF:['']
    })
    this.desubscribir();
    this.serviceProveedor.allProveedores();
    this.subscriptionAllProveedores = this.serviceProveedor.listenerProveedor().subscribe(datos=>{
        this.proveedoresAll = datos;
        this.cambiarValoresFormulario();
    })
    this.serviceCiudad.obtenerCiudades();
    this.subscriptionCiudad = this.serviceCiudad.listenerDatosCiudad().subscribe(datos=>{
      var vectorCiudad:String[]= []
      datos.forEach(ciudad=>{
        vectorCiudad.push(ciudad.nombre)
      })
      this.ciudades = vectorCiudad;
    })
    this.subscriptionBuscarProveedor = this.serviceProveedor.listenerGestionProveedor().subscribe(datos=>{

        this.limpiarFormulario();
        this.formGroup.patchValue({
          nombreF:datos.nombre,
          codigoF:datos.codigo,
          direccionF:datos.direccion,
          telefonoF:datos.telefono,
          ciudadF:datos.ciudad.nombre,
          rubroF:datos.rubro.nombre,
          pais:datos.pais.nombre,
          fechaCliente:datos.fechaact,
          celularF:datos.celular,
          faxF:datos.fax,
          casillaF:datos.casilla,
          emailF:datos.email,
          cuentaBancariaF:datos.cuentas

        })
        var fechaString:String = datos.fechaact.toString()
        this.fechaact = fechaString;
        this.useract = datos.useract;
        this.index = this.proveedoresAll.findIndex(data=>data==datos);
    })
    this.serviceRubro.obtenerRubros();
    this.subscriptionRubro = this.serviceRubro.listenerDatosRubro().subscribe(datos=>{
      var vectorRubros:String[]= []
      datos.forEach(rubro=>{
        vectorRubros.push(rubro.nombre)
      })
      this.rubros = vectorRubros;
    })
    this.servicePais.obtenerPaises();
    this.subscriptionPais = this.servicePais.listenerDatosPais().subscribe(datos=>{
      var vectorPais:String[]= []
      datos.forEach(pais=>{
        vectorPais.push(pais.nombre)
      })
      this.paises = vectorPais;
    })
  }
  ciudadS(nombre:any){
  }
  paisS(nombre:any){
  }
  rubroS(nombre:any){}
  buscarRubros(){}
  buscarPaises(){}
  buscarCiudades(){}
  buscarProveedor(){
    var enviar = {datos:this.proveedoresAll, clase:'gestionProveedor'};
    this.dialog.open(BuscarProveedoresComponent,{width:'700px',height:'800px', data:enviar});
  }
  desubscribir(){
    if(this.subscriptionCiudad!=undefined) {
      this.subscriptionCiudad.unsubscribe();
    }
    if(this.subscriptionRubro!=undefined) {
      this.subscriptionRubro.unsubscribe();
    }
    if(this.subscriptionPais!=undefined) {
      this.subscriptionPais.unsubscribe();
    }
    if(this.subscriptionAllProveedores!=undefined) {
      this.subscriptionAllProveedores.unsubscribe();
    }
  }
  primer(){
    this.index=0;
    this.cambiarValoresFormulario();
  }
  ultimo(){
    this.index=this.proveedoresAll.length-1;
    this.cambiarValoresFormulario();
  }
  anterior(){
    if(this.index>0){
      this.index--;
    }
    this.cambiarValoresFormulario();
  }
  posterior(){
    if(this.index<this.proveedoresAll.length-1){
      this.index++;
    }
    this.cambiarValoresFormulario();
  }
  cambiarValoresFormulario(){
    this.limpiarFormulario();
    if(this.proveedoresAll[this.index].ciudad!=undefined && this.proveedoresAll[this.index].pais != undefined && this.proveedoresAll[this.index].rubro != undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        ciudadF:this.proveedoresAll[this.index].ciudad.nombre,
        rubroF:this.proveedoresAll[this.index].rubro.nombre,
        paisF:this.proveedoresAll[this.index].pais.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad==undefined && this.proveedoresAll[this.index].pais == undefined && this.proveedoresAll[this.index].rubro == undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad==undefined && this.proveedoresAll[this.index].pais != undefined && this.proveedoresAll[this.index].rubro != undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        rubroF:this.proveedoresAll[this.index].rubro.nombre,
        paisF:this.proveedoresAll[this.index].pais.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad != undefined && this.proveedoresAll[this.index].pais == undefined && this.proveedoresAll[this.index].rubro != undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        ciudadF:this.proveedoresAll[this.index].ciudad.nombre,
        rubroF:this.proveedoresAll[this.index].rubro.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad != undefined && this.proveedoresAll[this.index].pais != undefined && this.proveedoresAll[this.index].rubro == undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        ciudadF:this.proveedoresAll[this.index].ciudad.nombre,
        paisF:this.proveedoresAll[this.index].pais.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad!=undefined && this.proveedoresAll[this.index].pais==undefined && this.proveedoresAll[this.index].rubro == undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        ciudadF:this.proveedoresAll[this.index].ciudad.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad==undefined && this.proveedoresAll[this.index].pais!=undefined && this.proveedoresAll[this.index].rubro == undefined ){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        paisF:this.proveedoresAll[this.index].pais.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }else if(this.proveedoresAll[this.index].ciudad==undefined && this.proveedoresAll[this.index].pais==undefined && this.proveedoresAll[this.index].rubro != undefined){
      this.formGroup.patchValue({
        nombreF:this.proveedoresAll[this.index].nombre,
        codigoF:this.proveedoresAll[this.index].codigo,
        direccionF:this.proveedoresAll[this.index].direccion,
        telefonoF:this.proveedoresAll[this.index].telefono,
        ciudadF:this.proveedoresAll[this.index].ciudad.nombre,
        paisF:this.proveedoresAll[this.index].pais.nombre,
        fechaCliente:this.proveedoresAll[this.index].fechaact,
        celularF:this.proveedoresAll[this.index].celular,
        faxF:this.proveedoresAll[this.index].fax,
        casillaF:this.proveedoresAll[this.index].casilla,
        emailF:this.proveedoresAll[this.index].email,
        cuentaBancariaF:this.proveedoresAll[this.index].cuentas
      })
    }
    var fechaString:String = this.proveedoresAll[this.index].fechaact.toString()
        this.fechaact = fechaString;
        this.useract = this.proveedoresAll[this.index].useract;
  }
  limpiarFormulario(){
    this.formGroup.patchValue({
      nombreF:"",
      codigoF:"",
      direccionF:"",
      telefonoF:null,
      ciudadF:null,
      rubroF:null,
      paisF:null,
      fechaCliente:null,
      celularF:null,
      faxF:"",
      casillaF:"",
      emailF:"",
      cuentaBancariaF:""
    })
    this.fechaact = "";
    this.useract = "";
  }
}
