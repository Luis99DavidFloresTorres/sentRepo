import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServiceTipoCliente } from "src/app/services/codificadores/tipoCliente.service";
import { tipoClienteModel } from "./tiposCliente.model";
@Component({
  selector: 'app-insertarRubro',
  templateUrl: './tipos-clienteInsertar.component.html'
})
export class TiposClienteInsertarComponent implements OnInit{
    formInsertar:FormGroup|any;
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: String,private service: ServiceTipoCliente){

    }
  ngOnInit(): void {
    this.formInsertar = this.formBuilder.group({
      codigo:['',[Validators.required]],
      tipoCliente:['',[Validators.required]]
    })
    if(this.data!=null){
      this.service.obtenerPorId(this.data.toString());
      this.service.listenertipoClienteId().subscribe(data=>{
        this.formInsertar.patchValue({
          codigo:data.codigo,
          tipoCliente:data.nombre
        })
      })

    }
  }
  agregar(){
    var tipoCliente: tipoClienteModel = {id:this.data,codigo:this.formInsertar.get('codigo').value,nombre:this.formInsertar.get('tipoCliente').value}
    this.service.agregar(tipoCliente);
    this.dialog.closeAll();
  }
}
