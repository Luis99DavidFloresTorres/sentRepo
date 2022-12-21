import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject, Subscription } from "rxjs";
import { ServicePais } from "src/app/services/codificadores/pais.service";
import { PaisModel } from "./pais.model";
@Component({
  selector: 'app-insertarPais',
  templateUrl: './paisInsertar.component.html'
})
export class PaisInsertarComponent implements OnInit, OnDestroy{
    formInsertar:FormGroup|any;
    pais: PaisModel|any;
    paisSubject: Subscription | any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String, private servicePais: ServicePais){

    }
  ngOnDestroy(): void {
    if(this.paisSubject != undefined){
    this.paisSubject.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      nombre:['',[Validators.required]]
    })

    if(this.data!=null){

      this.servicePais.obtenerPaisId(this.data);
      this.paisSubject = this.servicePais.listenerDatosPaisId().subscribe((data)=>{
        console.log(data);
        this.formInsertar.patchValue({
          codigo:data.codigo,
          nombre:data.nombre
        })
      })
    }
  }
  guardar(){
    console.log(this.formInsertar.value.codigo);
    this.pais={codigo:this.formInsertar.value.codigo, nombre:this.formInsertar.value.nombre,id:this.data};
    this.servicePais.agregarPais(this.pais);
    this.dialog.closeAll();
  }
}
