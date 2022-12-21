import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/Models/UsuarioModel.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-informe-ventas-porvendedor',
  templateUrl: './informe-ventas-porvendedor.component.html',
  styleUrls: ['./informe-ventas-porvendedor.component.css']
})
export class InformeVentasPorvendedorComponent implements OnInit,OnDestroy {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns:String[]=[]
  responsables:String[]=[]
  usuario:UsuarioModel[] = []
  indice:any=null;
  subscriptionInformeVentas:Subscription|any;
  subscriptionGestionUsuarios:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceInformes:ServiceInformes, private serviceUsuario:ServiceUsuario) { }
  ngOnDestroy(): void {
    if(this.subscriptionInformeVentas!=undefined){
      this.subscriptionInformeVentas.unsubscribe();
    }
    if(this.subscriptionGestionUsuarios!=undefined){
      this.subscriptionGestionUsuarios.unsubscribe();
    }
  }

  ngOnInit(): void {
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
  buscarFunction(){
    if(this.subscriptionInformeVentas!=undefined){
      this.subscriptionInformeVentas.unsubscribe();
    }
    this.serviceInformes.informesVentasPorVendedor(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value, this.usuario[this.indice]);
    this.subscriptionInformeVentas = this.serviceInformes.listenerInformeVentasPorVendedor().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=['notaventa.fecha','notaventa.cliente.nombre','notaventa.nrodoc','notaventa.proyecto.nombre','costoTotal','precioTotal']
    })

  };
  indx(indx:any){
    this.indice = indx;
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
}
