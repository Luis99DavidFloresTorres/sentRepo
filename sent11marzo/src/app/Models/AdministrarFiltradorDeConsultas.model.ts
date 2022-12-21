import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ItemProductoModel } from "./itemProducto.model";

export class FiltradorDeConsultas{
  codigo:String[]|any;
  nombre:String[]|any;
  unidad:String[]|any;
  invinicial:String[]|any;
  ingresos:String[]|any;
  salidas:String[]|any;
  saldo:String[]|any;
  observaciones:String[]|any;
  fechaact:String[]|any;
  cantidad:String[]|any;
  serial:String[]|any;
  ope:String[]|any;
  depositoNombre:String[]|any;
  clienteNombre:String[]|any;
  nrodoc:String[]|any;
  proveedorNombre:String[]|any;

  constructor(){
    this.codigo = [];
    this.nombre = [];
    this.unidad = [];
    this.invinicial = [];
    this.ingresos = [];
    this.salidas = [];
    this.saldo = [];
    this.observaciones = [];
    this.fechaact = [];
    this.cantidad = [];
    this.serial = [];
    this.ope = [];
    this.depositoNombre = [];
    this.clienteNombre = [];
    this.nrodoc=[];
    this.proveedorNombre=[]
  }
  public reiniciarValores():void{
    this.codigo = [];
    this.nombre = [];
    this.unidad = [];
    this.invinicial = [];
    this.ingresos = [];
    this.salidas = [];
    this.saldo = [];
    this.observaciones = [];
    this.fechaact = [];
    this.cantidad = [];
    this.serial = [];
    this.ope = [];
    this.depositoNombre = [];
    this.clienteNombre = [];
    this.nrodoc =[];
    this.proveedorNombre = [];
  }
  private verificarRepetidos(palabra:String, vectorVerificar:String[]){
    var verificar:boolean = true;
    for(var i = 0; i<vectorVerificar.length; i++){
      if(vectorVerificar[i]==palabra){
          verificar = false;
      }
    }
    return verificar;
  }

