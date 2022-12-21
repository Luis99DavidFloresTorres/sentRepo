import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelNotaAsigna } from 'src/app/Models/NotaAsigna.model';
import { ServiceItemAsigna } from 'src/app/services/ItemAsigna.service';
import { ServiceNotaAsigna } from 'src/app/services/NotaAsigna.service';

@Component({
  selector: 'app-buscar-notaasigna',
  templateUrl: './buscar-notaasigna.component.html',
  styleUrls: ['./buscar-notaasigna.component.css']
})
export class BuscarNotaasignaComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<ModelNotaAsigna>();
  displayedColumns:String[]=[];
  subscriptionAllNotas:Subscription|any;
  constructor(private dialogRef:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private servicenotaAsigna:ServiceNotaAsigna, private dateAdapter: DateAdapter<any>, private serviceItemAsigna:ServiceItemAsigna) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
    if(this.subscriptionAllNotas!=undefined){
      this.subscriptionAllNotas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale("es");
    this.servicenotaAsigna.encontrarNotas();
    this.subscriptionAllNotas =   this.servicenotaAsigna.listenerAllNotas().subscribe(data=>{
        this.dataSource.data = data;
        this.displayedColumns=["nrodoc","fecha","responsable",'observaciones',"agregar"];
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
  agregarNotaAsigna(notaAsigna:ModelNotaAsigna){
    if(this.data.clase=='devolucionHerramienta'){
      this.servicenotaAsigna.getDevolucionHerramienta().next(notaAsigna);
      this.serviceItemAsigna.obtenerItemsPorNotaAsigna(notaAsigna);
    }else if(this.data.clase=='asignacionHerramienta'){
      this.servicenotaAsigna.getAsignacionHerramienta().next(notaAsigna);
      this.serviceItemAsigna.obtenerItemsPorAsignacionHerramienta(notaAsigna);


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
