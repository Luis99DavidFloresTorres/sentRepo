import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { ItemProyectoModel } from '../../item-proyecto/itemProyecto.model';

@Component({
  selector: 'app-buscar-proyecto',
  templateUrl: './buscar-proyecto.component.html',
  styleUrls: ['./buscar-proyecto.component.css']
})
export class BuscarProyectoComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<ItemProyectoModel>();
  displayedColumns=["fecha",'nroprj',"nombre","estado",'cliente.nombre',"agregar"];
  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private serviceProyecto:ServiceProyecto) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.serviceProyecto.obtenerTodosProyectos();
    this.subscriptionAllProyectos = this.serviceProyecto.listenerTodosProyecto().subscribe(data=>{
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
  agregarProyecto(proyecto:ModelCotizacionProyecto){
    if(this.data.clase=='entrega-producto-proyecto'){
      this.serviceProyecto.getEntregaProductoProyecto().next(proyecto);
    }else if(this.data.clase=='entrega-producto-por-fecha'){
      this.serviceProyecto.getEntregaProdutoFecha().next(proyecto);
    }else if(this.data.clase=='resultado-presumible-proyecto'){
      this.serviceProyecto.getResultadoPresumibleProyecto().next(proyecto);
    }else if(this.data.clase=='adjudicarProyecto'){
      this.serviceProyecto.getAdjudicarProyectoFormulario().next(proyecto);
    }else if(this.data.clase=='cobroProyecto'){
      if(proyecto.estado=='EJECUTADO' || proyecto.estado=='EJECUCION' || proyecto.estado=='ADJUDICADO')
      this.serviceProyecto.getCobroProyecto().next(proyecto);
      else{
        alert("El proyecto no se encuentra en estado de Ejecutado o Ejecucion o Adjudicado, Busque otro Proyecto")
      }
    }else if(this.data.clase=='gestionProyecto'){
      this.serviceProyecto.getGestionProyecto().next(proyecto);
    }else if(this.data.clase=="descargoGasto"){
      this.serviceProyecto.getDescargoGasto().next(proyecto);
    }else if(this.data.clase=='informeProyectoCotizacionProducto'){
      this.serviceProyecto.getInformeProyectoCotizacionProducto().next(proyecto);
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
