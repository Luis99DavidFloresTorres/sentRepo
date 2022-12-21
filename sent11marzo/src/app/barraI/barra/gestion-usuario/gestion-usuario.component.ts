import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModel } from 'src/app/Models/UsuarioModel.model';
import { ServiceNivelUsuario } from 'src/app/services/NivelUsuarioService.service';

import { ServiceUsuario } from 'src/app/services/UsuarioService.service';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { AgregarNivelComponent } from './agregar-nivel/agregar-nivel.component';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {
  dataSource= new MatTableDataSource<UsuarioModel>();
  displayedColumns = ["cuenta","contrasena","nombreNivel","operacion"];
  constructor(private serviceUsuario: ServiceUsuario, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.serviceUsuario.mostrarUsuarios();
    this.serviceUsuario.listenerGestionUsuarios().subscribe(datos=>{
      this.dataSource.data = datos;
    })
    this.serviceUsuario.listenerUsuarioRegistrado().subscribe(datos=>{
      this.serviceUsuario.mostrarUsuarios();
      this.serviceUsuario.listenerGestionUsuarios().subscribe(datos=>{
        this.dataSource.data = datos;
      })
    })
    this.serviceUsuario.listenerEditarSubnivel().subscribe(data=>{
      this.serviceUsuario.mostrarUsuarios();
      this.serviceUsuario.listenerGestionUsuarios().subscribe(datos=>{
        this.dataSource.data = datos;
      })
    })
  }
  agregarFuncion(id:string){
    var mandar = parseInt(id);
    this.matDialog.open(AgregarNivelComponent,{width:'250px', height:'210px',data:mandar})
  }
  eliminar(id:String){}
  agregar(){
    this.matDialog.open(AddUsuarioComponent,{width:'400px',height:'250px'})
  }
}
