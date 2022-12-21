import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { ServiceProducto } from 'src/app/services/producto.service';

@Component({
  selector: 'app-buscar-nombre-deposito',
  templateUrl: './buscar-nombre-deposito.component.html',
  styleUrls: ['./buscar-nombre-deposito.component.css']
})
export class BuscarNombreDepositoComponent implements OnInit, OnDestroy {

  formG: FormGroup|any;
  options: String[]=[];
  depositos :String[]=[];
  filteredOptions: Observable<String[]>|any;
  depositoElegido:String="";
  depositoNombreSubscription:Subscription|any;
  productoNombreSubscription:Subscription|any;

  constructor(private serviceItemDeposito: ServiceItemDeposito, private serviceProducto: ServiceProducto, @Inject(MAT_DIALOG_DATA) private data: String, private matdialogRef: MatDialogRef<BuscarNombreDepositoComponent>, private formBuilder: FormBuilder, private depositoService: ServiceDeposito){}
  ngOnDestroy(): void {
    if(this.depositoNombreSubscription!=undefined){
      this.depositoNombreSubscription.unsubscribe();
    }
    if(this.productoNombreSubscription!=undefined){
      this.productoNombreSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.formG = this.formBuilder.group({
      myControl: ['',[Validators.required]],
      deposito:['',[Validators.required]]
    })
    this.serviceProducto.obtenerbyName();
    this.depositoService.obtenerNombresDepositos();
    this.depositoNombreSubscription = this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.depositos=datos;
    });
    this.productoNombreSubscription = this.serviceProducto.listenerDatosProductoNombre().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions =  this.formG.get("myControl").valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

  }
  buscarNombre(){
    if(this.data=="ingresos"){
      this.serviceItemDeposito.obtenerPorMayorIngresos("", this.formG.value.myControl, this.depositoElegido);
    }else if(this.data == "salidas"){
      this.serviceItemDeposito.obtenerPorMayorSalidas("", this.formG.value.myControl,this.depositoElegido);
    }else if(this.data == "kardex"){
      this.serviceItemDeposito.obtenerPorKardex("", this.formG.value.myControl, this.depositoElegido);
    }
    this.matdialogRef.close( this.formG.value.myControl);
  }
  private _filter(value: String|any): String[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  depositoSeleccionado(nombreDeposito:string){
      this.depositoElegido = nombreDeposito;
  }
}
