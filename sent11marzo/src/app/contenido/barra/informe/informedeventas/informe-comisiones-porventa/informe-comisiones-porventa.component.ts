import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsuarioModel } from 'src/app/Models/UsuarioModel.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-informe-comisiones-porventa',
  templateUrl: './informe-comisiones-porventa.component.html',
  styleUrls: ['./informe-comisiones-porventa.component.css']
})
export class InformeComisionesPorventaComponent implements OnInit, OnDestroy {
  informeVentas:FormGroup|any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns:String[]=[]
  responsables:String[]=[]
  usuario:UsuarioModel[]=[]
  indice = 0;
  subscriptionInformeComision:Subscription|any;
  subscriptionGestionUsuario:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceInformes:ServiceInformes, private serviceUsuario:ServiceUsuario) { }
  ngOnDestroy(): void {
    if(this.subscriptionInformeComision!=undefined) {
      this.subscriptionInformeComision.unsubscribe();
    }
    if(this.subscriptionGestionUsuario!=undefined){
      this.subscriptionGestionUsuario.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:[''],
      responsable:[''],
      cargo:[''],
      comision:['']
    })
    if(this.subscriptionGestionUsuario!=undefined){
      this.subscriptionGestionUsuario.unsubscribe();
    }
    this.serviceUsuario.mostrarUsuarios();
    this.subscriptionGestionUsuario = this.serviceUsuario.listenerGestionUsuarios().subscribe(data=>{
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
  selectClick(index:number){
    this.informeVentas.patchValue({
        cargo:this.usuario[index].tipoUsuario.nombre,
        comision:this.usuario[index].comision
    })
    this.indice=index;
  }
  buscar(){
    if(this.subscriptionInformeComision!=undefined) {
      this.subscriptionInformeComision.unsubscribe();
    }
    this.serviceInformes.informesComision(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value, this.usuario[this.indice]);
    this.subscriptionInformeComision = this.serviceInformes.listenerInformeComision().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=['notaventa.fecha','notaventa.cliente.nombre','notaventa.nrodoc','notaventa.proyecto.nombre','precioTotal','totalComision']
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
}
