import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormControlName, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { Subscription } from "rxjs";
import { ServiceTipoGasto } from "src/app/services/codificadores/tipoGasto.service";
import { ServiceUnidad } from "src/app/services/codificadores/unidad.service";
import { UnidadModel } from "../unidades/unidad.model";
import { tipoGastoModel } from "./tipoGasto.model";
@Component({
  selector: 'app-insertarRubro',
  templateUrl: './tipos-gastoInsertar.component.html',
  styleUrls: ['./tipos-gastoInsertar.component.css']
})
export class TiposGastoInsertarComponent implements OnInit,OnDestroy {
    formInsertar:FormGroup|any;
    tipoGastos:string[]=[];
    unidades:String[] = [];
    ejemplo:String="equipo";
    tiposGastosSubscripcion: Subscription|any;
    serviceUnidadesSubscripcion : Subscription|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string, private serviceGasto:ServiceTipoGasto, private serviceUnidades:ServiceUnidad){

    }
  ngOnDestroy(): void {
    if(this.tiposGastosSubscripcion!==null){
      this.tiposGastosSubscripcion.unsubscribe();
    }
    if(this.serviceUnidadesSubscripcion!==null){
      this.serviceUnidadesSubscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      nombre:['',[Validators.required]],
      precio:['',[Validators.required]],
      tipoGastoSelect:['',[Validators.required]],
      unidadSelect:['',[Validators.required]]
    })
    this.serviceGasto.obtenerGastos();
    this.tiposGastosSubscripcion = this.serviceGasto.listenerDatosGasto().subscribe(data=>{
      data.forEach((gastos=>{
        if(this.noRepetir(gastos.tipo.toString(),this.tipoGastos)){
          this.tipoGastos.push(gastos.tipo.toString());
        }

      }))
    })
    this.serviceUnidades.obtenerUnidades();
    this.serviceUnidadesSubscripcion = this.serviceUnidades.listenerDatosUnidad().subscribe(datos=>{
      console.log(datos)
        datos.forEach(unidad=>{
          this.unidades.push(unidad.nombre);
        })
    })
    if(this.data!=null){
      this.serviceGasto.obtenerPorId(this.data);
      this.serviceGasto.listenerPorId().subscribe(data =>{
        this.formInsertar.patchValue({
          nombre:data.nombre,
          precio:data.precio,
          codigo:data.codigo,
          tipoGastoSelect:data.tipo,
          unidadSelect:data.unidad.nombre
        })
      })
    }


  }
  guardar(){
    var nombre = this.formInsertar.get('nombre').value;
    var codigo = this.formInsertar.get('codigo').value;
    var tipo = this.formInsertar.get('tipoGastoSelect').value;
    var unidadNombre = this.formInsertar.get('unidadSelect').value;
    var precio = this.formInsertar.get('precio').value;
    var id = this.data;

    var gasto:tipoGastoModel = {id:id, nombre:nombre,codigo:codigo,precio:precio,tipo:tipo, unidad:{nombre:unidadNombre}};
    this.serviceGasto.agregar(gasto);
    this.dialog.closeAll();
  }
  tipoGastoC(selectValor: string){

  }
  unidadC(selectValor:string){}
  noRepetir(palabra:string, vector:string[]){
    var bool:boolean = true;
    vector.forEach(data=>{
        if(data==palabra){
           bool=false;
        }
    })
    return bool;
  }
}
