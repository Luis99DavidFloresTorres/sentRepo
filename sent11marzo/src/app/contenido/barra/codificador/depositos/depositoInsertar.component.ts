import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServiceDeposito } from "src/app/services/codificadores/deposito.service";
import { DepositoModel } from "./deposito.model";
@Component({
  selector: 'app-insertarPais',
  templateUrl: './depositoInsertar.component.html'
})
export class DepositoInsertarComponent implements OnInit{
    formInsertar:FormGroup|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String,private serviceDeposito:ServiceDeposito){

    }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      nombre:['',[Validators.required]],
      direccion:['',[Validators.required]]
    })
  }
  guardar(){
    var id = this.data;
    var nombre = this.formInsertar.get('nombre').value;
    var direccion = this.formInsertar.get('direccion').value;
    var codigo = this.formInsertar.get('codigo').value;
    var deposito:DepositoModel={id:id, nombre:nombre, direccion:direccion, codigo:codigo};
    this.serviceDeposito.agregarDeposito(deposito);
    this.dialog.closeAll();
  }
}
