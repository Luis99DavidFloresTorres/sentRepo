import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceRubro } from 'src/app/services/codificadores/rubro.service';
import { RubroModel } from './rubros.model';
import { RubrosInsertarComponent } from './rubrosInsertar.component';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit, OnDestroy {
  displayedColumns = ['nombre','detalle','enlace'];
  dataSource= new MatTableDataSource<RubroModel>();
  pais:RubroModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion:Subscription|any;
  constructor(private dialog : MatDialog, private serviceRubro: ServiceRubro) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.serviceRubro.obtenerRubros();
    this.sujetoSubscripcion=this.serviceRubro.listenerDatosRubro().subscribe((data)=>{
      this.dataSource.data = data;
    })
  }
  editar(id:string){

    this.dialog.open(RubrosInsertarComponent,{width:'300px', data: id})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  abrirDialog(){
    this.dialog.open(RubrosInsertarComponent,{width:'300px'});
  }
}
