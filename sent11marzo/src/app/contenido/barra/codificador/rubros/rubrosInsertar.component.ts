import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ServiceRubro } from "src/app/services/codificadores/rubro.service";
import { RubroModel } from "./rubros.model";
@Component({
  selector: 'app-insertarRubro',
  templateUrl: './rubrosInsertar.component.html'
})
export class RubrosInsertarComponent implements OnInit, OnDestroy{
    formInsertar:FormGroup|any;
    subscribeIdRubro:Subscription|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String, private serviceRubro:ServiceRubro){

    }
  ngOnDestroy(): void {
    if(this.subscribeIdRubro!=null){
      this.subscribeIdRubro.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      nombre:['',[Validators.required]],
      detalle:['',[Validators.required]]
    })
    if(this.data!=null){
      this.serviceRubro.obtenerPorId(this.data.toString());
      this.serviceRubro.listenerRubroById().subscribe(data=>{
        this.subscribeIdRubro = this.formInsertar.patchValue({
          nombre : data.nombre,
          detalle:data.detalle
        })
      })

    }
  }
  guardarRubro(){
    var rubro:RubroModel = {id:this.data,nombre:this.formInsertar.get('nombre').value, detalle:this.formInsertar.get('detalle').value}
    this.serviceRubro.agregar(rubro);
    this.dialog.closeAll();
  }
}
