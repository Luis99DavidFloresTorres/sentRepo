import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelOrdenCompra } from 'src/app/Models/OrdenCompra';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';

@Component({
  selector: 'app-encabezado-orden-compra',
  templateUrl: './encabezado-orden-compra.component.html',
  styleUrls: ['./encabezado-orden-compra.component.css']
})
export class EncabezadoOrdenCompraComponent implements OnInit, OnDestroy, OnChanges {
  filteredOptions: Observable<String[]>|any;
  options:String[] = [];
  optionsProveedor:String[]=[]
  sujeto = new Subject();
  transporte:String[] = [];
  ciudad:String[]=[];
  deposito: String|any=[];
  formGroup:any;
  subscriberAllProveedor:Subscription|any;
  suscriberProveedor:Subscription|any;

  proveedorModel:ProveedorModel|any;
  operacionCompra:String[]=[];
  date:Date=  new Date();
  cancelar=false;

  enviarDatos= new Subject<ModelOrdenCompra>();
  @Input() nroDocumento="neutro";
  @Input() boton:any;
  @Input() recuperar :any;
  @Output() guardarHabilitar = new EventEmitter<String>();
  @Output() numeroDestruirAlSalir = new EventEmitter<Number>();
  @Output() habilitarGuardar= new EventEmitter<boolean>();
  @Output() mandarTransaccionEncabezado = new EventEmitter<ModelOrdenCompra>();
  constructor(private formBuilder:FormBuilder, private serviceUltimoNro: ServiceUltimoNro, private serviceProveedor:ServiceProveedor,  private serviceCiudad:ServiceCiudad) {
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
        this.serviceUltimoNro.crearNroOrdenCompra();
        this.serviceUltimoNro.listenerCrearNroOrdenCompra().subscribe(datos=>{
          this.formGroup.controls['nroDoc'].setValue(datos)
          this.formGroup.get('compraOperacion').setValue("353:LOCAL");
          this.formGroup.get('transporte').setValue("TERRESTRE");
          this.formGroup.get('ciudad').setValue("SUCRE");
          this.numeroDestruirAlSalir.emit(this.formGroup.controls['nroDoc'].value)
          if(!this.formGroup.invalid){
            this.habilitarGuardar.emit(false);
          }else{
            this.habilitarGuardar.emit(true);
          }
        })
      }
      if(changes.nroDocumento.currentValue=="destruir"){
        this.serviceUltimoNro.eliminarNroDocumento(this.formGroup.controls['nroDoc'].value,"ordencompra", 1);

        this.limpiarFormulario();
        this.desubscribitSubscriptores();
      }
    }

    if(changes.boton!=undefined){
      if(!changes.boton.isFirstChange()){
        this.cancelar = !changes.boton.previousValue['cancelar'];
        console.log('cancelar'+this.cancelar);
        if(this.cancelar){
          this.limpiarFormulario();
        }else{
          this.formGroup.patchValue({
            nroDoc:0,
            fechaTransaccion:this.date
          })
          this.botonGuardarHabilitar();
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
      transporte:[''],
      datosFacturacion:[''],
      nit:[''],
      observacion:[''],
      proveedor:[''],
      ciudad:[''],
      compraOperacion:['']

    })
    //this.formGroup.get('entradaOperacion').setValue(");
    this.serviceProveedor.allProveedores();
    this.subscriberAllProveedor = this.serviceProveedor.listenerProveedor().subscribe(data=>{
      data.forEach(proveedor=>{
        this.optionsProveedor.push(proveedor.nombre);
      })
      this.filteredOptions = this.formGroup.get('proveedor').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
    });
    this.serviceCiudad.obtenerCiudades();
    this.serviceCiudad.listenerDatosCiudad().subscribe(datos=>{
      datos.forEach(ciudad=>{
        this.ciudad.push(ciudad.nombre);
      })
    })
    this.enviarDatos.subscribe(datos=>{
      this.obtenerTransaccionProducto();
    });
    this.transporte = [
      "AEREA",
      "TERRESTRE",
      "MARITIMA",
      "OTRO"
    ];
    this.operacionCompra = [
      "351:INTERNACIONAL",
      "352:NACIONAL",
      "353:LOCAL"
    ];
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.optionsProveedor.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  botonGuardarHabilitar(){
    if(this.formGroup!=undefined){
      if(this.formGroup.invalid){
        this.guardarHabilitar.emit("false");
      }
    }
  }
  obtenerTransaccionProducto(){
    var transporte:String = this.formGroup.get('transporte').value;
    var nit:Number = parseInt(this.formGroup.get('nit').value);
    var fechaTransaccion:Date = this.formGroup.get('fechaTransaccion').value;
    var nrodocTransaccion: Number = parseInt(this.formGroup.get('nroDoc').value);
    var detalle: String = this.formGroup.get('observacion').value;
    var ciudad: String = this.formGroup.get('ciudad').value;
    var datosFacturacion: String = this.formGroup.get('datosFacturacion').value;
    var operacion: Number = parseInt(this.formGroup.get('compraOperacion').value);//falta proveedor
   // var proveedor : String = this.formGroup.get('datosFacturacion').value;
    var OrdenCompra:  ModelOrdenCompra|any = {nitfacturacion:nit,oper:operacion, fecha:fechaTransaccion, nrodoc: nrodocTransaccion, detalle:detalle, transporte:transporte,ciudad:ciudad, proveedor:this.proveedorModel}
    console.log("compra");
    console.log(OrdenCompra);
    this.mandarTransaccionEncabezado.emit(OrdenCompra);
    this.limpiarFormulario();
  }
  agregarProveedor(){

  }
  guardarProveedor(){
    if(this.formGroup.get('proveedor').value!=""){
      this.optionsProveedor.forEach(datos=>{
        if(datos==this.formGroup.get('proveedor').value){
          this.serviceProveedor.findByName(datos);
          this.suscriberProveedor= this.serviceProveedor.listenerProveedorByName().subscribe(data=>{
              this.proveedorModel =data;
              if(!this.formGroup.invalid){
                this.habilitarGuardar.emit(false);
              }else{
                this.habilitarGuardar.emit(true);
              }
          })
          this.formGroup.get('proveedor').disable(true);
        }
      })
    }
  }
  cancelarProveedor(){
    this.formGroup.get('proveedor').enable();
    if(this.suscriberProveedor!=undefined){
      this.suscriberProveedor.unsubscribe();
    }
    this.proveedorModel=null;
    this.habilitarGuardar.emit(true);
  }
  limpiarFormulario(){
    this.formGroup.setValue({
      fechaTransaccion:"",
      proveedor:"",
      nroDoc:"",
      compraOperacion:"",
      ciudad:"",
      datosFacturacion:"",
      nit:"",
      observacion:"",
      transporte:""
    })
    this.formGroup.get('proveedor').enable();
  }
  desubscribitSubscriptores(){
    if(this.suscriberProveedor !=undefined){
      this.suscriberProveedor.unsubscribe();
    }
    if(this.sujeto!=undefined){
      this.sujeto.unsubscribe();
    }
    if(this.subscriberAllProveedor!=undefined){
      this.subscriberAllProveedor.unsubscribe();
    }
  }
}
