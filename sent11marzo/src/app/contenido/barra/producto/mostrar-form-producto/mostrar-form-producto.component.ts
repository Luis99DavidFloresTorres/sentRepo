import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { LocalStorageNiveles } from 'src/app/Models/AdministrarRutasBotonces.model';
import { CodigoEntity, CodigoProducto } from 'src/app/Models/Codigo.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceProducto } from 'src/app/services/producto.service';
import { ServiceUltimoNro } from 'src/app/services/UltimoNro.service';
@Component({
  selector: 'app-mostrar-form-producto',
  templateUrl: './mostrar-form-producto.component.html',
  styleUrls: ['./mostrar-form-producto.component.css']
})
export class MostrarFormProductoComponent implements OnInit, OnDestroy {
  formProducto: FormGroup|any;
  unidades:String[]|any;
  tiposBien:String[]|any;
  codigosVector:String[]|any;
  activarAgregar  = true;
  activarEditar = true;
  previsualizacion: String|any="";
  archivos:any =[];
  agregar = false;
  editar = false;
  nombreProducto:String="";
  producto: ProductoModel|any;
  sujetoSubscripcion : Subscription|any;
  codigoSubscription:Subscription|any;
  archivoCapturado:any;
  rutaPortada:String="";
  archivo64:any;
  operacion:String|any;
  producto_id:String|any="";
  srcImages:String|any;
  codigosEntityBaseDatos: CodigoEntity[]=[];

