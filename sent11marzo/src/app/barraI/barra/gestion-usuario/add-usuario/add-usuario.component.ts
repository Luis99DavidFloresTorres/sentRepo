import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioJson } from 'src/app/Models/nivelUsuario.model';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  formGroup: FormGroup|any;
  constructor(private formBuilder: FormBuilder, private servicioUsuario: ServiceUsuario, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required]
    })
  }
  guardar(){
    var usuario = this.formGroup.controls.usuario.value;
    var contrasena = this.formGroup.controls.contrasena.value;
    console.log(usuario, contrasena);
    var usuarioMandar: UsuarioJson = {
      usuario:usuario,
      contrasena:contrasena
    }
    this.servicioUsuario.agregarUsuario(usuarioMandar);
    this.matDialog.closeAll();
  };
}
