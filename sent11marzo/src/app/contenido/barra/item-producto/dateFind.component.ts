import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ItemProductoModel } from '../../../Models/itemProducto.model';

@Component({
  selector: 'app-item-producto',
  templateUrl: './dateFind.component.html',
  styleUrls: ['./dateFind.component.css']
})
export class dateFindComponent implements OnInit, OnDestroy {
  fechaBuscar:FormControl|any;
  constructor(private serviceItemProducto: ServiceItemProducto, private dialog: MatDialogRef<dateFindComponent>, @Inject(MAT_DIALOG_DATA) private data: String){}
  //@ViewChild(MatDatepicker) fechaF: MatDatepicker<Date> | any;
  ngOnInit(): void {
      this.fechaBuscar = new FormControl('',Validators.required);
  };
  ngOnDestroy(): void {

  }
  buscarFecha(){
    var ano = this.fechaBuscar.value.getFullYear();
    var mes = this.fechaBuscar.value.getMonth()+1;
    var dia = this.fechaBuscar.value.getDate();
    mes= this.aumentar0(mes);
    dia = this.aumentar0(dia);
    var fecha = ano+"-"+mes+"-"+dia;
    if(this.data=="periodo"){
      this.serviceItemProducto.obtenerPorPeriodo(fecha);
    }else if(this.data == "ingresos"){
      this.serviceItemProducto.obtenerPorMayorIngresos(fecha,"");
    }else if(this.data == "salidas"){
      this.serviceItemProducto.obtenerPorMayorSalidas(fecha,"");
    }else if(this.data=="kardex"){
      this.serviceItemProducto.obtenerPorKardex(fecha,"");
    }
    this.dialog.close(fecha);
  }
  buscarDia(){}
  aumentar0(dato: string){
    var nuevoDato = parseInt(dato);
    if(nuevoDato<10){
      dato = "0"+nuevoDato;
      return dato;
    }else{
      return dato;
    }
  }
}
