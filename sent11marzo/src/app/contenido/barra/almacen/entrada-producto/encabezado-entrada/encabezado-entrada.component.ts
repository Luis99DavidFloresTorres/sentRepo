import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ModelTransproducto } from 'src/app/Models/Transproducto.model';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';
import { DepositoModel } from '../../../codificador/depositos/deposito.model';

@Component({
  selector: 'app-encabezado-entrada',
  templateUrl: './encabezado-entrada.component.html',
  styleUrls: ['./encabezado-entrada.component.css']
})
export class EncabezadoEntradaComponent implements OnInit, OnChanges, OnDestroy {
  filteredOptions :Observable<string[]>|any;
  sujeto = new Subject();
  prueba:any;
  options:String[] = [];
  entrada:String[] = [];

  deposito: String|any=[];
  formGroup:any;
  suscriberProveedor:Subscription|any = undefined;
  date:Date=  new Date();
  suscriberDeposito:Subscription|any = undefined;
  suscribeTransproductoEntrada:Subscription|any;
  suscribeTransproductoSalida:Subscription|any;
  suscribeOrdenCompra:Subscription|any;
  cancelar=false;
  proveedorModel:ProveedorModel|any=null;
  depositoModel:DepositoModel|any=null;
  subscribeAllProveedor:Subscription|any = undefined;
  operacionMandar:Number=0;
  enviarDatos= new Subject<ModelTransproducto>();
  @Input() nroDocumento="neutro";
  @Input() boton:any;
  @Output() habilitarGuardar = new EventEmitter<boolean>();
  @Input() recuperar :any;
  @Output() guardarHabilitar = new EventEmitter<String>();
  @Output() numeroDestruirAlSalir = new EventEmitter<Number>();
  @Output() operacionDestruirAlSalir = new EventEmitter<Number>();
  @Output() mandarTransaccionEncabezado = new EventEmitter<ModelTransproducto>();

