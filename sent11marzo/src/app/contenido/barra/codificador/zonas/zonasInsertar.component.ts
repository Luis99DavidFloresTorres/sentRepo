import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ServiceCiudad } from "src/app/services/codificadores/ciudad.service";
import { ServiceZona } from "src/app/services/codificadores/zona.service";
import { CiudadesModel } from "../ciudades/ciudades.model";
@Component({
  selector: 'app-insertarRubro',
  templateUrl: './zonasInsertar.component.html'
})
export class ZonasInsertarComponent implements OnInit,OnDestroy {
    formInsertar:FormGroup|any;
    ciudades: String[]=[];
    zonaSubscripcion:Subscription|any;
    ciudadSubscripcion:Subscription|any;
    //ejemplo : S ={codigo:"Asd",pais:"bolivia",ciudad:"sucre"};
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String,private serviceZona:ServiceZona, private serviceCiudad:ServiceCiudad) {

    }
  ngOnDestroy(): void {
    if(this.zonaSubscripcion!=null){
      this.zonaSubscripcion.unsubscribe();
    }
    if(this.ciudadSubscripcion!=null){
      this.ciudadSubscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    //this.ciudades = ["SUCRE"];
    this.serviceCiudad.obtenerCiudades();

    this.ciudadSubscripcion = this.serviceCiudad.listenerDatosCiudad().subscribe(datos=>{
      console.log(datos);
      datos.forEach(data=>{
        this.ciudades.push(data.nombre)
      })

    })
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      zona:['',[Validators.required]],
      ciudadSelect:['',[Validators.required]]
    })
    if(this.data!=null){

      this.serviceZona.obtenerZonaId(this.data);
      this.zonaSubscripcion= this.serviceZona.listenerDatosIdZona().subscribe((data:any)=>{
        console.log(data);
        this.formInsertar.patchValue({
          codigo:data.codigo,
          ciudadSelect: data.ciudad.nombre,
          zona: data.nombre
        })
      })
    }
  }
  guardarZona(){

    var zona = {id:this.data,codigo:this.formInsertar.value.codigo,nombre:this.formInsertar.value.zona,ciudad:{nombre:this.formInsertar.value.ciudadSelect}}
    if(this.data!=null){

      this.serviceZona.editarZona(zona);
    }else{
      this.serviceZona.insertarZona(zona)
    }

    this.dialog.closeAll();
  }
  ciudadC(valor:string){}
}
