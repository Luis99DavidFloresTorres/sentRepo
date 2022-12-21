import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DescripcionNivelUsuario, ModelNivelUsuario } from 'src/app/Models/nivelUsuario.model';
import { ServiceNivelUsuario } from 'src/app/services/NivelUsuarioService.service';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';
import { AdministrarVectorRutas, mandarJson, serializarJson, Tabla } from '../../../../Models/AdministrarRutasBotonces.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  conjuntoClases:AdministrarVectorRutas|any=[];
  dataSource= new MatTableDataSource<DescripcionNivelUsuario>();
  displayedColumns = ["clase","subclase"];
  nombressubClases: String[]|any=[] ;
  nombresClases: String[]|any=[];
  elegidos: String[]|any=[];
  enviarJson: mandarJson[]|any=[];
  controlNivel: FormControl|any;
  serializarJson: serializarJson|any;
  data:any;
  tablaDato : DescripcionNivelUsuario[]=[];
  idNivel:Number|any;
  modelNivelUsuario:ModelNivelUsuario|any;
  idSubniveles:Number[]|any=[];
  constructor(@Inject(MAT_DIALOG_DATA) private datos: any, private serviceUsuario: ServiceUsuario, private serviceNivelUsuario: ServiceNivelUsuario, private MatDialog: MatDialog) { }
  ngOnInit(): void {
    this.data = this.datos['datos'];
    this.conjuntoClases=this.data;
    this.controlNivel = new FormControl('',[Validators.required]);
    this.ordenarVectores();
    this.serviceUsuario.gestionNiveles(this.datos['id']);
    this.serviceUsuario.listenerEditarSubnivel().subscribe(dato=>{
      this.tablaDato = dato['descripcionNivelUsuario'];
      this.modelNivelUsuario = dato;
      this.controlNivel.setValue(dato.nombre);
      this.idNivel = dato['id'];
      this.tablaDato.forEach(datos=>{
        if(datos['clase']=="no"){
          this.elegidos.push(datos['subclase'])
        }
        if(datos['subclase']=="no"){
          this.elegidos.push(datos["clase"]);
        }
      })
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
      console.log("entra");
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
    this.elegidos = vector;
  }

  enviarBD(){

    var mandar = this.verificarNombre(this.modelNivelUsuario,this.elegidos);

    var nivel:ModelNivelUsuario ={id:this.idNivel,descripcionNivelUsuario:mandar,nombre:this.controlNivel.value}
    //this.serializarJson = {valor:this.enviarJson};
    var opcion = confirm("Desea guardar en la bd?");
    if(opcion){
      this.serviceNivelUsuario.editarNivelUsuario(nivel);

      this.MatDialog.closeAll();
    }
    console.log(this.enviarJson);
  }
  selectionChange(event: any) {
    let stepLabel = event.selectedStep.label;
    if (stepLabel == "Eleccion de nombre") {
      this.tablaDato=this.data.encontrarPorNombresTabla(this.elegidos);

    }
  }
  verificarNombre(modelo: ModelNivelUsuario,nombreVector:String[]){
    var descripcion:DescripcionNivelUsuario[]=[];
    console.log(nombreVector.length)
    nombreVector.forEach(nombres=>{
      var verificar = 0;
      modelo.descripcionNivelUsuario.forEach(modelo=>{
        var descripcionClase = modelo.clase;
        var descripcionSubclase = modelo.subclase;
        if(((nombres == descripcionClase) || (nombres==descripcionSubclase))&&(verificar==0)){
          descripcion.push(modelo);
          verificar=1;
        }else{
          var resultado = this.conjuntoClases.claseOsubClase(nombres);
          if((resultado == "clase")&& (verificar==0)){
            var nuevaDescripcion:DescripcionNivelUsuario= {clase:nombres,subclase:"no",id:0};
            descripcion.push(nuevaDescripcion);
            verificar= 1;

          }else if((resultado == "subClase")&&(verificar==0)){
            var nuevaDescripcion:DescripcionNivelUsuario = {clase:"no",subclase:nombres,id:0};
            descripcion.push(nuevaDescripcion);
            verificar=1;
          }
        }
      })
    })
    return descripcion;
  }
}
