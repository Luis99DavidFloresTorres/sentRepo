import { Component, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';
import { BuscarNombreFechaComponent } from '../item-producto/buscar-nombre-fecha/buscar-nombre-fecha.component';
import { ItemProductoModel } from '../../../Models/itemProducto.model';
import { BuscarFechaComponent } from './buscar-fecha/buscar-fecha.component';
import { BuscarNombreDepositoComponent } from './buscar-nombre-deposito/buscar-nombre-deposito.component';
import { BuscarNombreFechaDepositoComponent } from './buscar-nombre-fecha-deposito/buscar-nombre-fecha-deposito.component';
import { BuscarOperacionesComponent } from './buscar-operaciones/buscar-operaciones.component';
import { DateAdapter } from '@angular/material/core';
import { ServiceImprimirConsulta } from 'src/app/services/ImprimirConsultas.service';
import { Entre2fechasDepositoComponent } from './entre2fechas-deposito/entre2fechas-deposito.component';
import { FiltradorDeConsultas } from 'src/app/Models/AdministrarFiltradorDeConsultas.model';
import { Entre2fechasproductoComponent } from '../item-producto/entre2fechasproducto/entre2fechasproducto.component';
import { Entre2fechasproductodepositoComponent } from './entre2fechasproductodeposito/entre2fechasproductodeposito.component';

@Component({
  selector: 'app-item-deposito',
  templateUrl: './item-deposito.component.html',
  styleUrls: ['./item-deposito.component.css']
})
export class ItemDepositoComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  administrarFiltradorDeConsultas:FiltradorDeConsultas|any= new FiltradorDeConsultas();
  dataSource= new MatTableDataSource<ItemProductoModel>();
  formCheckboxGroup : FormGroup|any;
  archivos =[];
  tituloGeneral="Por Fecha: "

  datosObservaciones = [];
  datosFechaact =[];
  datosCodigo=[];
  datosNombre=[]
  datosCantidad=[]
  datosOpe=[]
  datosDepositoNombre=[]
  datosNroDoc = []
  datosIngresos =[]
  datosSalidas = []
  datosCliente=[]
  datosProveedor=[]
  datosSerial=[]
  datosSaldo=[]
  datosInvinicial=[]
  datosUnidad = []
  datosNrodocTrans=[]
  subtitulo="Periodo"
  valor= "Primeros 1000 ordenados por Fecha y Deposito";
  modulo = "";
  limiteVector:Number|any;
  nuevoVector: ItemProductoModel[]|any;
  tabla=true;
  imagen=false;
  pais:ItemProductoModel[]|any;


  observacionesControl = new FormControl();
  fechaControl= new FormControl();
  operacionControl = new FormControl();
  nroDocControl = new FormControl();
  depositoNombreControl = new FormControl();
  nombreControl = new FormControl();
  cantidadControl = new FormControl();
  codigoControl = new FormControl();
  ingresosControl = new FormControl();
  salidasControl = new FormControl();
  clienteControl = new FormControl();
  proveedorControl = new FormControl();
  serialControl = new FormControl();
  saldoControl= new FormControl();
  invinicialControl = new FormControl();
  unidadControl = new FormControl();

  sujetoSubscripcion: Subscription|any;
  sujetoSubscripcionGeneral: Subscription|any;

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;

  constructor(private serviceItemDeposito: ServiceItemDeposito, private dialog: MatDialog, private formBuild: FormBuilder,
    private dateAdapter: DateAdapter<any>, private serviceImprimirConsulta:ServiceImprimirConsulta) {
    this.dateAdapter.setLocale('es');
  }
  ngOnInit(): void {

    this.formCheckboxGroup = this.formBuild.group({
      check1:['',[Validators.required]],
  })
  if(this.sujetoSubscripcion!= undefined){
    this.sujetoSubscripcion.unsubscribe();
  }
  this.serviceItemDeposito.obtener1000DatosPorFechaYDeposito();
  this.sujetoSubscripcion=this.serviceItemDeposito.listener1000PorFechaYDeposito().subscribe((datos)=>{

    this.agregarDataParaSelectores1000Datos(datos);

    this.modulo ="1000Datos" // falta cambiar imprimir
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['observaciones','fechaact','codigo','nombre','cantidad','ope','depositoNombre'];

  })
  this.sujetoSubscripcion=this.serviceItemDeposito.listenerMayorIngresos().subscribe((datos)=>{
    this.modulo ="ingreso"
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];
  })
  this.sujetoSubscripcion=this.serviceItemDeposito.listenerOperaciones().subscribe((datos)=>{
    this.agregarDataParaSelectores1000Datos(datos);
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','codigo','nombre','cantidad','unidad','serial','deposito'];

  })

  this.sujetoSubscripcion=this.serviceItemDeposito.listenerKardex().subscribe((datos)=>{
    this.agregarDataParaKardex(datos);

    this.modulo = "kardex"
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listenerProductoPeriodo2Fechas().subscribe(datos=>{
    this.modulo ="periodo"
    this.agregarDataPara2Fechas(datos);
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion=this.serviceItemDeposito.listenerMayorSalidas().subscribe((datos)=>{
    this.modulo ="salida"
    this.agregarDataParaMayorSalidas(datos);
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listenerProductoPeriodo2FechasSalidas().subscribe((datos)=>{
    this.modulo ="salida";
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listenerProductoPeriodo2FechasIngresos().subscribe((datos)=>{
    this.modulo ="ingreso";
    this.dataSource.data = datos;
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listenerProductoPeriodo2FechasKardex().subscribe((datos)=>{
    this.modulo ="kardex";
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listeneritemProductoPeriodo2FechasIngresosProductos().subscribe((datos)=>{
    this.modulo ="ingreso";
    this.dataSource.data = datos;
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listeneritemProductoPeriodo2FechasSalidasProductos().subscribe((datos)=>{
    this.modulo ="salida";
    this.dataSource.data = datos;
    this.agregarDataParaMayorSalidas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];
  })
  this.sujetoSubscripcion = this.serviceItemDeposito.listeneritemProductoPeriodo2FechasKardexProductos().subscribe((datos)=>{
    this.modulo ="kardex";
    this.dataSource.data = datos;
    this.agregarDataParaKardex(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion=this.serviceItemDeposito.listeneritemProductoPeriodo2FechasProductoPeriodo().subscribe((datos)=>{
    this.modulo = "periodo";

    this.dataSource.data = datos;
    this.agregarDataPara2Fechas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];

  })
  /*  this.serviceItemDeposito.obtenerPorPeriodo("2012-07-07");
    this.sujetoSubscripcion=this.serviceItemDeposito.listenerDatosItemProductoPeriodo().subscribe((datos)=>{

      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['producto_id','codigo','nombre','unidad','invinicial','ingresos','salidas','saldo','enlace'];

    })*/


  }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
    if(this.sujetoSubscripcionGeneral!= undefined){
      this.sujetoSubscripcionGeneral.unsubscribe();
    }

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  entre2fechas(){
    var dialogRef = this.dialog.open(Entre2fechasDepositoComponent,{width:'700px',data:"entre2fechasProductoPeriodo"})
    dialogRef.afterClosed().subscribe((datos: string)=>{

      this.valor=datos;
    })
  }
  entre2fechasSalidas(){
    var dialogRef = this.dialog.open(Entre2fechasDepositoComponent,{width:'700px',data:"entre2FechasSalidas"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasIngresos(){
    var dialogRef = this.dialog.open(Entre2fechasDepositoComponent,{width:'700px',data:"entre2FechasIngresos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasKardex(){
    var dialogRef = this.dialog.open(Entre2fechasDepositoComponent,{width:'700px',data:"entre2FechasKardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasPeriodosProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductodepositoComponent,{width:'700px',data:"entre2FechasProductoPeriodo"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasSalidasProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductodepositoComponent,{width:'700px',data:"entre2FechasSalidasProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasIngresosProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductodepositoComponent,{width:'700px',data:"entre2FechasIngresosProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasKardexProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductodepositoComponent,{width:'700px',data:"entre2FechasKardexProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  cambiarValoresFalse(valorCheck:any){
    for(var elemento in this.formCheckboxGroup.controls){
          if(elemento != valorCheck){

              this.formCheckboxGroup.controls[elemento].setValue(false);
          }else{

          }
    }
  }
  productoValoradoContable(){
    this.cambiarValoresFalse( this.formCheckboxGroup.controls.check1);
    this.displayedColumns = ['nombre','invinicial','ingresos','salidas','saldo','costo','costoTotal'];
  }
  productoOperaciones(){

    var dialogRef=this.dialog.open(BuscarOperacionesComponent, {width:'300px', data:"periodo"});
    dialogRef.afterClosed().subscribe((datos: string)=>{

      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  mayorIngresos(){

    var dialogRef=this.dialog.open(BuscarFechaComponent, {width:'300px', data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }

    })
  }
  mayorSalidas(){

    var dialogRef = this.dialog.open(BuscarFechaComponent, {width:'300px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }

    })
  }
  mayorSalidasNombre(){

    var dialogRef = this.dialog.open(BuscarNombreDepositoComponent,{width:'700px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombre(){

    var dialogRef = this.dialog.open(BuscarNombreDepositoComponent, {width:'700px',data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombreFecha(){

    var dialogRef = this.dialog.open(BuscarNombreFechaDepositoComponent,{width:'700px',data:"ingresos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  mayorSalidasNombreFecha(){

    var dialogRef =this.dialog.open(BuscarNombreFechaDepositoComponent,{width:'700px',data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string[])=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  kardexFecha(){
    var dialogRef = this.dialog.open(BuscarFechaComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{

      this.valor=datos;
    })
  }
  kardexNombre(){

    var dialogRef =this.dialog.open(BuscarNombreDepositoComponent, {width:'700px',data:"kardex"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){

        this.valor=datos;
      }
    })
  }
  kardexNombreFecha(){

    var dialogRef = this.dialog.open(BuscarNombreFechaDepositoComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string[])=>{

      if(datos!=undefined){


        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  /*desubscribir(){

  }*/
  cortarDatos(datos:ItemProductoModel[]){
    var valor=[];

    var cortar = datos.length/3000;
    for(var i=0; i<cortar;i++){
      var resultado = datos.splice(0,3000);
      valor.push(resultado);
    }
    return valor;
  }
  fechas(input: string){

  }
  atras(){
    if(this.limiteVector==0){
      alert("acción no permitida");
    }else{
      this.limiteVector-=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  adelante(){
    if(this.limiteVector==this.nuevoVector.length-1){
      alert("acción no permitida");
    }else{
      this.limiteVector+=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  obtenerDatos(id: String){}
  eliminar(id:String){}
  abrirDialog(){}
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
  }
  imprimirTodo(){
    if(this.modulo =="ingreso"){
      this.serviceImprimirConsulta.imprimirMayorIngresos(this.dataSource.data);
    }else if(this.modulo =="salida"){
      this.serviceImprimirConsulta.imprimirMayorSalidas(this.dataSource.data);
    }else if(this.modulo =="kardex"){
      this.serviceImprimirConsulta.imprimirKardex(this.dataSource.data);
    }else if(this.modulo =="periodo"){
      this.serviceImprimirConsulta.productoPeriodo(this.dataSource.data);
    }else if (this.modulo =="1000Datos"){
      this.serviceImprimirConsulta.datos1000(this.dataSource.data);
    }
  }
  observacionesClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.observacionesControl.value==data.observaciones){
          nuevoValorDataSource.push(data);
      }
    })

    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  fechaClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []

    this.dataSource.data.forEach(data=>{
      if(this.fechaControl.value==data.fechaact){
          nuevoValorDataSource.push(data);
      }
    })

    this.actualizarSelector(nuevoValorDataSource)

    this.dataSource.data=nuevoValorDataSource;
  }
  agregarDataParaSelectores1000Datos(data:ItemProductoModel[]){
    this.administrarFiltradorDeConsultas.reiniciarValores();
    this.administrarFiltradorDeConsultas.filtrar1000DatosPorFechaYDeposito(data);
    this.datosObservaciones = this.administrarFiltradorDeConsultas.observaciones;
    this.datosFechaact = this.administrarFiltradorDeConsultas.fechaact;
    this.datosCodigo = this.administrarFiltradorDeConsultas.codigo;
    this.datosNombre=this.administrarFiltradorDeConsultas.nombre
    this.datosCantidad=this.administrarFiltradorDeConsultas.cantidad;
    this.datosOpe= this.administrarFiltradorDeConsultas.ope;
    this.datosDepositoNombre = this.administrarFiltradorDeConsultas.depositoNombre;
  }
  agregarDataParaMayorIngresos(data:ItemProductoModel[]){
    this.administrarFiltradorDeConsultas.reiniciarValores();
    this.administrarFiltradorDeConsultas.filtrarMayorIngresos(data);
    this.datosObservaciones = this.administrarFiltradorDeConsultas.observaciones;
    this.datosFechaact = this.administrarFiltradorDeConsultas.fechaact;
    this.datosNroDoc = this.administrarFiltradorDeConsultas.nrodoc;
    this.datosProveedor=this.administrarFiltradorDeConsultas.proveedorNombre;
    this.datosCantidad=this.administrarFiltradorDeConsultas.cantidad;
    this.datosOpe= this.administrarFiltradorDeConsultas.ope;
    this.datosSerial= this.administrarFiltradorDeConsultas.serial;
    this.datosIngresos = this.administrarFiltradorDeConsultas.ingresos;
    this.datosDepositoNombre = this.administrarFiltradorDeConsultas.depositoNombre;
  }
  agregarDataParaKardex(data:ItemProductoModel[]){
    this.administrarFiltradorDeConsultas.reiniciarValores();
    this.administrarFiltradorDeConsultas.filtrarKardex(data);
    this.datosObservaciones = this.administrarFiltradorDeConsultas.observaciones;
    this.datosFechaact = this.administrarFiltradorDeConsultas.fechaact;
    this.datosCodigo = this.administrarFiltradorDeConsultas.codigo;
    this.datosNroDoc = this.administrarFiltradorDeConsultas.nrodoc;
    this.datosCantidad=this.administrarFiltradorDeConsultas.cantidad;
    this.datosOpe= this.administrarFiltradorDeConsultas.ope;
    this.datosSerial= this.administrarFiltradorDeConsultas.serial;
    this.datosIngresos = this.administrarFiltradorDeConsultas.ingresos;
    this.datosSalidas = this.administrarFiltradorDeConsultas.salidas;
    this.datosInvinicial = this.administrarFiltradorDeConsultas.invinicial;
    this.datosSaldo= this.administrarFiltradorDeConsultas.saldo;
    this.datosDepositoNombre = this.administrarFiltradorDeConsultas.depositoNombre;
  }
  agregarDataParaMayorSalidas(data:ItemProductoModel[]){
    this.administrarFiltradorDeConsultas.reiniciarValores();
    this.administrarFiltradorDeConsultas.filtrarMayorSalidas(data);
    this.datosObservaciones = this.administrarFiltradorDeConsultas.observaciones;
    this.datosFechaact = this.administrarFiltradorDeConsultas.fechaact;
    this.datosNroDoc = this.administrarFiltradorDeConsultas.nrodoc;
    this.datosCliente=this.administrarFiltradorDeConsultas.clienteNombre;
    this.datosCantidad=this.administrarFiltradorDeConsultas.cantidad;
    this.datosOpe= this.administrarFiltradorDeConsultas.ope;
    this.datosSerial= this.administrarFiltradorDeConsultas.serial;
    this.datosSalidas = this.administrarFiltradorDeConsultas.salidas;
    this.datosDepositoNombre = this.administrarFiltradorDeConsultas.depositoNombre;
  }
  agregarDataPara2Fechas(data:ItemProductoModel[]){
    this.administrarFiltradorDeConsultas.reiniciarValores();
    this.administrarFiltradorDeConsultas.filtrar2Fechas(data);
    this.datosUnidad= this.administrarFiltradorDeConsultas.unidad;
    this.datosNombre= this.administrarFiltradorDeConsultas.nombre;
    this.datosSalidas = this.administrarFiltradorDeConsultas.salidas;
    this.datosIngresos = this.administrarFiltradorDeConsultas.ingresos;
    this.datosInvinicial = this.administrarFiltradorDeConsultas.invinicial;
    this.datosSaldo= this.administrarFiltradorDeConsultas.saldo;
    this.datosCodigo=this.administrarFiltradorDeConsultas.codigo;
    this.datosDepositoNombre = this.administrarFiltradorDeConsultas.depositoNombre;
  }
  actualizarSelector(data:ItemProductoModel[]){
    if(this.modulo=="ingreso"){
      this.agregarDataParaMayorIngresos(data);
    }else if(this.modulo=="kardex"){
      this.agregarDataParaKardex(data);
    }else if(this.modulo=="salida"){
      this.agregarDataParaMayorSalidas(data);
    }else if(this.modulo=="1000Datos"){
      this.agregarDataParaSelectores1000Datos(data);
    }else if(this.modulo=="periodo"){
      this.agregarDataPara2Fechas(data);
    }
  }
  operacionClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.operacionControl.value==data.ope){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource);
    this.dataSource.data=nuevoValorDataSource;
  }
  nombreClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []

    this.dataSource.data.forEach(data=>{
      if(this.nombreControl.value==data.nombre){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource);
    this.dataSource.data=nuevoValorDataSource;
  }
  nombreDepositoClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.depositoNombreControl.value==data.transproducto.deposito.nombre){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }

  cantidadClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.cantidadControl.value==data.cantidad){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  codigoClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.codigoControl.value==data.codigo){
          nuevoValorDataSource.push(data);
      }
    })
    /*if(this.modulo=="1000Datos"){
      this.agregarDataParaSelectores1000Datos(nuevoValorDataSource);
    }
    if(this.modulo=="kardex"){
      this.agregarDataParaKardex(nuevoValorDataSource);
    }*/
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  nroDocClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.nroDocControl.value==data.nrodoc){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  proveedorClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.proveedorControl.value==data.proveedorNombre){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  };
  serialClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.serialControl.value==data.serial){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  };
  ingresosClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.ingresosControl.value==data.ingresos){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  clienteClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.clienteControl.value==data.clienteNombre){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  salidasClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []

    this.dataSource.data.forEach(data=>{
      if(this.salidasControl.value==data.salidas){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  saldoClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []
    this.dataSource.data.forEach(data=>{
      if(this.saldoControl.value==data.saldo){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  invinicialClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []

    this.dataSource.data.forEach(data=>{
      if(this.invinicialControl.value==data.invinicial){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
  unidadClick(){
    var nuevoValorDataSource:ItemProductoModel[] = []

    this.dataSource.data.forEach(data=>{
      if(this.unidadControl.value==data.unidad){
          nuevoValorDataSource.push(data);
      }
    })
    this.actualizarSelector(nuevoValorDataSource)
    this.dataSource.data=nuevoValorDataSource;
  }
}
