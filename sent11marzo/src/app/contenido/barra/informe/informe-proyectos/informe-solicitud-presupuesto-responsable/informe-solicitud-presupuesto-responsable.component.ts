import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotaSolicitudModel } from 'src/app/Models/NotaSolicitud.model';
import { UsuarioModel } from 'src/app/Models/UsuarioModel.model';
import { ServiceNotaSolicitud } from 'src/app/services/NotaSolicitud.service';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-informe-solicitud-presupuesto-responsable',
  templateUrl: './informe-solicitud-presupuesto-responsable.component.html',
  styleUrls: ['./informe-solicitud-presupuesto-responsable.component.css']
})
export class InformeSolicitudPresupuestoResponsableComponent implements OnInit {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<NotaSolicitudModel>();
  displayedColumns:String[]=[]
  subscriptionPeriodo2Fechas:Subscription|any;
  indice:any=null;
  @ViewChild(MatSort) sort: MatSort | any;
  responsables:String[]=[]
  usuario:UsuarioModel[] = []
  subscriptionGestionUsuarios:Subscription|any;
  total:FormControl = new FormControl();
  constructor(private formBuilder:FormBuilder, private serviceNotaSolicitud:ServiceNotaSolicitud, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>, private serviceUsuario:ServiceUsuario) { }
  ngOnDestroy(): void {
    if(this.subscriptionPeriodo2Fechas!=undefined){
      this.subscriptionPeriodo2Fechas.unsubscribe();
    }
    if(this.subscriptionGestionUsuarios!=undefined){
      this.subscriptionGestionUsuarios.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:[''],
      responsable:['']
    })
    if(this.subscriptionGestionUsuarios!=undefined){
      this.subscriptionGestionUsuarios.unsubscribe();
    }
    this.serviceUsuario.mostrarUsuarios();
    this.subscriptionGestionUsuarios = this.serviceUsuario.listenerGestionUsuarios().subscribe(data=>{
      var vector:String[] = [];
      var usuarioLocal:UsuarioModel[] = []
      data.forEach(datos=>{
        vector.push(datos.nombre)
        usuarioLocal.push(datos);
      })
      this.usuario = usuarioLocal;
      this.responsables = vector;
    });
  }
  indx(indx:any){
    this.indice = indx;
  }
  buscarItems(){
    if(this.subscriptionPeriodo2Fechas!=undefined){
      this.subscriptionPeriodo2Fechas.unsubscribe();
    }
    this.serviceNotaSolicitud.entreFechasResponsable(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value,this.usuario[this.indice].nombre);
    this.subscriptionPeriodo2Fechas = this.serviceNotaSolicitud.listenerResponsableNombre().subscribe(data=>{
      var montoT:number = 0;
      this.dataSource.data=data;
      this.displayedColumns = ['fecha','nrodoc','proyecto.nombre','proyecto.cliente.nombre','detalle','monto'];
      data.forEach(monto=>{

        montoT +=monto.monto.valueOf()
      })
      this.total.setValue(montoT);
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
