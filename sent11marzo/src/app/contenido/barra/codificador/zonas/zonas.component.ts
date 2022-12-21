import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceZona } from 'src/app/services/codificadores/zona.service';
import { ZonaModel } from './zona.model';
import { ZonasInsertarComponent } from './zonasInsertar.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['codigo','ciudad','nombre','enlace'];
  dataSource= new MatTableDataSource<ZonaModel>();
  pais:ZonaModel[]|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;
  sujetoSubscripcion: Subscription|any;
  constructor(private dialog: MatDialog, private serviceZona: ServiceZona) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.serviceZona.obtenerZonas();
    this.sujetoSubscripcion=this.serviceZona.listenerDatosZona().subscribe((datos)=>{
      this.dataSource.data = datos;

      this.dataSource.paginator = this.pag;

    })

    /*this.pais = [{codigo:'111-12',zona:'manco kapac',ciudad:'sucre'}];
    this.dataSource.data = this.pais;*/
  }
  editar(id:String){
    console.log(id);
    this.dialog.open(ZonasInsertarComponent,{width:'300px', data: id});
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
  abrirDialog(){
    this.dialog.open(ZonasInsertarComponent,{width:'300px'});
  }
}