  codigoProductoId:Number|any;
  constructor(private form: FormBuilder, private sanitizer: DomSanitizer,private serviceProduct: ServiceProducto, @Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private serviceUltimoNro: ServiceUltimoNro) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
    if(this.codigoSubscription!= undefined){
      this.codigoSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.verificarEstadoBoton(this.data.boton);
    this.unidades=["METRO","PULGADA","PIEZA","BOLSA"];
    this.tiposBien = ["PRODUCTO","SERVICIO","PROYECTO","OTRO"];
    if(this.codigoSubscription!= undefined){
      this.codigoSubscription.unsubscribe();
    }

    this.formProducto = this.form.group({
      id:[''],
      codigo:['',[Validators.required]],
      codigos:[''],
      producto:['',[Validators.required]],
      marca:['',Validators.required],
      detalle:[''],
      modelo:[''],
      industria:[''],
      unidad:['',Validators.required], // el validator se agrega cuando en el html no esta el required
      tipoBien:['', Validators.required],
      utilidad:[''],
      costo:['',[Validators.required]],
      dolar:[{disabled:true}],
      precio:[''],
      descA:[''],
      descB:[''],
      descC:[''],
      precioA:[''],
      precioB:[''],
      precioC:[''],
      dolar2:[''],
      periodoG:[''],
      images:['',[]]
    })
    this.formProducto.patchValue({
      dolar:0
    })

    if(this.data.id != null){
      this.serviceProduct.obtenerbyIdProductos(this.data.id);
      this.sujetoSubscripcion= this.serviceProduct.listenerDatosProductoID().subscribe((data)=>{
        this.nombreProducto = data.nombre;
        this.producto= data;
        var costo:Number|any = data.costo;
        var precio: Number|any = data.precio;
        var dolarC = costo/6.96;
        var dolarP = precio/6.96;

        var A = precio * (data.desctoa.valueOf()*0.10)
        var B = precio * (data.desctob.valueOf()*0.10)
        var C = precio * (data.desctoc.valueOf()*0.10)
        var precioFA=precio-A;
        var precioFB=precio-B;
        var precioFC=precio-C;

        this.formProducto.patchValue({
          id: data.id,
          producto: data.nombre,
          detalle: data.detalle,
          marca: data.marca,
          modelo: data.modelo,
          codigo:data.codigo,

          industria:data.industria,
          utilidad: data.utilidad,
          unidad: data['unidadS'],
          tipoBien: data['tipo'],
          costo: costo,
          precio: precio,
          precioA:precioFA,
          precioB:precioFB,
          precioC:precioFC,
          descA: data.desctoa,
          descB: data.desctob,
          descC: data.desctoc,
          dolar: dolarC,
          dolar2: dolarP
        })
        this.rutaPortada = data.rutaPortada;
        this.previsualizacion= data.urlPortada;
        console.log(typeof(this.archivoCapturado));
        console.log(data.costo);
        if(data.costo!=0 && data.costo!=undefined){
          this.formProducto.controls['costo'].disable();
        }
        this.formProducto.controls['dolar'].setValue(costo/6.96);
        var descA = parseFloat (this.formProducto.controls.descA.value);
        var descB = parseFloat (this.formProducto.controls.descB.value);
        var descC = parseFloat (this.formProducto.controls.descC.value);
        var resultadoUtilidad = ((100*(this.formProducto.controls.precio.value-this.formProducto.controls.costo.value)))/(this.formProducto.controls.costo.value);
        //this.formProducto.controls['utilidad'].setValue(resultadoUtilidad);
        var json = [[descA,'A'],[descB,'B'],[descC,'C']];
        this.forPrecioDolaresDescuento(json);
        this.formProducto.controls['dolar2'].setValue(this.formProducto.controls.precio.value/6.96);
      })
    }
    this.formProducto.get('dolar').disable();
    /*this.formProducto.patchValue({
      dolar:30,
      dolar2:33
    })*/
    this.formProducto.get('precioA').disable();
    this.formProducto.get('dolar2').disable();

    this.formProducto.get('precioB').disable();
    this.formProducto.get('precioC').disable();
    this.serviceProduct.listeneraddImage().subscribe(datos=>{

    })
    this.serviceProduct.listeneraddProduct().subscribe(datos=>{
      if(this.archivoCapturado!=undefined){
        const producto:ProductoModel = datos;
        this.producto_id=producto.id;
        const formDataImagen = new FormData();
        formDataImagen.append('file',this.archivoCapturado);
        formDataImagen.append('id',this.producto_id);
        this.serviceProduct.agregarImagen(formDataImagen);
        this.archivoCapturado=undefined;
      }
    })
    this.serviceProduct.listenerEditarProduct().subscribe(datos=>{
      console.log(this.archivoCapturado);
      if((this.archivoCapturado!=undefined)){

        const formDataImagen = new FormData();
        formDataImagen.append('file',this.archivoCapturado);
        formDataImagen.append('id',this.producto_id);
        this.serviceProduct.agregarImagen(formDataImagen);
        this.archivoCapturado=undefined;
      }

    })
    this.serviceProduct.obtenerAllCodigos();
    this.serviceProduct.listenerObtenerAllCodigos().subscribe(data=>{
      console.log(data);
      this.codigosVector=data;
    });
    this.gestionarNivelDerecho();
  }
  buscarIndex(){

  }
  gestionarNivelDerecho(){
    var gestionarNiveles = new LocalStorageNiveles;
    var nivel:Number = parseInt(gestionarNiveles.buscarNivel("GESTION PRODUCTO"));
    if(nivel==2 || nivel==3 || nivel==15 || nivel == 7 || nivel==6){
        this.activarAgregar = false;
    }
    if(nivel==4 || nivel==5 || nivel==6 || nivel==7 || nivel==15){
        this.activarEditar = false;
    }
  }
  agregarF(){
    this.obtenerProducto();
    this.producto.id = null;
   this.serviceProduct.agregarProducto(this.producto);
   this.matDialog.closeAll();
  }
  editarF(){
    console.log('ksad');
   console.log(this.obtenerProducto()) ;
    this.obtenerProducto();
    this.producto.id = this.formProducto.controls.id.value;
    this.producto_id = this.producto.id;
    this.serviceProduct.editarProducto(this.producto);
    this.matDialog.closeAll();
  }
  obtenerProducto(){
    const costoF = this.formProducto.controls.costo.value;
    const unidadF = this.formProducto.controls.unidad.value;
    const descAF =this.formProducto.controls.descA.value;
    const descBF =this.formProducto.controls.descB.value;
    const descCF =this.formProducto.controls.descC.value;
    const detalleF =this.formProducto.controls.detalle.value;
   // const codigoF =this.formProducto.controls.codigo.value;
    const marcaF =this.formProducto.controls.marca.value;
    const modeloF =this.formProducto.controls.modelo.value;
    const utilidadF =this.formProducto.controls.utilidad.value;
    const tipoProductoF =this.formProducto.controls.tipoBien.value;
    const nombreF=this.formProducto.controls.producto.value;
    const precioF = this.formProducto.controls.precio.value;
    const codigo = this.formProducto.controls.codigo.value;

    //arreglar unidad no esta cambiando en la base de datos
    this.producto={costo: costoF, unidadS: unidadF,desctoa:descAF, desctob:descBF, desctoc:descCF, nombre:nombreF, modelo:modeloF,
     detalle:detalleF,tipo:tipoProductoF,utilidad:utilidadF, marca: marcaF, precio: precioF, rutaPortada:this.rutaPortada,
     ingresos:0.0, salidas:0.0, invinicial:0.0, codigo:codigo};
      console.log(this.rutaPortada);
    return this.producto;
  }
  obtenerFoto(evento:any){
    this.archivoCapturado = evento.target.files[0];
    console.log(typeof(this.archivoCapturado));
    this.archivo64 = this.archivoCapturado;
    this.extraerBase64(this.archivo64).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
    });
  }
  unidadS(valor:String){}
  tipoS(valor:String){
    console.log(valor);
  }
  extraerBase64 = async($event: any) => new Promise((resolve, reject)=>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader= new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base: reader.result
        });
      }
      reader.onerror = error =>{
        resolve({
          base:null
        })
      }
      return reader;
    } catch (error) {
      return null;
    }
  })
  verificarEstadoBoton(estado: String){
    if(estado=="agregar"){
      this.agregar=true;
    }else if (estado == "editar" ){
      this.editar =true;
    }
  }
  utilidadPrecio(precio:Number| any){
    if(precio){
      var suma:Number|any = 0;
      var precioInput = parseFloat(precio);
      var utilidad = precioInput;
      var costo = parseFloat (this.formProducto.controls.costo.value);
      suma = ((costo * utilidad)/100)+costo;
      var dolarC = costo/6.96;
      var dolarP:Number = suma/6.96;
      console.log(precioInput,'-',suma,'+',utilidad);
      this.formProducto.patchValue({
       precio:suma,
        dolar: dolarC,
        dolar2: dolarP
     })
    }else{
      var costo = parseFloat (this.formProducto.controls.costo.value);
      var dolarC = costo/6.96;
      var dolarP:Number = costo/6.96;
      this.formProducto.patchValue({
        precio:costo,
        dolar: dolarC,
        dolar2: dolarP
      })
    }
    var descA = parseFloat (this.formProducto.controls.descA.value);
    var descB = parseFloat (this.formProducto.controls.descB.value);
    var descC = parseFloat (this.formProducto.controls.descC.value);
    var json = [[descA,'A'],[descB,'B'],[descC,'C']];
    this.forPrecioDolaresDescuento(json);
  }
  codigoMandar(codigo:String){
    var codigoEnviar:CodigoEntity|any;
    this.codigosEntityBaseDatos.forEach(datos=>{
      var codigoSinguion = this.separarCodigo(datos.codigo)['codigo'];
      if(codigoSinguion==codigo){
        codigoEnviar= datos;
      }
    })
    return codigoEnviar;
  }
  codigoElegir(nombre:String){
    var codigo = this.separarCodigo(nombre);
    this.formProducto.patchValue({
      codigoText:codigo['codigo']
    })
  }
  separarCodigo(codigo:String){
    var palabraString = "";
    var numero = 0;
    for(var i = 0; i<codigo.length;i++){
      if(codigo[i]=="-"){
        palabraString = codigo.slice(0,i);
        numero = parseFloat(codigo.slice(i+1,codigo.length));
      }
    }
    return {'codigo':palabraString,'numero':numero};
  }
  descuentoAPrecio(numero:number){
    this.funcionCambioDescuento(numero,'precioA');
  }
  descuentoBPrecio(numero:number){
    this.funcionCambioDescuento(numero,'precioB');
  }
  descuentoCPrecio(numero:number){
    this.funcionCambioDescuento(numero,'precioC');
  }
  funcionCambioDescuento(numero:number, descuentoNombre:string){
    if(numero>0){
      var suma:Number|any = 0;
      //var precioInput = numero.valueOf();
      var descAI = numero;
      var precio = parseFloat (this.formProducto.controls.precio.value);
      //suma = ((precio * (100-descAI))/100);
      //var dolarP:Number = suma/6.96;
      var precioLabel = precio-numero;
      this.formProducto.controls[descuentoNombre].setValue(precioLabel)//precioA:dolarP    dolarP
    }else if(!numero){
        var precio = parseFloat (this.formProducto.controls.precio.value);
        this.formProducto.controls[descuentoNombre].setValue(precio)
    }
  }
  numeroDesc(numero:number){if(numero>=0)return true;else{ return false}}
  numeroMayor0(numero:number){if(numero>0)return true;else{ return false}}
  convertirtoDolar(numero:number, dolar:number){
    return numero/dolar;
  }


  precioChange(number:number){
    var descA = parseFloat (this.formProducto.controls.descA.value);
    var descB = parseFloat (this.formProducto.controls.descB.value);
    var descC = parseFloat (this.formProducto.controls.descC.value);
    var resultado = ((100*(this.formProducto.controls.precio.value-this.formProducto.controls.costo.value)))/(this.formProducto.controls.costo.value);
    console.log(resultado);
    this.formProducto.controls['utilidad'].setValue(resultado);      //falta esto de la utilidad
    var json = [[descA,'A'],[descB,'B'],[descC,'C']]; // (costo * (4.30))/100= (precio*100)/costo  costo   100    precio   40        100preico    costox
    this.forPrecioDolaresDescuento(json);
    this.formProducto.controls['dolar2'].setValue(this.formProducto.controls.precio.value/6.96);

  }
  forPrecioDolaresDescuento(vector:any[]){
    var precio = this.formProducto.controls.precio.value
    for(var i=0; i<vector.length;i++){
      if(!vector[i][0]){
        this.formProducto.controls['precio'+vector[i][1]].setValue(0);
      }else if(vector[0][0]>0){
        var valor:number = vector[i][0];
        this.formProducto.controls['precio'+vector[i][1]].setValue(precio-valor);//precio * ((100-vector[i][0])/100))/6.96
      }
    }
  }
  costoChange(costo:number){
    this.formProducto.controls['dolar'].setValue(costo/6.96);
    var descA = parseFloat (this.formProducto.controls.descA.value);
    var descB = parseFloat (this.formProducto.controls.descB.value);
    var descC = parseFloat (this.formProducto.controls.descC.value);
    var resultado = ((100*(this.formProducto.controls.precio.value-this.formProducto.controls.costo.value)))/(this.formProducto.controls.costo.value);
    this.formProducto.controls['utilidad'].setValue(resultado);      //falta esto de la utilidad
    var json = [[descA,'A'],[descB,'B'],[descC,'C']]; // (costo * (4.30))/100= (precio*100)/costo  costo   100    precio   40        100preico    costox
    this.forPrecioDolaresDescuento(json);
    this.formProducto.controls['dolar2'].setValue(this.formProducto.controls.precio.value/6.96);
  }
  codigoChange(valor:any){
    this.serviceUltimoNro.crearCodigoProducto(valor);
    this.serviceUltimoNro.listenerCodigoProducto().subscribe(data=>{
      console.log(data);
    });
  }
}
