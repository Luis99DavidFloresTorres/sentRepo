import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { exportarDescuento, ModelCliente } from 'src/app/Models/Cliente.model';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-encabezado-cotizcliente',
  templateUrl: './encabezado-cotizcliente.component.html',
  styleUrls: ['./encabezado-cotizcliente.component.css']
})
export class EncabezadoCotizclienteComponent implements OnInit, OnChanges, OnDestroy {

  options:String[] = [];
  transporte:String[] = [];
  ciudad:String[]=[];
  deposito: String|any=[];
  sujeto = new Subject();
  formGroup:any;
  operacionProyecto:String[]=[];
  date:Date=  new Date();
  cancelar=false;
  filteredCliente: Observable<String[]>|any;
  enviarDatos= new Subject<ModelCotizacionProyecto>();
  suscriberCliente :Subscription| any;
  suscriberAllCliente :Subscription| any;
  subscribProyectoRecuperado:Subscription|any;
  subscribOrdenCompraRecuperar:Subscription|any;
  subscribNotaVentaRecuperar:Subscription| any;
  clienteModel:ModelCliente|any;
  @Input() nroDocumento="neutro";
  @Input() boton:any;
  @Input() recuperar :any;
  @Output() habilitarGuardar = new EventEmitter<boolean>();//exportarDescuento
  @Output() numeroDestruirAlSalir = new EventEmitter<Number>();
  @Output() mandarTransaccionEncabezado = new EventEmitter<ModelCotizacionProyecto>();
  constructor(private formBuilder:FormBuilder, private serviceUltimoNro: ServiceUltimoNro, private serviceCliente:ServiceCliente, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables) {}
  ngOnDestroy(): void {

    this.desubscribitSubscriptores();
  }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes.nroDocumento!=undefined){
      if(changes.nroDocumento.currentValue=="crear"){

        this.serviceUltimoNro.crearNroProyecto();
        this.serviceUltimoNro.listenerNroProyecto().subscribe(datos=>{
          this.formGroup.controls['nroDoc'].setValue(datos)
          this.formGroup.controls['fechaTransaccion'].setValue(new Date);
          this.formGroup.get('proyectoOperacion').setValue("311:COMPRA");
          this.numeroDestruirAlSalir.emit(this.formGroup.controls['nroDoc'].value)
          if(!this.formGroup.invalid){
            this.habilitarGuardar.emit(false);
          }else{
            this.habilitarGuardar.emit(true);
          }
        })
      }
      if(changes.nroDocumento.currentValue=="destruir"){

        this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"proyecto", 1);
        this.limpiarFormulario();
        this.desubscribitSubscriptores();
      }
    }
    if(changes.boton!=undefined){
      if(!changes.boton.isFirstChange()){
        this.cancelar = !changes.boton.previousValue['cancelar'];
        if(this.cancelar){
          this.formGroup.patchValue({
            nroDoc:0,
            fechaTransaccion:""
          })
          this.limpiarFormulario();
          this.desubscribitSubscriptores();
        }else{
          this.formGroup.patchValue({
            nroDoc:0,
            fechaTransaccion:this.date
          })
        }
      }
    }

    if(changes.recuperar!=undefined){
      if((changes.recuperar.currentValue==true)){
        this.enviarDatos.next();
        this.recuperar =false;
        this.desubscribitSubscriptores();
      }
    }
  }
  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      nroDoc:['',[Validators.required]],
      fechaTransaccion:['',[Validators.required]],
      nroReferencia:[''],
      nombre:[''],
      detalle:[''],
      cliente:[''],
      descto:[{value:'',disabled:true}],
      observaciones:[''],
      entrega:[''],
      impuestos:[''],
      validez:[''],
      garantia:[''],
      formapago:[''],
      nota:[''],
      proyectoOperacion:['']
    })
    this.serviceCliente.allClientes();
    this.suscriberAllCliente=this.serviceCliente.listenerAllClientes().subscribe(data=>{
      data.forEach(cliente=>{
        this.options.push(cliente.nombre);
      })
      this.filteredCliente = this.formGroup.get('cliente').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
    });
    this.enviarDatos.subscribe(datos=>{
      this.obtenerTransaccionProducto();
    });
    this.activarSubscriptores();
    this.operacionProyecto = [
      "311:COMPRA",
      "312:IMPORTACION",
      "314:CAMBIO",
      "315:DEVOLUCION PROY",
      "316:DEVOLUCION",
      "317:DONACION",
      "318:TRASPASO",
      "329:ALTA AUD"
    ];
  }
  llenarFormularioDocumentoProyecto(){

    return this.serviceRecuperarDocumentos.listenerSujetoProyecto_Proyecto().subscribe(datos=>{
      this.limpiarFormularioSinNrodoc();
      this.activarSubscriptores();

      var detalle = datos[0].proyecto.detalle;
      var observaciones = datos[0].proyecto.observaciones;
      var nombre = datos[0].proyecto.nombre;
      var nroDoc = datos[0].proyecto.nroprj;
      var entrega = datos[0].proyecto.entrega;
      var impuestos = datos[0].proyecto.impuestos;
      var validez = datos[0].proyecto.validez;
      var garantia = datos[0].proyecto.garantia;
      var formapago = datos[0].proyecto.formapago;
      var nota = datos[0].proyecto.nota;
      this.formGroup.get('proyectoOperacion').setValue("311:COMPRA");
      var descto:String|string=""
      var cliente:String|string=""
      if(datos[0].proyecto.cliente!=undefined){
        this.clienteModel = datos[0].proyecto.cliente;
        cliente=  datos[0].proyecto.cliente.nombre;
        descto=  datos[0].proyecto.cliente.tipodescto;
      }
      this.formGroup.patchValue({
        nroReferencia:nroDoc,
        observaciones:observaciones,
        detalle:detalle,
        garantia:garantia,
        validez:validez,
        impuestos:impuestos,
        formapago:formapago,
        nota:nota,
        cliente:cliente,
        entrega:entrega,
        nombre:nombre,
        descto:descto
      })
    })
  }
  llenarFormularioDocumentoOrdenCompra(){

    return this.serviceRecuperarDocumentos.listenerSujetoOrdenCompra_Proyecto().subscribe(datos=>{
     // var observaciones = datos[0].ordencompra.detalle;
      this.limpiarFormularioSinNrodoc();
      this.activarSubscriptores();

      var nroDoc = datos[0].ordencompra.nrodoc;
      this.formGroup.get('proyectoOperacion').setValue("311:COMPRA");
      this.formGroup.patchValue({
        nroReferencia:nroDoc,
      })
    })
  }
  llenarFormularioDocumentoNotaVenta(){

    return this.serviceRecuperarDocumentos.listenerSujetoNotaVenta_Proyecto().subscribe(datos=>{
     // var observaciones = datos[0].notaventa.detalle;
      this.limpiarFormularioSinNrodoc();
      this.activarSubscriptores();
      var nroDoc = datos[0].notaventa.nrodoc;
      this.formGroup.get('proyectoOperacion').setValue("311:COMPRA");
      var descto:String|string=""
      var cliente:String|string=""
      if(datos[0].notaventa.cliente!=undefined){
        this.clienteModel = datos[0].notaventa.cliente;
        cliente=  datos[0].notaventa.cliente.nombre;
        descto=  datos[0].notaventa.cliente.tipodescto;
      }
      this.formGroup.patchValue({
        nroReferencia:nroDoc,
        cliente:cliente,
        descto:descto
      })
    })
  }
  obtenerTransaccionProducto(){
    var nombre:String = this.formGroup.get('nombre').value;
    var detalle: String = this.formGroup.get('detalle').value;
    var fechaTransaccion:Date = this.formGroup.get('fechaTransaccion').value;
    var nrodoc: Number = parseInt(this.formGroup.get('nroDoc').value);
    var observaciones: String = this.formGroup.get('observaciones').value;
    var entrega: String = this.formGroup.get('entrega').value;
    var proyectoOperacion: Number = parseInt(this.formGroup.get('proyectoOperacion').value);
    var impuestos: String = this.formGroup.get('impuestos').value;
    var validez: String = this.formGroup.get('validez').value;
    var garantia: String = this.formGroup.get('garantia').value;
    var formapago: String = this.formGroup.get('formapago').value;
    var nota: String = this.formGroup.get('nota').value;
    var proyecto:  ModelCotizacionProyecto|any = {nombre:nombre,formapago:formapago,garantia:garantia,nota:nota
      , fecha:fechaTransaccion,nroprj:nrodoc, detalle:detalle, impuestos:impuestos,validez:validez, entrega:entrega, cliente:this.clienteModel
      , observaciones:observaciones, operprj:proyectoOperacion }
    this.mandarTransaccionEncabezado.emit(proyecto);
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  limpiarFormulario(){
    this.formGroup.setValue({
      fechaTransaccion:"",
      cliente:"",
      nroDoc:"",
      proyectoOperacion:"",
      impuestos:"",
      observaciones:"",
      entrega:"",
      descto:"",
      validez:"",
      garantia:"",
      nota:"",
      formapago:"",
      detalle:"",
      nombre:"",
      nroReferencia:"",
    })
    this.clienteModel=null;
    this.formGroup.get('cliente').enable();
  }
  limpiarFormularioSinNrodoc(){

    this.desubscribitSubscriptores();
    this.formGroup.patchValue({

      cliente:"",

      proyectoOperacion:"",
      impuestos:"",
      observaciones:"",
      entrega:"",
      descto:"",
      validez:"",
      garantia:"",
      nota:"",
      formapago:"",
      detalle:"",
      nombre:"",
      nroReferencia:"",
    })
    this.clienteModel=null;
    this.formGroup.get('cliente').enable();
  }
  agregarCliente(){

  }
  guardarCliente(){
    if(this.formGroup.get('cliente').value!=""){
      this.options.forEach(datos=>{
        if(datos==this.formGroup.get('cliente').value){
          this.serviceCliente.obtenerClientePorNombre(datos);
          this.suscriberCliente= this.serviceCliente.listenerClienteByName().subscribe(data=>{
              this.clienteModel =data;
              if((!this.formGroup.invalid)&&(this.clienteModel)){
                var exportarDescuento:exportarDescuento ={guardar:false,descto:this.clienteModel.tipodescto}
                this.habilitarGuardar.emit(false);
              }else{
                this.habilitarGuardar.emit(true);
              }
          })
          this.formGroup.get('cliente').disable(true);
        }
      })
    }
  }
  cancelarCliente(){
    this.formGroup.get('cliente').enable();
    if(this.suscriberCliente!=undefined){
      this.suscriberCliente.unsubscribe();
    }
    this.clienteModel=null;
    this.habilitarGuardar.emit(true);
  }
  desubscribitSubscriptores(){
    if(this.suscriberCliente !=undefined){
      this.suscriberCliente.unsubscribe();
    }
    if(this.suscriberAllCliente!=undefined){
      this.suscriberAllCliente.unsubscribe();
    }
    if(this.subscribProyectoRecuperado!=undefined){
      this.subscribProyectoRecuperado.unsubscribe();
    }
    if(this.subscribOrdenCompraRecuperar!=undefined){
      this.subscribOrdenCompraRecuperar.unsubscribe();
    }
    if(this.subscribNotaVentaRecuperar!=undefined){
      this.subscribNotaVentaRecuperar.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
  }
  activarSubscriptores(){
    this.subscribProyectoRecuperado = this.llenarFormularioDocumentoProyecto();
    this.subscribOrdenCompraRecuperar = this.llenarFormularioDocumentoOrdenCompra();
    this.subscribNotaVentaRecuperar = this.llenarFormularioDocumentoNotaVenta();
  }
}
