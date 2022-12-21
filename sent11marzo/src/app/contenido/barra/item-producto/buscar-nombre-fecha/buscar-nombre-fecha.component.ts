import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceProducto } from 'src/app/services/producto.service';


@Component({
  selector: 'app-buscar-nombre-fecha',
  templateUrl: './buscar-nombre-fecha.component.html',
  styleUrls: ['./buscar-nombre-fecha.component.css']
})
export class BuscarNombreFechaComponent implements OnInit, OnDestroy{
  myControl = new FormControl();
  options: String[]=[];
  formG: FormGroup|any;
  //fechaBuscar: FormControl|any;
  obtenerValores: ProductoModel|any;
  filteredOptions: Observable<String[]>|any;
  subscriptionProductoNombre: Subscription|any;
  constructor(private serviceItemProducto: ServiceItemProducto, private serviceProducto: ServiceProducto, @Inject(MAT_DIALOG_DATA) private data: String, private formBuild: FormBuilder, private matDialogRef: MatDialogRef<BuscarNombreFechaComponent>){}
  ngOnInit(): void {
    //this.fechaBuscar = new FormControl('',Validators.required);
    this.formG = this.formBuild.group({
      fechaBuscar:['',[Validators.required]],
      myControl:['',[Validators.required]],

    })
    if(this.subscriptionProductoNombre!=undefined){
      this.subscriptionProductoNombre.unsubscribe();
    }
    this.serviceProducto.obtenerbyName();
    this.subscriptionProductoNombre = this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.formG.get("myControl").valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  ngOnDestroy(){
    if(this.subscriptionProductoNombre!=undefined){
      this.subscriptionProductoNombre.unsubscribe();
    }
  }
  private _filter(value: any): String[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  buscarNombreFecha(){
    console.log(this.formG.value.fechaBuscar)
    var ano = this.formG.value.fechaBuscar.getFullYear();
    var mes = this.formG.value.fechaBuscar.getMonth()+1;
    var dia = this.formG.value.fechaBuscar.getDate();
    mes= this.aumentar0(mes);
    dia = this.aumentar0(dia);
    var fecha = ano+"-"+mes+"-"+dia;
    if(this.data=="ingresos"){
      this.serviceItemProducto.obtenerPorMayorIngresos(fecha, this.formG.value.myControl);
    }else if(this.data=="salidas"){
      this.serviceItemProducto.obtenerPorMayorSalidas(fecha,this.formG.value.myControl);
    }else if(this.data == "kardex"){
      this.serviceItemProducto.obtenerPorKardex(fecha,this.formG.value.myControl);
    }
    var mandar = [fecha, this.formG.value.myControl];
    this.matDialogRef.close(mandar);
  }
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
