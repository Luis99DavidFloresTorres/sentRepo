import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ModelTransproducto } from 'src/app/Models/Transproducto.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceTransproducto } from 'src/app/services/Transproducto.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';
import { DepositoModel } from '../../../codificador/depositos/deposito.model';

@Component({
  selector: 'app-encabezado-documento',
  templateUrl: './encabezado-documento.component.html',
  styleUrls: ['./encabezado-documento.component.css']
})
export class EncabezadoDocumentoComponent implements OnInit, OnChanges, OnDestroy {
  filteredOptions: Observable<String[]>|any;
  options:String[] = [];
  formGroup:any;
  salida:String[] = [];
  sujeto = new Subject();
  cancelar=false;
  deposito: String|any=[];
  date:Date=  new Date();
  depositoModel:DepositoModel|any={nombre:""};
  clienteModel:ModelCliente|any;
  estado = "ACTIVO";
  enviarDatos= new Subject<ModelTransproducto>();
  suscriberCliente :Subscription| any;
  suscriberDeposito :Subscription|any;
  suscriberAllCliente:Subscription|any;
  suscribeCotizacion:Subscription|any;
  suscribeNotaVenta:Subscription|any;
  suscribeProyectoRecuperado:Subscription|any;
  suscribeTransproductoRecuperadoEntrada:Subscription|any;
  suscribeTransproductoRecuperadoSalida:Subscription|any;
  suscribeNotaventaRecuperado: Subscription|any;
  operacionMandar:Number=0;
  @Input() nroDocumento="neutro";
  @Input() boton:any;
  @Input() recuperar :any;
  @Output() habilitarGuardar = new EventEmitter<boolean>();
  @Output() numeroDestruirAlSalir = new EventEmitter<Number>();
  @Output() operacionDestruirAlSalir = new EventEmitter<Number>();

