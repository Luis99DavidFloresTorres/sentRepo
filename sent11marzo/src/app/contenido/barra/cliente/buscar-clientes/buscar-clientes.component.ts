import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource=new MatTableDataSource<ModelCliente>();
  displayedColumns:String[]=["codigo","nombre","direccion","telefono","agregar"];
  constructor(private dialog:MatDialog, private serviceCliente:ServiceCliente, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource.data = this.data.datos;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  agregarCliente(cliente:ModelCliente){
    if(this.data.clase=='entregaProductoPorCliente'){
      console.log("mandaaaa");
      this.serviceCliente.getEncontrarEntregaProductoPorCliente().next(cliente);
    }else if(this.data.clase=='gestionCliente'){
      this.serviceCliente.getEncontrarGestionCliente().next(cliente);
    }else if(this.data.clase=='ventasporCliente'){
      this.serviceCliente.getEncontrarVentasporCliente().next(cliente);
    }/*else if(this.data.clase=='mayorCotizaciones'){
      this.serviceCliente.getEncontrarMayorCotizaciones().next(cliente);
    }*/
    this.dialog.closeAll();
  }
  hacerFiltro(filtro:any){
    this.dataSource.filter = filtro;
  }
}
