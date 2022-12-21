import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceTipoCliente } from 'src/app/services/codificadores/tipoCliente.service';
import { TiposClienteInsertarComponent } from './tipos-clienteInsertar.component';
import { tipoClienteModel } from './tiposCliente.model';

@Component({
  selector: 'app-tipos-cliente',
  templateUrl: './tipos-cliente.component.html',
  styleUrls: ['./tipos-cliente.component.css']
})
export class TiposClienteComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre','enlace'];
  dataSource= new MatTableDataSource<tipoClienteModel>();
  pais:tipoClienteModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private dialog: MatDialog, private serviceTipoCliente: ServiceTipoCliente) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.serviceTipoCliente.obtenerTiposCliente();
    this.sujetoSubscripcion=this.serviceTipoCliente.listenerDatosTipoCliente().subscribe((data)=>{
      this.dataSource.data = data;
    })
  }
  editar(id:string){

    this.dialog.open(TiposClienteInsertarComponent,{width:'300px', data: id})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  agregar(){
    this.dialog.open(TiposClienteInsertarComponent, { width:'300px'});
  }
}