  @Output() mandarTransaccionEncabezado = new EventEmitter<ModelTransproducto>();
  constructor(private formBuilder:FormBuilder, private serviceDeposito:ServiceDeposito, private serviceUltimoNro:ServiceUltimoNro, private serviceCliente:ServiceCliente,  private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables) {}
  ngOnDestroy(): void {
    this.desubscribitSubscriptores();
  }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes.nroDocumento!=undefined){
      if(changes.nroDocumento.currentValue=="crear"){
        this.nroSalidaCrear();
      }
      if(changes.nroDocumento.currentValue=="destruir"){
        var operacion  = parseInt (this.formGroup.get('salidaOperacion').value);
        if(operacion!=NaN){
          this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"salida", operacion);
        }else{
          this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"salida", 0);
        }

        this.limpiarFormulario();
        this.desubscribitSubscriptores();
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
      fechaTransaccion:['',[Validators.required]],
      myControl:['',[Validators.required]],
      nroDoc:['',[Validators.required]],
      salidaOperacion:[''],
      notaventa:[''],
      observacion:[''],
      deposito:['', [Validators.required]]
    })

    this.formGroup.get('salidaOperacion').setValue("321:VENTA");
    this.serviceDeposito.obtenerNombresDepositos();
    this.suscriberCliente = this.serviceDeposito.listenerDatosNombresDepositos().subscribe(datos=>{
      this.deposito=datos;
    });
    this.serviceCliente.allClientes();
    this.suscriberAllCliente = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      data.forEach(cliente=>{
        this.options.push(cliente.nombre);
      })
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
    });

    this.enviarDatos.subscribe(datos=>{
      this.obtenerTransaccionProducto();
    });
    this.salida = [
      "321:VENTA",
      "322:PRESTAMOS",
      "324:CAMBIO",
      "325:PROYECTO",
      "326:DEVOLUCION",
      "327:DONACION",
      "328:TRASPASO",
      "329:BAJA AUD"
    ];
    this.suscribeTransproductoRecuperadoEntrada= this.llenarFormularioDocumentoEntrada();
    this.suscribeTransproductoRecuperadoSalida= this.llenarFormularioDocumentoSalida();
    this.suscribeNotaventaRecuperado = this.llenarFormularioDocumentoNotaVenta();
    this.suscribeProyectoRecuperado = this.llenarFormularioDocumentoProyecto();
  }
  llenarFormularioDocumentoEntrada(){
    return this.serviceRecuperarDocumentos.listenerSujetoEntrada_Salida().subscribe(datos=>{
      var detalle = datos[0].transproducto.detalle;
      var fecha= datos[0].transproducto.fecha;
      var deposito =   datos[0].transproducto.deposito.nombre;
      var nroDoc = datos[0].transproducto.nrodoc;
      var operacionString:String|string = "";
      var operacionRecibido = datos[0].transproducto.oper;
      /*this.salida.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })*/
      this.formGroup.get('salidaOperacion').setValue("321:VENTA");
      this.depositoModel = datos[0].transproducto.deposito;
      this.formGroup.patchValue({
        fechaTransaccion:fecha,
        notaventa:nroDoc,
        observacion:detalle,
        deposito:deposito,
      })
    })
  }
  llenarFormularioDocumentoSalida(){
    return this.serviceRecuperarDocumentos.listenerSujetoSalida_Salida().subscribe(datos=>{
      var detalle = datos[0].transproducto.detalle;
      var fecha= datos[0].transproducto.fecha;
      var deposito =   datos[0].transproducto.deposito.nombre;
      var nroDoc = datos[0].transproducto.nrodoc;
      var operacionString:String|string = "";
      var operacionRecibido = datos[0].transproducto.oper;
      this.salida.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })
      var cliente:String|string=""
      if(datos[0].transproducto.cliente!=undefined){
        this.clienteModel = datos[0].transproducto.cliente;
        cliente=  datos[0].transproducto.cliente?.nombre;
      }
      this.depositoModel = datos[0].transproducto.deposito;
      this.formGroup.patchValue({
        fechaTransaccion:fecha,
        salidaOperacion:operacionString,
        notaventa:nroDoc,
        observacion:detalle,
        deposito:deposito,
        myControl:cliente
      })
    })
  }
  llenarFormularioDocumentoProyecto(){
    return this.serviceRecuperarDocumentos.listenerSujetoProyecto_Salida().subscribe(datos=>{
      var detalle = datos[0].proyecto.detalle;
      var nroDoc = datos[0].proyecto.nroprj;
      this.formGroup.get('salidaOperacion').setValue("321:VENTA");
      var cliente:String|string=""
      if(datos[0].proyecto.cliente!=undefined){
        this.clienteModel = datos[0].proyecto.cliente;
        cliente=  datos[0].proyecto.cliente.nombre;
      }

      this.formGroup.patchValue({
        notaventa:nroDoc,
        observacion:detalle,
        myControl:cliente
      })
    })
  }
  llenarFormularioDocumentoNotaVenta(){
    return this.serviceRecuperarDocumentos.listenerSujetoNotaVenta_Salida().subscribe(datos=>{
      var detalle = datos[0].notaventa.operacion;

      var nroDoc = datos[0].notaventa.nrodoc;
      var operacionString:String|string = "";
      var operacionRecibido = datos[0].notaventa.oper;
      /*this.salida.forEach(datos=>{
        var opPars = parseInt(datos.toString());
        if(opPars==operacionRecibido){
          operacionString = datos;
        }
      })*/
      this.formGroup.get('salidaOperacion').setValue("321:VENTA");
      var cliente:String|string=""
      if(datos[0].notaventa.cliente){
        this.clienteModel = datos[0].notaventa.cliente;
        console.log("esta entrando")
        console.log(this.clienteModel)
        cliente=  datos[0].notaventa.cliente.nombre;
      }

      console.log(detalle);
      this.formGroup.patchValue({
        notaventa:nroDoc,
        observacion:detalle,
        myControl:cliente
      })
    })
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  obtenerTransaccionProducto(){
    var operacion:Number = parseInt(this.formGroup.get('salidaOperacion').value);
    var notaventaTransaccion:Number = this.formGroup.get('notaventa').value;
    var fechaTransaccion:Date = this.formGroup.get('fechaTransaccion').value;
    var nrodocTransaccion: Number = this.formGroup.get('nroDoc').value;
    var detalle: String = this.formGroup.get('observacion').value;
    var transaccion:ModelTransproducto|any = {id:0, oper:operacion, fecha:fechaTransaccion,
    notaventa:notaventaTransaccion, nrodoc:nrodocTransaccion,
    cliente:this.clienteModel, proveedor:null, detalle:detalle, deposito:this.depositoModel}
    this.mandarTransaccionEncabezado.emit(transaccion);
    this.limpiarFormulario();
  }
  nroSalidaCrear(){
    this.serviceUltimoNro.crearNroSalidas();
        this.serviceUltimoNro.listenerCrearNroSalidas().subscribe(datos=>{
          this.formGroup.controls['nroDoc'].setValue(datos)
          this.formGroup.get('salidaOperacion').setValue("321:VENTA");
          this.formGroup.controls['fechaTransaccion'].setValue(new Date);
          this.operacionMandar = parseInt(this.formGroup.get('salidaOperacion').value);
          this.numeroDestruirAlSalir.emit(this.formGroup.controls['nroDoc'].value)
          this.operacionDestruirAlSalir.emit(this.operacionMandar);
          if(!this.formGroup.invalid){
            this.habilitarGuardar.emit(false);
          }else{
            this.habilitarGuardar.emit(true);
          }
        })
  }
  depositoClick(){
    var nombreDeposito: String = this.formGroup.get('deposito').value;
    this.serviceDeposito.obtenerDepositoPorNombre(nombreDeposito);
    this.suscriberDeposito = this.serviceDeposito.listenerDepositoByName().subscribe(data=>{
      this.depositoModel=data;
      console.log(this.clienteModel)
      if((!this.formGroup.invalid)&&(this.clienteModel)){
        this.habilitarGuardar.emit(false);
      }else{
        this.habilitarGuardar.emit(true);
      }
    })
  }
  agregarCliente(){
  }
  guardarCliente(){
    if(this.formGroup.get('myControl').value!=""){
      this.options.forEach(datos=>{
        if(datos==this.formGroup.get('myControl').value){

          this.serviceCliente.obtenerClientePorNombre(this.formGroup.get('myControl').value);
          this.suscriberCliente= this.serviceCliente.listenerClienteByName().subscribe(data=>{
              this.clienteModel =data;
              console.log("buscando")
              console.log(this.clienteModel)
              console.log(data);
              if(!this.formGroup.invalid){
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
  cancelarCliente(){
    this.formGroup.get('myControl').enable();
    if(this.suscriberCliente!=undefined){
      this.suscriberCliente.unsubscribe();
    }
    this.clienteModel=null;
    this.habilitarGuardar.emit(true);
  }
  limpiarFormulario(){
    this.formGroup.setValue({
      fechaTransaccion:"",
      myControl:"",
      nroDoc:"",
      salidaOperacion:"",
      notaventa:"",
      observacion:"",
      deposito:""
    })
    this.formGroup.get('myControl').enable();
  }
  desubscribitSubscriptores(){
    if(this.suscriberCliente !=undefined){
      this.suscriberCliente.unsubscribe();
    }
    if(this.suscriberDeposito!=undefined){
      this.suscriberDeposito.unsubscribe();
    }
    if(this.suscriberAllCliente!=undefined){
      this.suscriberAllCliente.unsubscribe();
    }
    if(this.suscribeTransproductoRecuperadoEntrada!=undefined){
      this.suscribeTransproductoRecuperadoEntrada.unsubscribe();
    }
    if(this.suscribeTransproductoRecuperadoSalida!=undefined){
      this.suscribeTransproductoRecuperadoSalida.unsubscribe();
    }
    if(this.suscribeCotizacion!=undefined){
      this.suscribeCotizacion.unsubscribe();
    }
    if(this.suscribeNotaVenta!=undefined){
      this.suscribeNotaVenta.unsubscribe();
    }
    if(this.suscribeProyectoRecuperado!=undefined){
      this.suscribeProyectoRecuperado.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
  }
  capturarOperacion(){
    this.operacionMandar = this.formGroup.get('salidaOperacion').value;
  }
}
