import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotaSolicitudModel } from 'src/app/Models/NotaSolicitud.model';
import { ServiceNotaSolicitud } from 'src/app/services/NotaSolicitud.service';

@Component({
  selector: 'app-buscarnotasolicitud',
  templateUrl: './buscarnotasolicitud.component.html',
  styleUrls: ['./buscarnotasolicitud.component.css']
})
export class BuscarnotasolicitudComponent implements OnInit {

 @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<NotaSolicitudModel>();
  displayedColumns:String[]=[];
  solicitud:Subscription|any;
  constructor(private dialogRef:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,  private dateAdapter: DateAdapter<any>, private serviceNotaSolicitud:ServiceNotaSolicitud) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
    if(this.solicitud!=undefined){
      this.solicitud.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale("es");
    this.serviceNotaSolicitud.findAll();
    this.solicitud = this.serviceNotaSolicitud.listenerAll().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=["fecha","nrodoc","useract","monto",'proyecto.nombre',"agregar"];
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
  agregarNotaAsigna(notaAsigna:NotaSolicitudModel){
    if(this.data.clase=='solicitudPresupuesto'){
      this.serviceNotaSolicitud.getNotaSolicitud().next(notaAsigna);

    }
    this.dialogRef.closeAll();
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