  constructor(private formBuilder:FormBuilder, private serviceUltimoNro: ServiceUltimoNro, private serviceDeposito:ServiceDeposito, private serviceProveedor:ServiceProveedor, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables) {}
  ngOnDestroy(): void {
    this.desubscribirSubscriptores();
  }
   ngOnChanges(changes: SimpleChanges): void {

    if(changes.nroDocumento!=undefined){
      if(changes.nroDocumento.currentValue=="crear"){
        this.serviceUltimoNro.crearNroEntradas();
        this.serviceUltimoNro.listenerCrearNroEntradas().subscribe(datos=>{
          this.formGroup.controls['nroDoc'].setValue(datos)
          this.formGroup.controls['fechaTransaccion'].setValue(new Date);
          this.formGroup.get('entradaOperacion').setValue("311:COMPRA");
          this.operacionMandar = parseInt(this.formGroup.get('entradaOperacion').value);
          this.numeroDestruirAlSalir.emit(this.formGroup.controls['nroDoc'].value)
          this.operacionDestruirAlSalir.emit(this.operacionMandar);
          if(!this.formGroup.invalid){
            this.habilitarGuardar.emit(false);
          }else{
            this.habilitarGuardar.emit(true);
          }
        })
      }
      if(changes.nroDocumento.currentValue=="destruir"){

        this.desubscribirSubscriptores();
        var operacion  = parseInt (this.formGroup.get('entradaOperacion').value);
        if(NaN){
          this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"entrada", 0);
        }else{
          this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"entrada", operacion);
        }

        this.limpiarFormulario();
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
          this.desubscribirSubscriptores();
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
        this.desubscribirSubscriptores();
      }
    }
  }
  ngOnInit(): void {
    this.iniciarFormulario();
    this.iniciarProveedoresConAutoCompletado();
    this.suscribeTransproductoEntrada= this.llenarFormularioConDocumentEntrada();
    this.suscribeTransproductoSalida= this.llenarFormularioConDocumentSalida();
    this.suscribeOrdenCompra = this.llenarFormularioConDocumentOrdenCompra();
    this.formGroup.get('entradaOperacion').setValue("311:COMPRA");
    this.serviceDeposito.obtenerNombresDepositos();
    this.serviceDeposito.listenerDatosNombresDepositos().subscribe(datos=>{
      this.deposito=datos;
    });

    this.enviarDatos.subscribe(datos=>{
      this.obtenerTransaccionProducto();
    });

    this.entrada = [
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
  iniciarFormulario(){
    this.formGroup= this.formBuilder.group({
      nroDoc:['',[Validators.required]],
      fechaTransaccion:['',[Validators.required]],
      entradaOperacion:[''],
      nroNotaFactura:[''],
      nombreProyecto:[''],
      deposito:['', [Validators.required]],
      observacion:[''],
      myControl:['',[Validators.required]]
    })
  }
  iniciarProveedoresConAutoCompletado(){
    this.serviceProveedor.allProveedores();
    this.subscribeAllProveedor = this.serviceProveedor.listenerProveedor().subscribe(data=>{
      data.forEach(proveedor=>{
        this.options.push(proveedor.nombre);
      })
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))

      );
    });
  }
  llenarFormularioConDocumentEntrada(){
    return this.serviceRecuperarDocumentos.listenerSujetoEntrada_Entrada().subscribe(datos=>{

      var detalle = datos[0].transproducto.detalle;
      var fecha= datos[0].transproducto.fecha;
      var deposito =   datos[0].transproducto.deposito.nombre;
      var operacionString:String|string = "";
      var operacionRecibido = datos[0].transproducto.oper;
      this.entrada.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })
      var nroDocTrans =  datos[0].transproducto.nrodoc;
      var proveedor:String|string=""
      if(datos[0].transproducto.proveedor?.nombre!=undefined){
        this.proveedorModel = datos[0].transproducto.proveedor;
        proveedor=  datos[0].transproducto.proveedor?.nombre;
      }
      this.depositoModel = datos[0].transproducto.deposito;
      this.formGroup.patchValue({
        fechaTransaccion:fecha,
        entradaOperacion:operacionString,
        nroNotaFactura:nroDocTrans,
        observacion:detalle,
        myControl:proveedor,
        deposito:deposito

      })

    })
  }
  llenarFormularioConDocumentSalida(){
    return this.serviceRecuperarDocumentos.listenerSujetoSalida_Entrada().subscribe(datos=>{

      var detalle = datos[0].transproducto.detalle;
      var fecha= datos[0].transproducto.fecha;
      var deposito =   datos[0].transproducto.deposito.nombre;
      var nrodocFac = datos[0].transproducto.nrodoc;
      var operacionString:String|string = "";
      var operacionRecibido = datos[0].transproducto.oper;
      /*this.entrada.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })*/
      this.formGroup.get('entradaOperacion').setValue("311:COMPRA");
      this.depositoModel = datos[0].transproducto.deposito;
      this.formGroup.patchValue({
        fechaTransaccion:fecha,
       // entradaOperacion:operacionString,
        nroNotaFactura:nrodocFac,
        observacion:detalle,
        deposito:deposito
      })
    })
  }
  llenarFormularioConDocumentOrdenCompra(){
    return this.serviceRecuperarDocumentos.listenerSujetoOrdenCompra_Entrada().subscribe(datos=>{
      var detalle = datos[0].ordencompra.detalle;
      var fecha= datos[0].ordencompra.fecha;
      var nrodocFac = datos[0].ordencompra.nrodoc;
      var operacionString:String|string = "";
      var proveedor:String|string = "";
      var operacionRecibido = datos[0].ordencompra.oper;
      if(datos[0].ordencompra!=undefined){
        this.proveedorModel = datos[0].ordencompra.proveedor;
        proveedor=  datos[0].ordencompra.proveedor?.nombre;
      }

      /*this.entrada.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })*/

      this.formGroup.get('entradaOperacion').setValue("311:COMPRA");
      this.formGroup.patchValue({
        fechaTransaccion:fecha,
       // entradaOperacion:operacionString,
        observacion:detalle,
        nroNotaFactura: nrodocFac,
        myControl:proveedor
      })
    })
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }


  obtenerTransaccionProducto(){
    var operacion:Number = parseInt(this.formGroup.get('entradaOperacion').value);
    var notaventaFacturaTransaccion:Number = this.formGroup.get('nroNotaFactura').value;
    var fechaTransaccion:Date = this.formGroup.get('fechaTransaccion').value;
    var nrodocTransaccion: Number = this.formGroup.get('nroDoc').value;
    var detalle: String = this.formGroup.get('observacion').value;


    var transproducto:  ModelTransproducto|any = {oper:operacion,notaventa:notaventaFacturaTransaccion, fecha:fechaTransaccion, nrodoc: nrodocTransaccion, detalle:detalle,proveedor:this.proveedorModel, deposito:this.depositoModel}
    this.mandarTransaccionEncabezado.emit(transproducto);
    this.limpiarFormulario();
    this.desubscribirSubscriptores();
  }
  agregarProveedor(){

  }
  guardarProveedor(){
    if(this.formGroup.get('myControl').value!=""){
      this.options.forEach(datos=>{
        if(datos==this.formGroup.get('myControl').value){

          this.serviceProveedor.findByName(datos);
          this.suscriberProveedor= this.serviceProveedor.listenerProveedorByName().subscribe(data=>{
              this.proveedorModel =data;
              if((!this.formGroup.invalid)&&(this.proveedorModel)&&(this.depositoModel)){
                this.habilitarGuardar.emit(false);
              }else{
                this.habilitarGuardar.emit(true);
              }
          })
          this.formGroup.get('myControl').disable(true);
        }
      })
    }
  }
  cancelarProveedor(){
    this.formGroup.get('myControl').enable();
    if(this.suscriberProveedor!=undefined){
      this.suscriberProveedor.unsubscribe();
    }

    this.proveedorModel=null;
    this.habilitarGuardar.emit(true);
  }
  limpiarFormulario(){
    this.formGroup.setValue({
      fechaTransaccion:"",
      myControl:"",
      nroDoc:"",
      entradaOperacion:"",
      nroNotaFactura:"",
      observacion:"",
      deposito:"",
      nombreProyecto:""
    })
    this.formGroup.get('myControl').enable();
  }
  depositoClick(){
    var nombreDeposito: String = this.formGroup.get('deposito').value;
    this.serviceDeposito.obtenerDepositoPorNombre(nombreDeposito);
    this.suscriberDeposito = this.serviceDeposito.listenerDepositoByName().subscribe(data=>{
      this.depositoModel=data;

      if((!this.formGroup.invalid)&&(this.proveedorModel!=null)){
        this.habilitarGuardar.emit(false);
      }else{
        this.habilitarGuardar.emit(true);
      }
    })
  }
  desubscribirSubscriptores(){
    if(this.subscribeAllProveedor!=undefined){
      this.subscribeAllProveedor.unsubscribe();
    }
    if(this.suscriberDeposito!=undefined){
      this.suscriberDeposito.unsubscribe();
    }
    if(this.suscriberProveedor!=undefined){
      this.suscriberProveedor.unsubscribe();
    }
    if(this.suscribeTransproductoEntrada!=undefined){
      this.suscribeTransproductoEntrada.unsubscribe();
    }
    if(this.suscribeTransproductoSalida!=undefined){
      this.suscribeTransproductoSalida.unsubscribe();
    }
    if(this.suscribeOrdenCompra!=undefined){
      this.suscribeOrdenCompra.unsubscribe();
    }
    if(this.sujeto!=undefined){
        this.sujeto.unsubscribe();
    }
  }
  capturarOperacion(){
    this.operacionMandar = this.formGroup.get('entradaOperacion').value;
  }
}
