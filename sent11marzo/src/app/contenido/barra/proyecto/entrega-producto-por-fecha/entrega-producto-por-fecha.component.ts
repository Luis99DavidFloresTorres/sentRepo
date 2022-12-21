import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-entrega-producto-por-fecha',
  templateUrl: './entrega-producto-por-fecha.component.html',
  styleUrls: ['./entrega-producto-por-fecha.component.css']
})
export class EntregaProductoPorFechaComponent implements OnInit {

  dataSource= new MatTableDataSource<ModelCotizacionProyecto>();
  formGroup:FormGroup|any;
  displayedColumns:String[]=[]
  subscriptionProyecto:Subscription|any;
  subscriptionProyectoElegido:Subscription|any;
  entregaAnt = new FormControl();
  cantidadTotal = new FormControl();
  saldo = new FormControl();
  @ViewChild(MatSort) sort: MatSort | any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private dialog:MatDialog, private serviceProyecto:ServiceProyecto, private serviceItemProyecto:ServiceItemProyecto, private formBuilder:FormBuilder, private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('es');
  }
  ngOnDestroy(): void {
    if(this.subscriptionProyecto!=undefined){
      this.subscriptionProyecto.unsubscribe();
    }
    if(this.subscriptionProyectoElegido!=undefined){
      this.subscriptionProyectoElegido.unsubscribe();
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
    this.formGroup= this.formBuilder.group({
      fecha:['',[Validators.required]]

    })



  }
  buscar(){
    if(this.subscriptionProyecto!=undefined){
      this.subscriptionProyecto.unsubscribe();
    }
    this.serviceItemProyecto.entregaProductoFecha(this.range.get('start')?.value,this.range.get('end')?.value);
    this.subscriptionProyecto = this.serviceItemProyecto.listenerEntregaProductoFecha().subscribe((proyecto:any[])=>{
      console.log(proyecto);
      var cantidadTotal = 0;
      var  entregaTotal = 0;
      var saldo = 0;
      proyecto.forEach(p=>{
        p.monto = p.cantidad-p.cantidadentr+p.entregaanterior;
        if(p.proyecto.contactopre==undefined)
          p.proyecto.contactopre = "";
        cantidadTotal += p.cantidad;
        entregaTotal += p.cantidadentr;
        saldo+=p.monto
      })
      this.dataSource.data=proyecto;//falta saldo esta la foto en el whatss de videojuegos
      this.displayedColumns=['proyecto.nombre','proyecto.cliente.nombre','proyecto.contactopre','producto.codigo','producto.nombre','producto.unidad.nombre','cantidad','entregaanterior','cantidadentr','monto']
      this.entregaAnt.setValue(entregaTotal);
      this.cantidadTotal.setValue(cantidadTotal);
      this.saldo.setValue(saldo);
    })
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
