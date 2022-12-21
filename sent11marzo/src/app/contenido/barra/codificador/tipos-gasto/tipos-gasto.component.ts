import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceTipoGasto} from 'src/app/services/codificadores/tipoGasto.service';
import { tipoGastoModel } from './tipoGasto.model';
import { TiposGastoInsertarComponent } from './tipos-gastoInsertar.component';

@Component({
  selector: 'app-tipos-gasto',
  templateUrl: './tipos-gasto.component.html',
  styleUrls: ['./tipos-gasto.component.css']
})
export class TiposGastoComponent implements OnInit, OnDestroy {
  displayedColumns = ['codigo','nombre','tipo','unidad','precio','enlace'];
  dataSource= new MatTableDataSource<tipoGastoModel>();
  pais:tipoGastoModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private dialog: MatDialog, private serviceTipoGasto: ServiceTipoGasto) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.serviceTipoGasto.obtenerGastos();
    this.sujetoSubscripcion= this.serviceTipoGasto.listenerDatosGasto().subscribe((data)=>{
      this.dataSource.data = data;
    })
  }
  editar(id:string){

    this.dialog.open(TiposGastoInsertarComponent,{width:'300px', data: id})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  agregar(){
    this.dialog.open(TiposGastoInsertarComponent,{width:'300px'});
  }
}
