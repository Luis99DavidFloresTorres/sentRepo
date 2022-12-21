import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceProducto } from 'src/app/services/producto.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<ProductoModel>();
  displayedColumns=["nombre","codigo",'serial',"detalle","agregar"];
  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private serviceProducto:ServiceProducto, private matDialogRef: MatDialogRef<BuscarProductosComponent>) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
  }

  ngOnInit(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
    this.serviceProducto.obtenerProductosImagen();
    this.subscriptionAllProyectos = this.serviceProducto.listenerDatosProductoImagen().subscribe(data=>{
      this.dataSource.data = data;
    })
  }
  pathDataAccessor(item: any, path: string): any {
    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.pathDataAccessor;
  }
  agregarProducto(producto:ProductoModel){
    if(this.data.clase=='entre2fechas'){
      this.serviceProducto.getEntre2Fechas().next(producto);
    }else if(this.data.clase=='entre2fechasDeposito'){
      this.serviceProducto.getEntre2FechasDeposito().next(producto);
    }
    this.matDialogRef.close();
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm:any, key:any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  nestedFilterCheck(search:any, data:any, key:any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
