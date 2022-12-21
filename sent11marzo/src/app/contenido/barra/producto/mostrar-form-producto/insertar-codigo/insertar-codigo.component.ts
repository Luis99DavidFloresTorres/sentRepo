import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
/*import { Observable, Subscription } from 'rxjs';
import { CodigoEntity } from 'src/app/Models/Codigo.model';
import { ServiceCodigo } from 'src/app/services/codificadores/codigo.service';
import { EditarCodigoComponent } from '../editar-codigo/editar-codigo.component';

@Component({
  selector: 'app-insertar-codigo',
  templateUrl: './insertar-codigo.component.html',
  styleUrls: ['./insertar-codigo.component.css']
})
export class InsertarCodigoComponent implements OnInit,OnDestroy {
  formGroup: FormGroup|any;
  displayedColumns = ['codigo','nombre','enlace']
  valor = false;
  observableAllCodigo:Subscription|any;
  observableEditar:Subscription|any;
  observableInsertar:Subscription|any;
  dataSource= new MatTableDataSource<CodigoEntity>();
  constructor(private formBuilder:FormBuilder, private serviceCodigo: ServiceCodigo, private dialog: MatDialog) { }
  ngOnDestroy(): void {
    if(this.observableAllCodigo!=undefined){
      this.observableAllCodigo.unsubscribe();
    }
    if(this.observableEditar!=undefined){
      this.observableEditar.unsubscribe();
    }
    if(this.observableInsertar!=undefined){
      this.observableInsertar.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre:[],
      codigo:['',[Validators.required]]
    })
    this.serviceCodigo.obtenerAllCodigo();
    this.observableAllCodigo=this.serviceCodigo.listenerAllCodigo().subscribe(dato=>{

      this.valor=true;
      this.dataSource.data = dato;

    })
    this.observableEditar=this.serviceCodigo.listenerEditar().subscribe(dato=>{
      if(this.observableAllCodigo!=undefined){
        this.observableAllCodigo.unsubscribe();
      }
      this.serviceCodigo.obtenerAllCodigo();
      this.observableAllCodigo=this.serviceCodigo.listenerAllCodigo().subscribe(dato=>{

        this.valor=true;
        this.dataSource.data = dato;

      })
    })
    this.observableInsertar=this.serviceCodigo.listenerInsertar().subscribe(dato=>{
      if(this.observableAllCodigo!=undefined){
        this.observableAllCodigo.unsubscribe();
      }
      this.serviceCodigo.obtenerAllCodigo();
      this.observableAllCodigo=this.serviceCodigo.listenerAllCodigo().subscribe(dato=>{

        this.valor=true;
        this.dataSource.data = dato;

      })
    })
  }
  editar(id:String){
    this.dialog.open(EditarCodigoComponent,{width:'300px',height:'250px', data:{'boton':'editar','id':id}})
  }
  eliminar(id:String){

  }
  abrirDialog(){
    this.dialog.open(EditarCodigoComponent,{width:'300px',height:'250px', data:{'boton':'insertar'}})
  }
}
*/
