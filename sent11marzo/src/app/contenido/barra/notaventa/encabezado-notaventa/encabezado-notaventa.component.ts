import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ModelNotaventa } from 'src/app/Models/Notaventa.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-encabezado-notaventa',
  templateUrl: './encabezado-notaventa.component.html',
  styleUrls: ['./encabezado-notaventa.component.css']
})
export class EncabezadoNotaventaComponent implements OnInit, OnChanges, OnDestroy {

  options:String[] = [];
  transporte:String[] = [];
  filteredCliente: Observable<String[]>|any;
  ciudad:String[]=[];
  deposito: String|any=[];
  sujeto = new Subject();
  formGroup:any;
  operacionNotaventa:String[]=[];
  date:Date=  new Date();
  cancelar=false;
  suscriberCliente :Subscription| any;
  suscriberAllCliente :Subscription| any;
  suscribeProyectoRecuperado:Subscription|any;
  clienteModel:ModelCliente|any;
  enviarDatos= new Subject<ModelNotaventa>();
  @Input() nroDocumento="neutro";
  @Input() boton:any;
  @Input() recuperar :any;
  @Output() habilitarGuardar = new EventEmitter<boolean>();
  @Output() numeroDestruirAlSalir = new EventEmitter<Number>();
  @Output() mandarTransaccionEncabezado = new EventEmitter<ModelNotaventa>();
  constructor(private formBuilder:FormBuilder, private serviceUltimoNro: ServiceUltimoNro, private serviceCliente:ServiceCliente, private serviceRecuperarDocumentos:ServiceRecuperarDocumentosObservables) {
    this.formGroup= formBuilder.group({
      fechaBuscar:['',[]],
      myControl:['',[]],
      nroDoc:['',[]]
    })
   }
  ngOnDestroy(): void {
    this.desubscribitSubscriptores();
  }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes.nroDocumento!=undefined){
      if(changes.nroDocumento.currentValue=="crear"){
        this.serviceUltimoNro.crearNroNotaventa();
        this.serviceUltimoNro.listenerCrearNotaventaSubject().subscribe(datos=>{
          this.formGroup.controls['nroDoc'].setValue(datos)
          this.formGroup.get('ventaOperacion').setValue("311:COMPRA");
        })
      }
      if(changes.nroDocumento.currentValue=="destruir"){
        this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"notaventa", 1);
        this.numeroDestruirAlSalir.emit(this.formGroup.controls['nroDoc'].value)
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
      tipodescto:[''],
      observaciones:[''],
      nroFactura:[''],
      ventaOperacion:[''],
      cliente:[''],

    })
    this.formGroup.get('ventaOperacion').setValue("311:COMPRA");
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

    this.transporte = [
      "Aerea",
      "Terrestre",
      "Maritima",
      "Otro"
    ];
    this.operacionNotaventa = [
      "311:COMPRA",
      "312:IMPORTACION",
      "314:CAMBIO",
      "315:DEVOLUCION PROY",
      "316:DEVOLUCION",
      "317:DONACION",
      "318:TRASPASO",
      "329:ALTA AUD"
    ];
    this.suscribeProyectoRecuperado = this.llenarFormularioDocumentoProyecto();
  }
  llenarFormularioDocumentoProyecto(){
    return this.serviceRecuperarDocumentos.listenerSujetoProyecto_NotaVenta().subscribe(datos=>{
      var detalle = datos[0].proyecto.detalle;
      var nroDoc = datos[0].proyecto.nroprj;
      console.log(datos);
      this.formGroup.get('ventaOperacion').setValue("311:COMPRA");
      var cliente:String|string=""
      if(datos[0].proyecto.cliente!=undefined){
        this.clienteModel = datos[0].proyecto.cliente;
        cliente=  datos[0].proyecto.cliente.nombre;
      }

      this.formGroup.patchValue({
        notaventa:nroDoc,
        observaciones:detalle,
        cliente:cliente
      })
    })
  }
  obtenerTransaccionProducto(){
    var nroFactura:Number = parseInt(this.formGroup.get('nroFactura').value);
    var fechaTransaccion:Date = this.formGroup.get('fechaTransaccion').value;
    var nrodocTransaccion: Number = parseInt(this.formGroup.get('nroDoc').value);
    var detalle: String = this.formGroup.get('observaciones').value;
    var tipodescto: String = this.formGroup.get('tipodescto').value;
    var operacion: Number = parseInt(this.formGroup.get('ventaOperacion').value);
    var notaventa:  ModelNotaventa|any = {nrofac:nroFactura,oper:operacion, fecha:fechaTransaccion, nrodoc: nrodocTransaccion, operacion:detalle, cliente:this.clienteModel, tc:6.96, estado:'t'}
    this.mandarTransaccionEncabezado.emit(notaventa);
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
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
              if(!this.formGroup.invalid){
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
  limpiarFormulario(){
    this.formGroup.setValue({
      fechaTransaccion:"",
      cliente:"",
      tipodescto:"",
      nroDoc:"",
      ventaOperacion:"",
      nroFactura:"",
      observaciones:"",
    })
    this.formGroup.get('cliente').enable();
  }
  desubscribitSubscriptores(){
    if(this.suscriberCliente !=undefined){
      this.suscriberCliente.unsubscribe();
    }
    if(this.suscriberAllCliente!=undefined){
      this.suscriberAllCliente.unsubscribe();
    }
    if(this.suscribeProyectoRecuperado!=undefined){
      this.suscribeProyectoRecuperado.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
    if(this.enviarDatos!=undefined){
      this.enviarDatos.unsubscribe();
    }
  }
}
