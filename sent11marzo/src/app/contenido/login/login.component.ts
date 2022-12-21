import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup:FormGroup|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private serviceUsuario: ServiceUsuario, private formBuilder: FormBuilder, private route:Router) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!=undefined) {
      this.sujetoSubscripcion.unsubscribe();
    }

  }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      usuario:['',[Validators.required]],
      contrasena:['',[Validators.required]]
    });
  }
  buscarUsuario(){
    if(this.sujetoSubscripcion!=undefined) {
      this.sujetoSubscripcion.unsubscribe();
    }
    var cuenta = this.formGroup.controls.usuario.value;
    var contrasena = this.formGroup.controls.contrasena.value;
    this.serviceUsuario.buscarUsuario(cuenta, contrasena);
    this.sujetoSubscripcion =this.serviceUsuario.listenerRespuestaLogin().subscribe(datos=>{
      if((datos.respuesta!="incorrecto") &&( datos.respuesta!="vacio")){
        this.serviceUsuario.buscarNivelUsuario(cuenta,contrasena);

        this.route.navigate(['inicial']);//sigue el proceso hasta terminar;
      }
    })
  }
  ingresarComoCliente(){

  }
}
