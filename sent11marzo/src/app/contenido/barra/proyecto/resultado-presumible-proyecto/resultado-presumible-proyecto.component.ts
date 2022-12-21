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
  selector: 'app-resultado-presumible-proyecto',
  templateUrl: './resultado-presumible-proyecto.component.html',
  styleUrls: ['./resultado-presumible-proyecto.component.css']
})
export class ResultadoPresumibleProyectoComponent implements OnInit {
  dataSource= new MatTableDataSource<ModelCotizacionProyecto>();
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
    if(this.subscriptionProyectoElegido!=undefined){
      this.subscriptionProyectoElegido.unsubscribe();
    }
    this.subscriptionProyectoElegido = this.serviceProyecto.listenerResultadoPresumibleProyecto().subscribe(data=>{
        if(this.subscriptionProyecto!=undefined){
          this.subscriptionProyecto.unsubscribe();
        }
        this.serviceItemProyecto.resultadoPresumibleProyecto(data.id);
        this.subscriptionProyecto = this.serviceItemProyecto.listenerResultadoPresumibleProyecto().subscribe((proyecto:any)=>{
          console.log(proyecto);
          var listaProyecto:ModelCotizacionProyecto[] = [];
          listaProyecto.push(proyecto);
          console.log(proyecto.utilidadSupuesto);
          this.dataSource.data = listaProyecto;
          this.displayedColumns=["impuestoReservado","gastoPrevisto","gastoEjecutado","costoTotalCompra","precioProyecto","utilidadSupuesto"];
          this.formGroup.patchValue({
            cliente:proyecto.cliente.nombre,
            detalle:proyecto.detalle,
            codigo:proyecto.nroprj,
            fecha:proyecto.fecha,
            nombreProyecto:proyecto.nombre,
            contacto:proyecto.contactopre
          })
        })
    })
  }
  buscar(){
    var enviar = {clase:'resultado-presumible-proyecto'};
    this.dialog.open(BuscarProyectoComponent,{width:'700px',height:'800px', data:enviar});
  }
}
