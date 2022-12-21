import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodigoEntity } from 'src/app/Models/Codigo.model';
/*import { ServiceCodigo } from 'src/app/services/codificadores/codigo.service';

@Component({
  selector: 'app-editar-codigo',
  templateUrl: './editar-codigo.component.html',
  styleUrls: ['./editar-codigo.component.css']
})
export class EditarCodigoComponent implements OnInit {
  formGroup: FormGroup|any;
  insertar=false;
  editar=false;
  codigo:CodigoEntity|any;
  constructor(private formBuilder: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any, private serviceCodigo: ServiceCodigo,private dialogRef: MatDialogRef<EditarCodigoComponent>) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre:[],
      codigo:['',[Validators.required]]
    })
    console.log(this.data.boton)
    if(this.data.boton=='editar'){
      this.editar=true;
      this.serviceCodigo.obtenerById(this.data.id);
      this.serviceCodigo.listenerById().subscribe(datos=>{
        this.codigo = datos;
        this.formGroup.controls.codigo.disable();
        var nuevoCodigoSinguion = datos.codigo.substring(0,datos.codigo.length-1)
        this.formGroup.patchValue({
          nombre:datos.nombre,
          codigo:nuevoCodigoSinguion
        })
      })
    }else if(this.data.boton=="insertar"){
      this.insertar=true;
    }

  }
  insertarF(){
    this.codigo={id:null,nombre:this.formGroup.controls['nombre'].value,codigo:this.formGroup.controls['codigo'].value}

    this.serviceCodigo.insertarCodigo(this.codigo);
    this.dialogRef.close();
  }
  editarF(){
    this.codigo={id:this.codigo['id'],nombre:this.formGroup.controls['nombre'].value,codigo:this.formGroup.controls['codigo'].value}
    this.serviceCodigo.editarCodigo(this.codigo);
    this.dialogRef.close();
  }
}
*/
