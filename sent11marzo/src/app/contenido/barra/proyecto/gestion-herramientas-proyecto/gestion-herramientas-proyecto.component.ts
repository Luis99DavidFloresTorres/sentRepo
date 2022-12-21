import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServicePais } from 'src/app/services/codificadores/pais.service';
import { ServiceRubro } from 'src/app/services/codificadores/rubro.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceActivoFijo } from 'src/app/services/ActivoFijo.service';
import { ActivoFijoModel } from 'src/app/Models/ActivoFijo.model';
import { ServiceUnidad } from 'src/app/services/codificadores/unidad.service';
import { DateAdapter } from '@angular/material/core';
import { BuscarHerramientaComponent } from '../buscar-herramienta/buscar-herramienta.component';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-gestion-herramientas-proyecto',
  templateUrl: './gestion-herramientas-proyecto.component.html',
  styleUrls: ['./gestion-herramientas-proyecto.component.css']
})
export class GestionHerramientasProyectoComponent implements OnInit, OnDestroy {
  situacion:String[] = []
  tipos:String[] = []
  estados:String[] = []
  unidades:String[]=[]
  situaciones:String[]= []
  herramientasAll:ActivoFijoModel[] = []; //
  formGroup:FormGroup|any;
  subscriptionUnidad:Subscription|any;
  subscriptionBuscarProveedor:Subscription|any;
  subscriptionAllHerramientas:Subscription|any;
  useract:String = "";
  fechaact:String ="";
  index = 0;
  constructor(private formBuilder:FormBuilder, private dateAdapter: DateAdapter<any>, private serviceUnidad:ServiceUnidad, private serviceRubro:ServiceRubro, private serviceCiudad:ServiceCiudad, private serviceProveedor:ServiceProveedor, private dialog:MatDialog, private serviceActivoFijo:ServiceActivoFijo, @Inject(LOCALE_ID) private locale: string) {
    this.dateAdapter.setLocale('es');
  }
  ngOnDestroy(): void {
   this.desubscribir();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombreF:[''],
      codigoF:[''],
      tipoF:[''],
      unidadF:[''],
      estadoF:[''],
      fechaIngresoF:[''],
      situacionF:[''],
      precioF:[''],
      detalleF:['']
    })
    this.desubscribir();
    this.serviceActivoFijo.herramientasPorNombre();
    this.subscriptionAllHerramientas= this.serviceActivoFijo.listenerHerramientasPorNombre().subscribe(datos=>{
      this.herramientasAll = datos;
      this.cambiarValoresFormulario();
      var estadosF:String[] = []
      var situacionesF:String[] = []
      var tiposF:String[] = []
      datos.forEach(herramienta=>{
        estadosF.push(herramienta.estado);
        situacionesF.push(herramienta.situacion);
        tiposF.push(herramienta.tipo);
      })
      let unique = [...new Set(situacionesF)];
      let estadoSet = [...new Set(estadosF)];
      let tipoSet = [...new Set(tiposF)];
      this.situaciones = unique;
      this.estados = estadoSet;
      this.tipos = tipoSet;
    })
    this.serviceUnidad.obtenerUnidades();
    this.subscriptionUnidad = this.serviceUnidad.listenerDatosUnidad().subscribe(datos=>{
      var vectorUnidad:String[]= []
      datos.forEach(pais=>{
        vectorUnidad.push(pais.nombre)
      })
      this.unidades = vectorUnidad;
    })
    this.serviceActivoFijo.listenerHerramienta().subscribe(datos=>{

      this.index = this.herramientasAll.findIndex(data=>datos==data);
      this.cambiarValoresFormulario();

    })
  }
  buscarHerramienta(){
    var enviar = {datos:this.herramientasAll, clase:'gestionHerramienta'};
    this.dialog.open(BuscarHerramientaComponent,{width:'700px',height:'800px', data:enviar});
  }
  desubscribir(){
    if(this.subscriptionUnidad!=undefined) {
      this.subscriptionUnidad.unsubscribe();
    }
    if(this.subscriptionAllHerramientas!=undefined) {
      this.subscriptionAllHerramientas.unsubscribe();
    }
  }
  tipoS(tipo:any){}
  unidadS(unidad:any){}
  estadoS(estado:any){}
  situacionS(situacion:any){}

  primer(){
    this.index=0;
    this.cambiarValoresFormulario();
  }
  ultimo(){
    this.index=this.herramientasAll.length-1;
    this.cambiarValoresFormulario();
  }
  anterior(){
    if(this.index>0){
      this.index--;
    }
    this.cambiarValoresFormulario();
  }
  posterior(){
    if(this.index<this.herramientasAll.length-1){
      this.index++;
    }
    this.cambiarValoresFormulario();
  }
  cambiarValoresFormulario(){
    this.limpiarFormulario();
    var stringfecha = formatDate(this.herramientasAll[this.index].fechaact,'yyyy-MM-dd hh-mm',this.locale);
    //var fechaString:String = this.herramientasAll[this.index].fechaact.toLocaleString()
    this.fechaact = stringfecha;
    this.useract = this.herramientasAll[this.index].useract;
    this.formGroup.patchValue({
      nombreF:this.herramientasAll[this.index].nombre,
      codigoF:this.herramientasAll[this.index].codigo,
      tipoF: this.herramientasAll[this.index].tipo,
      unidadF : this.herramientasAll[this.index].unidad,
      estadoF: this.herramientasAll[this.index].estado,
      fechaIngresoF:this.herramientasAll[this.index].fechaing,
      situacionF:this.herramientasAll[this.index].situacion,
      precioF:this.herramientasAll[this.index].precio,
      detalleF:this.herramientasAll[this.index].detalle
    })
  }
  limpiarFormulario(){
    this.formGroup.patchValue({
          nombreF:'',
          codigoF:'',
          tipoF:'',
          unidadF:'',
          estadoF:'',
          fechaIngresoF:'',
          situacionF:'',
          precioF:'',
          detalleF:''
    })
  }
}
