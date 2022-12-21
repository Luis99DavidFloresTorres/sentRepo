import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivoFijoModel } from 'src/app/Models/ActivoFijo.model';
import { ServiceActivoFijo } from 'src/app/services/ActivoFijo.service';

@Component({
  selector: 'app-buscar-herramienta',
  templateUrl: './buscar-herramienta.component.html',
  styleUrls: ['./buscar-herramienta.component.css']
})
export class BuscarHerramientaComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<ActivoFijoModel>();
  displayedColumns=["codigo","nombre","estado",'fechaing',"situacion","agregar"];
  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private serviceActivoFijo:ServiceActivoFijo) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
  }

  ngOnInit(): void {
      this.dataSource.data = this.data.datos;
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
  agregarProyecto(activoFijo:ActivoFijoModel){
    if(this.data.clase=='gestionHerramienta'){
      this.serviceActivoFijo.getSubjectHerramienta().next(activoFijo);
    }
    this.dialog.closeAll();
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
