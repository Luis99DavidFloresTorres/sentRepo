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
  selector: 'app-informe-solicitud-descargo-responsable',
  templateUrl: './informe-solicitud-descargo-responsable.component.html',
  styleUrls: ['./informe-solicitud-descargo-responsable.component.css']
})
export class InformeSolicitudDescargoResponsableComponent implements OnInit {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<NotaSolicitudModel>();
  displayedColumns:String[]=[]
  subscriptionPeriodo2Fechas:Subscription|any;
  usuario:UsuarioModel[] = []
  responsables :String[]=[]
  indice:any=null;
  subscriptionGestionUsuarios:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  montoDescargo = new FormControl();
  saldoContra = new FormControl();
  montoSolicitado = new FormControl();
  saldoFavor = new FormControl();
  constructor(private formBuilder:FormBuilder, private serviceNotaSolicitud:ServiceNotaSolicitud, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>, public serviceUsuario:ServiceUsuario) { }
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
    this.serviceNotaSolicitud.entreFechasResponsableDescargo(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value, this.informeVentas.get('responsable').value);
    this.subscriptionPeriodo2Fechas = this.serviceNotaSolicitud.listenerResponsableNombreDescargo().subscribe(data=>{
      //console.log(data);
      this.dataSource.data=data;
      this.displayedColumns = ['fecha','nrodoc','proyecto.nombre','proyecto.cliente.nombre','detalle','monto','montoDescargo'];
      var montoDescargo = 0;
      var montoSolicitud = 0;
      data.forEach(dataf=>{
        if(dataf.monto!=undefined){
         // console.log(montoDescargo)
         // console.log(dataf.montodescargo)
         if(dataf.monto!=undefined){
          montoSolicitud+=dataf.monto.valueOf();
         }
        }
        if(dataf.montodescargo!=undefined){
          if(dataf.montodescargo!=undefined){
            montoDescargo+=dataf.montodescargo.valueOf();
          }
        }

      })

      this.montoDescargo.setValue(montoDescargo);
      this.montoSolicitado.setValue(montoSolicitud);
      this.saldoFavor.setValue(montoDescargo-montoSolicitud);
      if(montoSolicitud-montoDescargo>0){
        this.saldoContra.setValue(montoSolicitud-montoDescargo);
      }else{
        this.saldoContra.setValue(0);
      }

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
