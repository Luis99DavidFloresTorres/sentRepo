import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

import { ServiceProducto } from 'src/app/services/producto.service';

@Component({
  selector: 'app-buscar-nombre',
  templateUrl: './buscar-nombre.component.html',
  styleUrls: ['./buscar-nombre.component.css']
})
export class BuscarNombreComponent implements OnInit, OnDestroy{

  myControl = new FormControl();
  options: String[]=[];
  obtenerValores: ProductoModel|any;
  filteredOptions: Observable<String[]>|any;
  productoSubscription: Subscription|any;
  constructor(private serviceItemProducto: ServiceItemProducto, private serviceProducto: ServiceProducto, @Inject(MAT_DIALOG_DATA) private data: String, private matdialogRef: MatDialogRef<BuscarNombreComponent>){}
  ngOnDestroy(): void {
    if(this.productoSubscription!=undefined){
      this.productoSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    if(this.productoSubscription!=undefined){
      this.productoSubscription.unsubscribe();
    }
    this.serviceProducto.obtenerbyName();
    this.productoSubscription = this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  buscarNombre(){
    if(this.data=="ingresos"){
      this.serviceItemProducto.obtenerPorMayorIngresos("",this.myControl.value);
    }else if(this.data == "salidas"){
      this.serviceItemProducto.obtenerPorMayorSalidas("",this.myControl.value);
    }else if(this.data == "kardex"){
      this.serviceItemProducto.obtenerPorKardex("",this.myControl.value);
    }
    this.matdialogRef.close(this.myControl.value);
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
