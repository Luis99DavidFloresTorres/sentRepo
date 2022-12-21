import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ItemProyectoModel } from './itemProyecto.model';

@Component({
  selector: 'app-item-proyecto',
  templateUrl: './item-proyecto.component.html',
  styleUrls: ['./item-proyecto.component.css']
})
export class ItemProyectoComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns:String|any = [];
  dataSource= new MatTableDataSource<ItemProyectoModel>();
  formCheckboxGroup : FormGroup|any;
  archivos =[];
  nuevoVector:ItemProyectoModel[]|any=[];
  limiteVector:Number|any;
  pais:ItemProyectoModel[]|any;
  sujetoSubscripcion: Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;

  constructor(private serviceItemProyecto: ServiceItemProyecto, private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.serviceItemProyecto.obtenerProyectos();
    this.displayedColumns=['id','enlace'];
    this.formCheckboxGroup = this.formBuild.group({
      check1:['',[Validators.required]],
  })
  if(this.sujetoSubscripcion!= undefined){
    this.sujetoSubscripcion.unsubscribe();
  }
  this.sujetoSubscripcion=this.serviceItemProyecto.listenerDatosItemProyecto().subscribe((datos)=>{
   // console.log(datos.splice(0));//slice devuelve un array extra y splica hace sobre el mismo
    //this.nuevoVector = datos.splice(0,datos.length-1);
    this.nuevoVector =this.cortarDatos(datos);
    this.dataSource.data=this.nuevoVector[0];
    this.limiteVector=0;
    this.dataSource.paginator=this.pag;
  });

  }
  ngOnDestroy(): void {

    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  cortarDatos(datos:ItemProyectoModel[]){
    var valor=[];
    var cortar = datos.length/5000;
    for(var i=0; i<cortar;i++){
      var resultado = datos.splice(0,5000);
      valor.push(resultado);
    }
    return valor;
  }
  atras(){
    if(this.limiteVector==0){
      alert("acción no permitida");
    }else{
      this.limiteVector-=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  adelante(){
    if(this.limiteVector==this.nuevoVector.length-1){
      alert("acción no permitida");
    }else{
      this.limiteVector+=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  obtenerDatos(id:string){}
  eliminar(id:string){}
  hacerFiltro(filtro: string){
    this.dataSource.filter=filtro;
  }
  abrirDialog(){}
}
