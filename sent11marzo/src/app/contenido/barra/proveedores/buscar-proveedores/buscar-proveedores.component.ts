import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceProveedor } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-buscar-proveedores',
  templateUrl: './buscar-proveedores.component.html',
  styleUrls: ['./buscar-proveedores.component.css']
})
export class BuscarProveedoresComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource=new MatTableDataSource<ProveedorModel>();
  displayedColumns=["codigo","nombre","direccion","telefono","agregar"];
  constructor(private dialog:MatDialog, private serviceProveedor:ServiceProveedor, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource.data = this.data.datos;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  agregarProveedores(proveedor:ProveedorModel){
    if(this.data.clase=='gestionProveedor'){
      this.serviceProveedor.getEncontrarGestionProveedor().next(proveedor);
    }else if(this.data.clase=='mayorCompras'){
      this.serviceProveedor.getEncontrarMayorDeCompras().next(proveedor);
    }else if(this.data.clase=='mayorOrdenesCompra'){
      this.serviceProveedor.getEncontrarMayorOrdenesCompras().next(proveedor);
    }else if(this.data.clase=='mayorCotizaciones'){
      this.serviceProveedor.getEncontrarMayorCotizaciones().next(proveedor);
    }else if(this.data.clase=='productoItemProductoCompra'){
      this.serviceProveedor.getEncontrarProductoItemCompra().next(proveedor);
    }else if(this.data.clase=='productoOrdenCompra'){
      this.serviceProveedor.getEncontrarProductoOrdenCompra().next(proveedor);
    }else if(this.data.clase=='productoCotizacion'){
      this.serviceProveedor.getEncontrarProductoCotizacion().next(proveedor);

    }
    this.dialog.closeAll();
  }
  hacerFiltro(filtro:any){
    this.dataSource.filter = filtro;
  }

}