  public filtrar1000DatosPorFechaYDeposito(datos:ItemProductoModel[]|any){
    datos.forEach((data:any)=>{
      var observaciones = data.observaciones;
      var fechaact = data.fechaact;
      var codigo = data.codigo;
      var nombre = data.nombre;
      var cantidad = data.cantidad;
      var ope = data.ope;
      var depositoNombre = data.depositoNombre;
      if(this.verificarRepetidos(observaciones,this.observaciones)){
        this.observaciones.push(observaciones);
      }
      if(this.verificarRepetidos(fechaact,this.fechaact)){
        this.fechaact.push(fechaact);
      }
      if(this.verificarRepetidos(codigo,this.codigo)){
        this.codigo.push(codigo);
      }
      if(this.verificarRepetidos(nombre,this.nombre)){
        this.nombre.push(nombre);
      }
      if(this.verificarRepetidos(cantidad,this.cantidad)){
        this.cantidad.push(cantidad);
      }
      if(this.verificarRepetidos(ope,this.ope)){
        this.ope.push(ope);
      }
      if(this.verificarRepetidos(depositoNombre,this.depositoNombre)){
        this.depositoNombre.push(depositoNombre);
      }
    })
    this.observaciones.sort();
    this.fechaact.sort();
    this.codigo.sort();
    this.nombre.sort();
    this.cantidad.sort();
    this.ope.sort();
    this.depositoNombre.sort()
  }
  public filtrarMayorIngresos(datos:ItemProductoModel[]|any){
    datos.forEach((data:any)=>{
      var observaciones = data.observaciones;
      var fechaact = data.fechaact;
      var nrodoc = data.nrodoc;
      var proveedorNombre = data.proveedorNombre;
      var ingresos = data.ingresos;
      var serial = data.serial;
      var ope = data.ope;

      if(this.verificarRepetidos(observaciones,this.observaciones)){
        this.observaciones.push(observaciones);
      }
      if(this.verificarRepetidos(fechaact,this.fechaact)){
        this.fechaact.push(fechaact);
      }
      if(this.verificarRepetidos(nrodoc,this.nrodoc)){
        this.nrodoc.push(nrodoc);
      }
      if(this.verificarRepetidos(ingresos,this.ingresos)){
        this.ingresos.push(ingresos);
      }
      if(this.verificarRepetidos(proveedorNombre,this.proveedorNombre)){
        this.proveedorNombre.push(proveedorNombre);
      }
      if(this.verificarRepetidos(ope,this.ope)){
        this.ope.push(ope);
      }
      if(this.verificarRepetidos(serial,this.serial)){
        this.serial.push(serial);
      }
    })
    this.observaciones.sort();
    this.fechaact.sort();
    this.nrodoc.sort();
    this.ingresos.sort();
    this.proveedorNombre.sort();
    this.ope.sort();
    this.serial.sort();
  }
  public filtrarMayorSalidas(datos:ItemProductoModel[]){
    datos.forEach((data:any)=>{
      var observaciones = data.observaciones;
      var fechaact = data.fechaact;
      var nrodoc = data.nrodoc;
      var clienteNombre = data.clienteNombre;
      var salidas = data.salidas;
      var serial = data.serial;
      var ope = data.ope;

      if(this.verificarRepetidos(observaciones,this.observaciones)){
        this.observaciones.push(observaciones);
      }
      if(this.verificarRepetidos(fechaact,this.fechaact)){
        this.fechaact.push(fechaact);
      }
      if(this.verificarRepetidos(nrodoc,this.nrodoc)){
        this.nrodoc.push(nrodoc);
      }
      if(this.verificarRepetidos(salidas,this.salidas)){
        this.salidas.push(salidas);
      }
      if(this.verificarRepetidos(clienteNombre,this.clienteNombre)){
        this.clienteNombre.push(clienteNombre);
      }
      if(this.verificarRepetidos(ope,this.ope)){
        this.ope.push(ope);
      }
      if(this.verificarRepetidos(serial,this.serial)){
        this.serial.push(serial);
      }

    })
    this.observaciones.sort();
    this.fechaact.sort();
    this.nrodoc.sort();
    this.salidas.sort();
    this.clienteNombre.sort();
    this.proveedorNombre.sort();
    this.ope.sort();
    this.serial.sort();
  }
  public filtrarKardex(datos:ItemProductoModel[]|any){
    datos.forEach((data:any)=>{
      var observaciones = data.observaciones;
      var fechaact = data.fechaact;
      var nrodoc = data.nrodoc;
      var salidas = data.salidas;
      var ingresos = data.ingresos;
      var invinicial=data.invinicial;
      var ope = data.ope;
      var codigo = data.codigo;
      var saldo = data.saldo;
      var serial = data.serial;
      if(this.verificarRepetidos(observaciones,this.observaciones)){
        this.observaciones.push(observaciones);
      }
      if(this.verificarRepetidos(fechaact,this.fechaact)){
        this.fechaact.push(fechaact);
      }
      if(this.verificarRepetidos(nrodoc,this.nrodoc)){
        this.nrodoc.push(nrodoc);
      }
      if(this.verificarRepetidos(codigo,this.codigo)){
        this.codigo.push(codigo);
      }
      if(this.verificarRepetidos(serial,this.serial)){
        this.serial.push(serial);
      }
      if(this.verificarRepetidos(salidas,this.salidas)){
        this.salidas.push(salidas);
      }
      if(this.verificarRepetidos(ingresos,this.ingresos)){
        this.ingresos.push(ingresos);
      }
      if(this.verificarRepetidos(invinicial,this.invinicial)){
        this.invinicial.push(invinicial);
      }
      if(this.verificarRepetidos(saldo,this.saldo)){
        this.saldo.push(saldo);
      }

      if(this.verificarRepetidos(ope,this.ope)){
        this.ope.push(ope);
      }
    })
    this.observaciones.sort();
    this.fechaact.sort();
    this.serial.sort();
    this.nrodoc.sort();
    this.salidas.sort();
    this.invinicial.sort();
    this.ingresos.sort();
    this.invinicial.sort();
    this.codigo.sort();
    this.saldo.sort();
    this.proveedorNombre.sort();
    this.ope.sort();
  }
  public filtrar2Fechas(datos:ItemProductoModel[]|any){
    datos.forEach((data:any)=>{
      var salidas = data.salidas;
      var ingresos = data.ingresos;
      var invinicial=data.invinicial;
      var unidad = data.unidad;
      var codigo = data.codigo;
      var saldo = data.saldo;
      var nombre = data.nombre;
      if(this.verificarRepetidos(codigo,this.codigo)){
        this.codigo.push(codigo);
      }
      if(this.verificarRepetidos(nombre,this.nombre)){
        this.nombre.push(nombre);
      }
      if(this.verificarRepetidos(salidas,this.salidas)){
        this.salidas.push(salidas);
      }
      if(this.verificarRepetidos(ingresos,this.ingresos)){
        this.ingresos.push(ingresos);
      }
      if(this.verificarRepetidos(invinicial,this.invinicial)){
        this.invinicial.push(invinicial);
      }
      if(this.verificarRepetidos(saldo,this.saldo)){
        this.saldo.push(saldo);
      }

      if(this.verificarRepetidos(unidad,this.unidad)){
        this.unidad.push(unidad);
      }
    })
    this.nombre.sort();
    this.salidas.sort();
    this.invinicial.sort();
    this.ingresos.sort();
    this.codigo.sort();
    this.saldo.sort();
    this.unidad.sort();
  }
}
