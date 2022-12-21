import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelCotizacionProyecto } from 'src/app/Models/CotizacionProyecto.model';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-seguimientpor-usuario',
  templateUrl: './seguimientpor-usuario.component.html',
  styleUrls: ['./seguimientpor-usuario.component.css']
})
export class SeguimientporUsuarioComponent implements OnInit {
  dataSource= new MatTableDataSource<any>();
  formGroup:FormGroup|any;
  displayedColumns:String[]=[]
  subscriptionSeguimientoPorUsuario:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;

  subscriptionProyecto:Subscription|any;
  proyecto:ModelCotizacionProyecto|any = null;

  subscriptionProyectoElegido:Subscription|any;
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
    if(this.subscriptionSeguimientoPorUsuario!=undefined){
      this.subscriptionSeguimientoPorUsuario.unsubscribe();
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
      nombreProyecto:['',[Validators.required]],
      cliente:['',[Validators.required]],
      contacto:['',[Validators.required]],
      detalle:['',[Validators.required]],
      codigo:['',[Validators.required]],
      fecha:['',[Validators.required]]
    })
    if(this.subscriptionProyectoElegido!=undefined){
      this.subscriptionProyectoElegido.unsubscribe();
    }
    this.subscriptionProyectoElegido = this.serviceProyecto.listenerEntregaProductoProyecto().subscribe(data=>{
        if(this.subscriptionProyecto!=undefined){
          this.subscriptionProyecto.unsubscribe();
        }
        this.serviceItemProyecto.obtenerByProyecto(data.id);
        this.subscriptionProyecto = this.serviceItemProyecto.listenerByProyecto().subscribe(proyecto=>{
         // this.dataSource.data=proyecto;
         this.proyecto = proyecto[0].proyecto;
         this.limpiarFormulario();
         console.log(this.proyecto);
          this.formGroup.patchValue({
            cliente:proyecto[0].proyecto.cliente.nombre,
            detalle:proyecto[0].proyecto.detalle,
            codigo:proyecto[0].proyecto.nroprj,
            fecha:proyecto[0].proyecto.fecha,
            nombreProyecto:proyecto[0].proyecto.nombre,
            contacto:proyecto[0].proyecto.contactopre
          })
        })
    })
  }
  buscar(){
    var enviar = {clase:'entrega-producto-proyecto'};
    this.dialog.open(BuscarProyectoComponent,{width:'700px',height:'800px', data:enviar});
  }
  buscarItems(){
      if(this.subscriptionSeguimientoPorUsuario!=undefined){
        this.subscriptionSeguimientoPorUsuario.unsubscribe();
      }
      this.serviceProyecto.seguimientoPorUsuario(this.proyecto);
      this.subscriptionSeguimientoPorUsuario = this.serviceProyecto.listenerSeguimientoPorUsuario().subscribe(data=>{

        this.dataSource.data = data;
        this.displayedColumns=["fecha","accion","responsable"];
      })
  }
  limpiarFormulario(){
    this.formGroup.patchValue({
      nombreProyecto:'',
      cliente:'',
      contacto:'',
      detalle:'',
      codigo:'',
      fecha:''
    })
  }
}
