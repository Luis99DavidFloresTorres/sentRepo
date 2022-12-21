import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { BuscarNombreFechaComponent } from './buscar-nombre-fecha/buscar-nombre-fecha.component';
import { BuscarNombreComponent } from './buscar-nombre/buscar-nombre.component';
import { dateFindComponent } from './dateFind.component';
import { ItemProductoModel } from '../../../Models/itemProducto.model';
import { DateAdapter } from '@angular/material/core';
import { Entre2fechasComponent } from './entre2fechas/entre2fechas.component';
import { ServiceImprimirConsulta } from 'src/app/services/ImprimirConsultas.service';
import { Entre2fechasproductoComponent } from './entre2fechasproducto/entre2fechasproducto.component';
import { FiltradorDeConsultas } from 'src/app/Models/AdministrarFiltradorDeConsultas.model';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css'],
})
export class ItemProductoComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  displayedColumns = ['producto_id','codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  dataSource= new MatTableDataSource<ItemProductoModel>();
  formCheckboxGroup : FormGroup|any;
  archivos =[];
  modulo =  ""
  tituloGeneral="Por Fecha: "
  subtitulo="Periodo"
  valor= "Primeros 1000 ordenados por Fecha";
  limiteVector:Number|any;
  nuevoVector: ItemProductoModel[]|any;
  tabla=true;
  imagen=false;
  pais:ItemProductoModel[]|any;
  sujetoSubscripcion: Subscription|any;
  sujetoSubscripcionGeneral: Subscription|any;
  sujetoSubscripcion2FechasSalidas:Subscription|any;
  sujetoSubscripcion3FechasIngresos:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;

  administrarFiltradorDeConsultas:FiltradorDeConsultas|any= new FiltradorDeConsultas();
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
  constructor(private serviceItemProducto: ServiceItemProducto, private dialog: MatDialog, private formBuild: FormBuilder,
    private dateAdapter: DateAdapter<any>, private serviceImprimirConsulta:ServiceImprimirConsulta) {
    this.dateAdapter.setLocale('es');
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {
    this.modulo = ""
    this.formCheckboxGroup = this.formBuild.group({
      check1:['',[Validators.required]],
      check2:['',[Validators.required]],
      check3:['',[Validators.required]],
      check4:['',[Validators.required]],
  })

  if(this.sujetoSubscripcion!=undefined){
    this.sujetoSubscripcion.unsubscribe();
  }
  if(this.sujetoSubscripcion2FechasSalidas!=undefined){
    this.sujetoSubscripcion2FechasSalidas.unsubscribe();
  }
  if(this.sujetoSubscripcion3FechasIngresos!=undefined){
    this.sujetoSubscripcion3FechasIngresos.unsubscribe();
  }
  this.sujetoSubscripcion=this.serviceItemProducto.listenerMayorIngresos().subscribe((datos)=>{
    this.modulo ="ingreso"
    this.dataSource.data = datos;
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];

  })
  this.sujetoSubscripcion=this.serviceItemProducto.listenerKardex().subscribe((datos)=>{
    this.modulo ="kardex";
    this.dataSource.data = datos;
    this.agregarDataParaKardex(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion=this.serviceItemProducto.listenerMayorSalidas().subscribe((datos)=>{
    this.modulo ="salida";
    this.dataSource.data = datos;
    this.agregarDataParaMayorSalidas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];

  })
  this.sujetoSubscripcion = this.serviceItemProducto.listeneritemProductoPeriodo2Fechas().subscribe((datos)=>{
    this.modulo ="periodo";
    this.dataSource.data = datos;
    this.agregarDataPara2Fechas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion = this.serviceItemProducto.listeneritemProductoPeriodo2FechasProductoValorado().subscribe(datos=>{
    this.modulo ="periodo";
    this.dataSource.data = datos;
    this.agregarDataPara2Fechas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo','costo','costoTotal'];
  })
  this.sujetoSubscripcion2FechasSalidas = this.serviceItemProducto.listeneritemProductoPeriodo2FechasSalidas().subscribe((datos)=>{
    this.modulo ="salida";
    this.dataSource.data = datos;
    this.agregarDataParaMayorSalidas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];
  })
  this.sujetoSubscripcion2FechasSalidas = this.serviceItemProducto.listeneritemProductoPeriodo2FechasSalidasProductos().subscribe((datos)=>{
    this.modulo ="salida";
    this.dataSource.data = datos;

    this.agregarDataParaMayorSalidas(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];
  })
  this.sujetoSubscripcion3FechasIngresos = this.serviceItemProducto.listeneritemProductoPeriodo2FechasIngresos().subscribe((datos)=>{
    this.modulo ="ingreso";
    this.dataSource.data = datos;
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];
  })
  this.sujetoSubscripcion3FechasIngresos = this.serviceItemProducto.listeneritemProductoPeriodo2FechasIngresosProductos().subscribe((datos)=>{
    this.modulo ="ingreso";
    this.dataSource.data = datos;
    this.agregarDataParaMayorIngresos(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];
  })
  this.sujetoSubscripcion3FechasIngresos = this.serviceItemProducto.listeneritemProductoPeriodo2FechasKardex().subscribe((datos)=>{
    this.modulo ="kardex";
    this.dataSource.data = datos;
    this.agregarDataParaKardex(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion3FechasIngresos = this.serviceItemProducto.listeneritemProductoPeriodo2FechasKardexProductos().subscribe((datos)=>{
    this.modulo ="kardex";
    this.dataSource.data = datos;
    this.agregarDataParaKardex(datos);
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })

    this.serviceItemProducto.obtener1000Primeros();
    this.sujetoSubscripcion=this.serviceItemProducto.listener1000Datos().subscribe((datos)=>{
      this.modulo ="1000datos";

      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['observaciones','fechaact','codigo','nombre','cantidad','ope'];

    })
    this.sujetoSubscripcion=this.serviceItemProducto.listenerDatosItemProductoPeriodo().subscribe((datos)=>{
      this.modulo = "periodo";
      this.agregarDataPara2Fechas(datos);
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];

    })
    this.sujetoSubscripcion=this.serviceItemProducto.listeneritemProductoPeriodo2FechasProductoPeriodo().subscribe((datos)=>{
      this.modulo = "periodo";
      this.agregarDataPara2Fechas(datos);
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];

    })
  }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
    if(this.sujetoSubscripcion2FechasSalidas!=undefined){
      this.sujetoSubscripcion2FechasSalidas.unsubscribe();
    }
    if(this.sujetoSubscripcion3FechasIngresos!= undefined){
      this.sujetoSubscripcion3FechasIngresos.unsubscribe();
    }
    /*if(this.sujetoSubscripcionPeriodo!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }*/
  }
  pathDataAccessor(item: any, path: string): any {

    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.pathDataAccessor;

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
  productoPeriodo(){
    var dialogRef=this.dialog.open(dateFindComponent, {width:'300px', data:"periodo"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresos(){
    var dialogRef=this.dialog.open(dateFindComponent, {width:'300px', data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorSalidas(){
    var dialogRef = this.dialog.open(dateFindComponent, {width:'300px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }
    })
  }
  mayorSalidasNombre(){
    var dialogRef = this.dialog.open(BuscarNombreComponent,{width:'700px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombre(){

    var dialogRef = this.dialog.open(BuscarNombreComponent, {width:'700px',data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombreFecha(){

    var dialogRef = this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"ingresos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  mayorSalidasNombreFecha(){

    var dialogRef =this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string[])=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  entre2fechas(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"entre2fechasProductoPeriodo"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasProductoValorado(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"entre2fechasProductoValorado"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasSalidas(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"entre2FechasSalidas"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasIngresos(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"entre2FechasIngresos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasKardex(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"entre2FechasKardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasPeriodosProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductoComponent,{width:'700px',data:"entre2FechasProductoPeriodo"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasSalidasProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductoComponent,{width:'700px',data:"entre2FechasSalidasProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasIngresosProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductoComponent,{width:'700px',data:"entre2FechasIngresosProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  entre2fechasKardexProductos(){
    var dialogRef = this.dialog.open(Entre2fechasproductoComponent,{width:'700px',data:"entre2FechasKardexProductos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  kardexFecha(){
    var dialogRef = this.dialog.open(dateFindComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{

      this.valor=datos;
    })
  }
  kardexNombre(){
    var dialogRef =this.dialog.open(BuscarNombreComponent, {width:'700px',data:"kardex"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){

        this.valor=datos;
      }
    })
  }
  kardexNombreFecha(){
    var dialogRef = this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string[])=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }

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
    console.log(this.dataSource.filteredData); // para imprimir
  }
  imprimirTodo(){
    if(this.modulo =="ingreso"){

      this.serviceImprimirConsulta.imprimirMayorIngresos(this.dataSource.data);
    }else if(this.modulo =="salida"){
      console.log(this.dataSource.data);
      this.serviceImprimirConsulta.imprimirMayorSalidas(this.dataSource.data);
    }else if(this.modulo =="kardex"){

      this.serviceImprimirConsulta.imprimirKardex(this.dataSource.data);
    }else if(this.modulo =="periodo"){
      this.serviceImprimirConsulta.productoPeriodo(this.dataSource.data);
    }else if (this.modulo =="1000datos"){

      this.serviceImprimirConsulta.datos1000(this.dataSource.data);
    }
  }
  imprimirBuscados(){}
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
