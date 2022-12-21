import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotaDescargoModel } from 'src/app/Models/NotaDescargo.model';
import { ServiceItemDescargo } from 'src/app/services/ItemDescargo.service';
import { ServiceNotaDescargo } from 'src/app/services/NotaDescargo.service';

@Component({
  selector: 'app-buscar-descargo-gasto',
  templateUrl: './buscar-descargo-gasto.component.html',
  styleUrls: ['./buscar-descargo-gasto.component.css']
})
export class BuscarDescargoGastoComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionAllProyectos:Subscription|any;
  dataSource=new MatTableDataSource<NotaDescargoModel>();
  displayedColumns:String[]=[];
  subscriptionNotasMonto:Subscription|any;
  constructor(private dialogRef:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private serviceItemDecargo:ServiceItemDescargo, private dateAdapter: DateAdapter<any>) { }
  ngOnDestroy(): void {
    if(this.subscriptionAllProyectos!=undefined) {
      this.subscriptionAllProyectos.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale("es");
    this.serviceItemDecargo.findNotasMonto();
    this.subscriptionNotasMonto =   this.serviceItemDecargo.listenerNotasMonto().subscribe(data=>{
        this.dataSource.data = data;
        this.displayedColumns=["nrodoc","fecha","montoTotal",'proyecto.nombre','responsable',"agregar"];
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
  agregarNotaAsigna(notadescargo:NotaDescargoModel){
    if(this.data.clase=='descargogasto'){
      this.serviceItemDecargo.encontrarPorNotasDescargo(notadescargo);

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
