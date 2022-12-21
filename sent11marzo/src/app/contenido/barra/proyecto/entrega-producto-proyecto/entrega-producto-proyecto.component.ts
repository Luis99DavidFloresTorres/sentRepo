import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';
import { ServiceProyecto } from 'src/app/services/Proyecto.service';
import { BuscarProyectoComponent } from '../buscar-proyecto/buscar-proyecto.component';

@Component({
  selector: 'app-entrega-producto-proyecto',
  templateUrl: './entrega-producto-proyecto.component.html',
  styleUrls: ['./entrega-producto-proyecto.component.css']
})
export class EntregaProductoProyectoComponent implements OnInit, OnDestroy {
  dataSource= new MatTableDataSource<ModelItemProyecto>();
  formGroup:FormGroup|any;
  displayedColumns:String[]=[]
  subscriptionProyecto:Subscription|any;
  subscriptionProyectoElegido:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
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

      nombreProyecto:['',[Validators.required]],
      cliente:['',[Validators.required]],
      contacto:['',[Validators.required]],
      detalle:['',[Validators.required]],
      codigo:['',[Validators.required]],
      fecha:['',[Validators.required]]

    })
    this.subscriptionProyectoElegido = this.serviceProyecto.listenerEntregaProductoProyecto().subscribe(data=>{
        if(this.subscriptionProyecto!=undefined){
          this.subscriptionProyecto.unsubscribe();
        }
        this.serviceItemProyecto.obtenerByProyecto(data.id);
        this.subscriptionProyecto = this.serviceItemProyecto.listenerByProyecto().subscribe(proyecto=>{
          this.dataSource.data=proyecto;
          if(proyecto[0].producto!=undefined){
            this.displayedColumns=["producto.codigo","producto.nombre","producto.unidad.nombre","cantidad"]
          }

          this.limpiarFormulario();
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
