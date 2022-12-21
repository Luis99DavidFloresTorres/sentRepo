import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { DepositoModel } from './deposito.model';
import { DepositoInsertarComponent } from './depositoInsertar.component';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css']
})
export class DepositosComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre',"direccion",'enlace'];
  dataSource= new MatTableDataSource<DepositoModel>();
  pais:DepositoModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion:Subscription|any;
  constructor(private dialog: MatDialog, private serviceDeposito: ServiceDeposito) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.serviceDeposito.obtenerDepositos();
    this.sujetoSubscripcion= this.serviceDeposito.listenerDatosDeposito().subscribe((data)=>{
      this.dataSource.data= data;
    })
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  editar(id:string){

    this.dialog.open(DepositoInsertarComponent,{width:'300px', data: id})
  }
  guardar(){
    this.dialog.open(DepositoInsertarComponent,{width:'300px'});
  }
}
