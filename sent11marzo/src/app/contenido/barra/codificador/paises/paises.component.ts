import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServicePais } from 'src/app/services/codificadores/pais.service';
import { PaisModel } from './pais.model';
import { PaisInsertarComponent } from './paisInsertar.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre','enlace'];
  dataSource= new MatTableDataSource<PaisModel>();
  pais:PaisModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private dialog: MatDialog, private servicePais: ServicePais) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.servicePais.obtenerPaises();
    this.sujetoSubscripcion= this.servicePais.listenerDatosPais().subscribe((data)=>{
      this.dataSource.data = data;
    })
  }
  editar(id:string){

    this.dialog.open(PaisInsertarComponent,{width:'300px', data: id})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  guardar(){
    this.dialog.open(PaisInsertarComponent,{width:'300px'});
  }
  eliminar(id:string){
      this.servicePais.eliminarPais(id);
  }
}
