import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';

@Component({
  selector: 'app-estado-proyectos',
  templateUrl: './estado-proyectos.component.html',
  styleUrls: ['./estado-proyectos.component.css']
})
export class EstadoProyectosComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ModelCotizacionProyecto>();
  estado:String[]=[]
  estadoForm = new FormControl();

  @ViewChild(MatSort) sort: MatSort | any;
  subscriptionEstadoProyectos:Subscription|any;
  subscriptionEstados : Subscription|any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  displayedColumns:String[] =[]//'fecha','codigo','nombre','responsable','fechaini','fechafinal','estado'
  constructor(private serviceProyecto:ServiceProyecto, private dateAdapter:DateAdapter<any>) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscriptionEstados!=undefined){
      this.subscriptionEstados.unsubscribe();
    }
    if(this.subscriptionEstadoProyectos!=undefined){
      this.subscriptionEstadoProyectos.unsubscribe();
    }
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
  ngOnInit(): void {


    this.serviceProyecto.estados();

    this.subscriptionEstados = this.serviceProyecto.listenerEstados().subscribe(data=>{
      this.estado  = data;
      this.estado.push('TODOS');
    })
  }
  buscarProyecto(){
    console.log(this.estadoForm.value);
    this.serviceProyecto.estadoProyectos(this.range.get('start')?.value,this.range.get('end')?.value, this.estadoForm.value);
    this.subscriptionEstadoProyectos = this.serviceProyecto.listenerEstadoProyectos().subscribe(proyectos=>{
      this.dataSource.data=proyectos;
      this.displayedColumns=['fecha','nombre','responsable','fechaini','fechafin','estado'];
    })
  }
  estadoFunction(){}
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
