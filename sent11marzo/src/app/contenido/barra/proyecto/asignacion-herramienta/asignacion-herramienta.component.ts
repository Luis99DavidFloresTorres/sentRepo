import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivoFijoModel } from 'src/app/Models/ActivoFijo.model';
import { ModelItemAsigna } from 'src/app/Models/ItemAsigna.model';
import { ModelNotaAsigna } from 'src/app/Models/NotaAsigna.model';
import { ServiceItemAsigna } from 'src/app/services/ItemAsigna.service';
import { ServiceNotaAsigna } from 'src/app/services/NotaAsigna.service';
import { BuscarNotaasignaComponent } from '../buscar-notaasigna/buscar-notaasigna.component';

@Component({
  selector: 'app-asignacion-herramienta',
  templateUrl: './asignacion-herramienta.component.html',
  styleUrls: ['./asignacion-herramienta.component.css']
})
export class AsignacionHerramientaComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<ModelItemAsigna>();
  documento:FormGroup|any;
  displayedColumns : String[]=[];
  subscriptionAsignacionHerramienta:Subscription|any;
  subscriptionItems:Subscription|any;
  useract:String = "";
  fechaact:String = "";
  constructor(private formBuilder:FormBuilder, private serviceItemAsigna:ServiceItemAsigna, private matDialog:MatDialog, private serviceNotaAsigna:ServiceNotaAsigna, @Inject(LOCALE_ID) private locale: string) { }
  ngOnDestroy(): void {
    if(this.subscriptionAsignacionHerramienta!=undefined) {
      this.subscriptionAsignacionHerramienta.unsubscribe();
    }
    if(this.subscriptionItems!=undefined) {
      this.subscriptionItems.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.documento  = this.formBuilder.group({
        nrodoc:[''],
        responsable:[''],
        observaciones:[''],
        fecha:['']
    })
    if(this.subscriptionAsignacionHerramienta!=undefined) {
      this.subscriptionAsignacionHerramienta.unsubscribe();
    }
    if(this.subscriptionItems!=undefined) {
      this.subscriptionItems.unsubscribe();
    }
    this.subscriptionItems = this.serviceItemAsigna.listenerItemsAsignacionHerramienta().subscribe(data=>{
      this.dataSource.data = data;
      this.displayedColumns=['activoFijo.codigo','activoFijo.nombre','detalle','activoFijo.unidad'];
    })
    this.subscriptionAsignacionHerramienta = this.serviceNotaAsigna.listenerAsignacionHerramienta().subscribe(data=>{
      this.limpiarFormulario();
      this.useract = "";
      this.fechaact = "";
      this.documento.patchValue({
        nrodoc:data.nrodoc,
        responsable:data.responsable,
        observacion:data.detalle,
        fecha:data.fecha
      })
      var fechaString = formatDate(data.fechaact,'dd-MM-yyyy hh-mm',this.locale);
      this.fechaact = fechaString;
      this.useract = data.useract;
    })
  }
  buscar(){
      var mandar = {clase:'asignacionHerramienta'}
      this.matDialog.open(BuscarNotaasignaComponent,{width:'800px',height:'700px',data:mandar})
  }
  limpiarFormulario(){
    this.documento.patchValue({
      nrodoc:'',
      responsable:'',
      observaciones:'',
      fecha:''
    })
  }
}
