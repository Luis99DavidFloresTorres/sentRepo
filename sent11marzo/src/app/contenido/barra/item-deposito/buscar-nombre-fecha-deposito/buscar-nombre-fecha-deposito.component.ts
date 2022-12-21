import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';
import { ServiceProducto } from 'src/app/services/producto.service';


@Component({
  selector: 'app-buscar-nombre-fecha-deposito',
  templateUrl: './buscar-nombre-fecha-deposito.component.html',
  styleUrls: ['./buscar-nombre-fecha-deposito.component.css']
})
export class BuscarNombreFechaDepositoComponent implements OnInit, OnDestroy{
  myControl = new FormControl();
  options: String[]=[];
  formG: FormGroup|any;
  obtenerValores: ProductoModel|any;
  depositos:String[]=[];
  filteredOptions: Observable<String[]>|any;
  depositoElegido:String="";
  depositoSubscription:Subscription|any;
  productoSubscription:Subscription|any;
  constructor(private serviceItemDeposito: ServiceItemDeposito, private serviceProducto: ServiceProducto, @Inject(MAT_DIALOG_DATA) private data: String, private formBuild: FormBuilder, private matDialogRef: MatDialogRef<BuscarNombreFechaDepositoComponent>, private depositoService: ServiceDeposito){}
  ngOnDestroy(): void {
    if(this.depositoSubscription!=undefined){
        this.depositoSubscription.unsubscribe();
    }
    if(this.productoSubscription!=undefined){
      this.productoSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formG = this.formBuild.group({
      fechaBuscar:['',[Validators.required]],
      myControl:['',[Validators.required]],
      deposito:['',[Validators.required]]
    })
    this.depositoService.obtenerNombresDepositos();
    this.depositoSubscription = this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.depositos=datos;
    });
    this.serviceProducto.obtenerbyName();
    this.productoSubscription = this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.formG.get("myControl").valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
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
      this.serviceItemDeposito.obtenerPorMayorIngresos(fecha, this.formG.value.myControl,this.depositoElegido);
    }else if(this.data=="salidas"){
      this.serviceItemDeposito.obtenerPorMayorSalidas(fecha,this.formG.value.myControl,this.depositoElegido);
    }else if(this.data == "kardex"){
      this.serviceItemDeposito.obtenerPorKardex(fecha,this.formG.value.myControl,this.depositoElegido);
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
  depositoSeleccionado(deposito:String){
      this.depositoElegido =deposito;
  }
}
