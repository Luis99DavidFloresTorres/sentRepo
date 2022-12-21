import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModelItemAsigna } from 'src/app/Models/ItemAsigna.model';
import { ServiceItemAsigna } from 'src/app/services/ItemAsigna.service';
import { ServiceNotaAsigna } from 'src/app/services/NotaAsigna.service';
import { BuscarNotaasignaComponent } from '../buscar-notaasigna/buscar-notaasigna.component';

@Component({
  selector: 'app-devolucion-herramienta',
  templateUrl: './devolucion-herramienta.component.html',
  styleUrls: ['./devolucion-herramienta.component.css']
})
export class DevolucionHerramientaComponent implements OnInit, OnDestroy {
  displayedColumns: String[]=[]
  documento:FormGroup|any;
  @ViewChild(MatSort) sort: MatSort | any;
  itemsHerramienta:FormGroup|any;
  dataSource = new MatTableDataSource<ModelItemAsigna>();
  subscriptionnotaAsigna:Subscription|any;
  subscriptionTablaItemsAsigna:Subscription|any;
  useract:String = "";
  fechaact:String = "";
  constructor(private formBuilder:FormBuilder, private serviceNotaAsigna:ServiceNotaAsigna, private serviceItemAsigna:ServiceItemAsigna, private matDialog:MatDialog, @Inject(LOCALE_ID) private locale: string) { }
  ngOnDestroy(): void {
    if(this.subscriptionnotaAsigna!=undefined) {
      this.subscriptionnotaAsigna.unsubscribe();
    }
    if(this.subscriptionTablaItemsAsigna!=undefined){
      this.subscriptionTablaItemsAsigna.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.documento = this.formBuilder.group({
        nrodoc:[''],
        responsable:[''],
        observaciones:[''],
        fechaAsignacion:['']
    })
    if(this.subscriptionnotaAsigna!=undefined) {
      this.subscriptionnotaAsigna.unsubscribe();
    }
    if(this.subscriptionTablaItemsAsigna!=undefined){
      this.subscriptionTablaItemsAsigna.unsubscribe();
    }
    this.subscriptionnotaAsigna = this.serviceNotaAsigna.listenerDevolucionHerramienta().subscribe(data=>{
      const formatDate3 = (date:any)=>{
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
         return formatted_date;
        }
      var fecha = new DatePipe('en-US');
      this.limpiarFormulario();
      this.documento.patchValue({
        nrodoc:data.nrodoc,
        responsable:data.responsable,
        observaciones:data.detalle,
        fechaAsignacion:fecha.transform(data.fecha,'dd/MM/yyyy')
      })
      var fechaString = formatDate(data.fechaact,'dd-MM-yyyy hh-mm',this.locale);
      this.fechaact = fechaString;
      this.useract = data.useract;
    })
    this.subscriptionTablaItemsAsigna = this.serviceItemAsigna.listenerItemsPorNotaAsigna().subscribe(data=>{

      this.dataSource.data=data;
      this.displayedColumns=['activoFijo.codigo','activoFijo.nombre','detalle','activoFijo.unidad']
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
  buscar(){
    var mandar = {'clase':'devolucionHerramienta'}
    this.matDialog.open(BuscarNotaasignaComponent,{width:'800px',height:'800px',data:mandar})
  }
  limpiarFormulario(){
    this.useract = "";
    this.fechaact = "";
    this.documento.patchValue({
      nrodoc:'',
      responsable:'',
      observaciones:'',
      fechaAsignacion:''
    })
  }
}
