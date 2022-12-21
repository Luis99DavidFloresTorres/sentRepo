import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceUnidad } from 'src/app/services/codificadores/unidad.service';
import { UnidadModel } from './unidad.model';
import { UnidadInsertarComponent } from './unidadInsertar.component';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre','enlace'];
  dataSource= new MatTableDataSource<UnidadModel>();
  pais:UnidadModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion:Subscription|any;
  constructor(private dialog: MatDialog, private serviceUnidades: ServiceUnidad) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.serviceUnidades.obtenerUnidades();
    this.sujetoSubscripcion=this.serviceUnidades.listenerDatosUnidad().subscribe((data)=>{
      this.dataSource.data = data;
    })
  }
  editar(id:string){
    this.dialog.open(UnidadInsertarComponent,{width:'300px', data: id})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  agregar(){
    this.dialog.open(UnidadInsertarComponent,{width:'300px'});
  }
}
