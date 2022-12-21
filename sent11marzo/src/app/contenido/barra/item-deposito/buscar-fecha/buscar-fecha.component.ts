import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';
@Component({
  selector: 'app-buscar-fecha',
  templateUrl: './buscar-fecha.component.html',
  styleUrls: ['./buscar-fecha.component.css']
})
export class BuscarFechaComponent implements OnInit {

  filteredOptions: Observable<String[]>|any;
  options: String[]=[];
  formG: FormGroup|any;
  depositoSubscribe: Subscription|any;
  constructor(private serviceItemDeposito: ServiceItemDeposito, private dialog: MatDialogRef<BuscarFechaComponent>, @Inject(MAT_DIALOG_DATA) private data: String,private depositoService: ServiceDeposito, private formBuilder: FormBuilder){}
  ngOnInit(): void {
      if(this.depositoSubscribe!=undefined){
        this.depositoSubscribe.unsubscribe();
      }

      this.formG = this.formBuilder.group({
        myControl:['',[Validators.required]],
        fechaBuscar:['',[Validators.required]]
      })
      this.depositoService.obtenerNombresDepositos();
      this.depositoSubscribe=this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.options=datos;
      this.filteredOptions = this.formG.get("myControl").valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

  };
  ngOnDestroy(): void {
    if(this.depositoSubscribe!=undefined){
      this.depositoSubscribe.unsubscribe();
    }
  }
  buscarFecha(){
    var ano =this.formG.value.fechaBuscar.getFullYear();
    var mes = this.formG.value.fechaBuscar.getMonth()+1;
    var dia = this.formG.value.fechaBuscar.getDate();
    mes= this.aumentar0(mes);
    dia = this.aumentar0(dia);
    var fecha = ano+"-"+mes+"-"+dia;
    if(this.data=="periodo"){
     // this.serviceItemDeposito.obtenerPorPeriodo(fecha);
    }else if(this.data == "ingresos"){
      this.serviceItemDeposito.obtenerPorMayorIngresos(fecha,"", this.formG.value.myControl);
    }else if(this.data == "salidas"){
      this.serviceItemDeposito.obtenerPorMayorSalidas(fecha,"", this.formG.value.myControl);
    }else if(this.data=="kardex"){
      this.serviceItemDeposito.obtenerPorKardex(fecha,"", this.formG.value.myControl);
    }
    this.dialog.close(fecha);
  }
  buscarDia(){

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
  private _filter(value: String|any): String[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
