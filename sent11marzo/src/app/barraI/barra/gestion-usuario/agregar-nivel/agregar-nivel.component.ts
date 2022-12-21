import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MandarUsuarioAgregarNivelUsuario, ModelNivelUsuario } from 'src/app/Models/nivelUsuario.model';
import { ServiceNivelUsuario } from 'src/app/services/NivelUsuarioService.service';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';

@Component({
  selector: 'app-agregar-nivel',
  templateUrl: './agregar-nivel.component.html',
  styleUrls: ['./agregar-nivel.component.css']
})
export class AgregarNivelComponent implements OnInit {
  filteredOptions: Observable<String[]>|any;
  options: String[]=[];
  myControl: FormControl|any;
  id:Number|any;
  constructor(private serviceNivelUsuario: ServiceNivelUsuario, private serviceUsuario: ServiceUsuario, @Inject(MAT_DIALOG_DATA) private datos: any, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.myControl = new FormControl('',[Validators.required]);
    this.id = this.datos;
    this.serviceNivelUsuario.buscarNivelesUsuarios();
    this.serviceNivelUsuario.listenerNivelesUsuario().subscribe((datos:ModelNivelUsuario[]|any)=>{
      console.log(datos);
      datos.forEach((element:ModelNivelUsuario|any) => {
        this.options.push(element['nombre'])
      });;
      console.log(this.options);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })

  }
  private _filter(value: any): String[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  guardar(){
    console.log("mandar");
    console.log(this.id);
    console.log(this.myControl.value)
    var mandar: MandarUsuarioAgregarNivelUsuario = {id:this.id,nombre:this.myControl.value}
    this.serviceUsuario.agregarNivelUsuarioAUsuario(mandar);
    this.matDialog.closeAll();
  }
}
