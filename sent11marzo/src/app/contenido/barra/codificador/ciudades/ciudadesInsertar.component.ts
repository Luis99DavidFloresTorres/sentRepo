import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ServiceCiudad } from "src/app/services/codificadores/ciudad.service";
import { ServicePais } from "src/app/services/codificadores/pais.service";
import { CiudadesModel } from "./ciudades.model";
@Component({
  selector: 'app-insertarPais',
  templateUrl: './ciudadesInsertar.component.html'
})
export class CiudadesInsertarComponent implements OnInit, OnDestroy{
    formInsertar:FormGroup|any;
    paises:String[]|any;
    ciudadSubscripcion: Subscription|any;
    paisSubscripcion: Subscription|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String, private serviceCiudad: ServiceCiudad, private servicePais: ServicePais){

    }
  ngOnDestroy(): void {
    if(this.ciudadSubscripcion!= undefined){
      this.ciudadSubscripcion.unsubscribe();
    }
    if(this.paisSubscripcion!=undefined){
      this.paisSubscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      paisSelect:['',[Validators.required]],
      ciudad:['',[Validators.required]]
    });
    if(this.paisSubscripcion!=undefined){
      this.paisSubscripcion.unsubscribe();
    }
    this.servicePais.obtenerPaisNombresSelect();
    this.paisSubscripcion = this.servicePais.listenerDatosPaisesNombresSelect().subscribe((datos)=>{
    this.paises = datos;
    })
    if(this.ciudadSubscripcion!= undefined){
      this.ciudadSubscripcion.unsubscribe();
    }
    if(this.data!=null){
      this.serviceCiudad.obtenerCiudadId(this.data);
      this.ciudadSubscripcion= this.serviceCiudad.listenerDatosIdCiudad().subscribe((data)=>{
        this.formInsertar.patchValue({
          codigo:data.codigo,
          paisSelect: data.pais.nombre,
          ciudad: data.nombre
        })
      })
    }
  }
  guardarLibro(){
    var idMandar;
    if(this.data!=null){
       idMandar = parseInt(this.data.toString())
    }else{
      idMandar =null;
    }
    var ciudad:CiudadesModel = {id:idMandar,codigo:this.formInsertar.value.codigo,nombre:this.formInsertar.value.ciudad,pais:this.formInsertar.value.paisSelect}

    this.serviceCiudad.insertarCiudad(ciudad)
    this.dialog.closeAll();
  }
  paisC(valor:String){}
}
