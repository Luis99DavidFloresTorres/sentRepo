import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServiceUnidad } from "src/app/services/codificadores/unidad.service";
import { UnidadModel } from "./unidad.model";
@Component({
  selector: 'app-insertarRubro',
  templateUrl: './unidadInsertar.component.html'
})
export class UnidadInsertarComponent implements OnInit{
    formInsertar:FormGroup|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String,private serviceUnidad:ServiceUnidad){

    }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      unidad:['',[Validators.required]],
    })
    if(this.data!=null){
      this.serviceUnidad.obtenerById(this.data);
      this.serviceUnidad.listenerById().subscribe(data => {
        this.formInsertar.patchValue({
          codigo:data.codigo,
          unidad:data.nombre
        })
      })
    }
  }
  agregar(){
    var nombre = this.formInsertar.get('unidad').value;
    var codigo = this.formInsertar.get('codigo').value;
    var unidad:UnidadModel={id:this.data,codigo:codigo,nombre:nombre};
    this.serviceUnidad.agregar(unidad);
    this.dialog.closeAll();
  }

}
