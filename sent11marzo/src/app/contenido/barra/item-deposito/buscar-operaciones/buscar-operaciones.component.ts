import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';

@Component({
  selector: 'app-buscar-operaciones',
  templateUrl: './buscar-operaciones.component.html',
  styleUrls: ['./buscar-operaciones.component.css']
})
export class BuscarOperacionesComponent implements OnInit {
  formG: FormGroup|any;
  operaciones:String[]|any;
  valorSelectOpe: string|any;
  constructor(private formB: FormBuilder, private serviceItemDeposito: ServiceItemDeposito, private matDialogRef: MatDialogRef<BuscarOperacionesComponent>) { }

  ngOnInit(): void {
    this.formG = this.formB.group({
      fechaBuscar:['',[Validators.required]],
      selectOpe:['',[Validators.required]]
    })
    this.operaciones= ["311:Compra","312:Importacion","314:Cambio","315:Devol proy","316:Devolución","317:Donacion","318:Traspaso"
    ,"319:Alta Aud","321:Venta","322:Prestamo","324:Cambio","325:Proyecto","326:Devolución","327:Donacion","328:Traspaso","329:Baja Aud"]
  }
  buscarOperacionFecha(){
    console.log(this.formG.value.fechaBuscar)
    var ano = this.formG.value.fechaBuscar.getFullYear();
    var mes = this.formG.value.fechaBuscar.getMonth()+1;
    var dia = this.formG.value.fechaBuscar.getDate();
    mes= this.aumentar0(mes);
    dia = this.aumentar0(dia);
    var fecha = ano+"-"+mes+"-"+dia;
    this.serviceItemDeposito.obtenerPorOperaciones(this.formG.value.fechaBuscar, this.valorSelectOpe);
    var mandar = [this.valorSelectOpe, fecha];
    this.matDialogRef.close(mandar);
  }
  operacionSeleccionada(operacion:string){
    var valor = parseInt(operacion);
    this.valorSelectOpe= valor.toString();
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
