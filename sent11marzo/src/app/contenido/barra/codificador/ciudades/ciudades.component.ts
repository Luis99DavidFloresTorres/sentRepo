import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { CiudadesModel } from './ciudades.model';
import { CiudadesInsertarComponent } from './ciudadesInsertar.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['codigo','pais',"nombre",'enlace'];
  dataSource= new MatTableDataSource<CiudadesModel>();
  pais:CiudadesModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private dialog: MatDialog, private serviceCiudad: ServiceCiudad) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.serviceCiudad.obtenerCiudades();
   this.sujetoSubscripcion=this.serviceCiudad.listenerDatosCiudad().subscribe((data)=>{
     this.dataSource.data = data;
   })
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  ver(id:String){
    this.dialog.open(CiudadesInsertarComponent,{width:'300px', data: id});
  }
  abrirDialog(){
    this.dialog.open(CiudadesInsertarComponent,{width:'300px'});
  }
}
