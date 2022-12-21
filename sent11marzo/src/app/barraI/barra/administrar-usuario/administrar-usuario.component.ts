import { Component, Inject, OnInit } from '@angular/core';
import { AdministrarVectorRutas, mandarJson, serializarJson, Tabla } from '../../../Models/AdministrarRutasBotonces.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

import { EditarComponent } from './editar/editar.component';
import { ServiceNivelUsuario } from 'src/app/services/NivelUsuarioService.service';
import { ModelNivelUsuario } from 'src/app/Models/nivelUsuario.model';
@Component({
  selector: 'app-administrar-usuario',
  templateUrl: './administrar-usuario.component.html',
  styleUrls: ['./administrar-usuario.component.css']
})
export class AdministrarUsuarioComponent implements OnInit {
  conjuntoClases:AdministrarVectorRutas|any=[];
  dataSource= new MatTableDataSource<Tabla>();
  dataSourceClases= new MatTableDataSource<ModelNivelUsuario>();
  displayedColumns = ["clase","subclase"];
  displayedColumnsClases = ["nombre","operacion"];
  nombressubClases: String[]|any=[] ;
  nombresClases: String[]|any=[];
  elegidos: String[]|any=[];
  enviarJson: mandarJson[]|any=[];
  controlNivel: FormControl|any;
  serializarJson: serializarJson|any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: AdministrarVectorRutas, private serviceUsuario: ServiceUsuario, private matDialog: MatDialog, private serviceNivelUsuario: ServiceNivelUsuario) { }
  ngOnInit(): void {
    this.conjuntoClases=this.data;
    this.controlNivel = new FormControl('',[Validators.required]);
    this.ordenarVectores();
    this.serviceNivelUsuario.buscarNivelesUsuarios();
    this.serviceNivelUsuario.listenerNivelesUsuario().subscribe(data =>{

      this.dataSourceClases.data =data;
    })
  }
  drop(event: CdkDragDrop<AdministrarVectorRutas>|any) {
    moveItemInArray(this.conjuntoClases, event.previousIndex, event.currentIndex);
  }
  ordenarVectores(){
    var vector = this.data.nombres();
    var repetidorNombres="";
    vector.forEach((element:any) => {

        this.nombressubClases.push(element['subClase'])
        if(repetidorNombres!= element['clase']){
          this.nombresClases.push(element['clase'])
          repetidorNombres = element['clase'];
        }

    });
  }
  clickChip(evento:String|any){
     var palabra:String = "";
    if(this.elegidos.length==0){
      this.elegidos.push(evento[0]);

    }else{
      this.elegidos.forEach((element:String|any) => {
        console.log(evento[0]);

        if(element==evento[0]){
          palabra = "no"
        }

        });
        if(palabra!="no"){
          this.elegidos.push(evento[0]);
        }
    }
  }
  eliminarEleccion(eliminar:String|any){
    var vector:String[] = [];
    this.elegidos.forEach((element:String|any) => {
      if(element!=eliminar[0]){
        vector.push(element);
      }
    });
    console.log(vector);
    console.log(this.elegidos);
    this.elegidos = vector;
  }
  guardarElecciones(){

    this.dataSource.data=this.data.encontrarPorNombresTabla(this.elegidos);
  }
  enviarBD(){
    this.enviarJson=this.data.mandarJson(this.elegidos,this.controlNivel.value);
    //this.serializarJson = {valor:this.enviarJson};
    var opcion = confirm("Desea guardar en la bd?");
    if(opcion){
      this.serviceNivelUsuario.agregarNivelUsuario(this.enviarJson);
    }
    console.log(this.enviarJson);
  }
  mostrar(id:String){
    this.matDialog.open(EditarComponent,{width:'700px',height:'700px', data:{'datos':this.data,'id':id}})
  }
  eliminar(id:String){
    console.log(id);
  }
  selectionChange(event: any) {
    let stepLabel = event.selectedStep.label;
    if (stepLabel == "Eleccion de nombre") {
      this.dataSource.data=this.data.encontrarPorNombresTabla(this.elegidos);

    }
    if(stepLabel == "Mostrar funciones"){
      this.serviceNivelUsuario.buscarNivelesUsuarios();
      this.serviceNivelUsuario.listenerNivelesUsuario().subscribe(data =>{
        this.dataSourceClases.data =data;
      })
    }
  }
}
