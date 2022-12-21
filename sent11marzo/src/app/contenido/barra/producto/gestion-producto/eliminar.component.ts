import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServiceProducto } from "src/app/services/producto.service";

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar.component.html',

})
export class EliminarComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private serviceProducto: ServiceProducto ){}
  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }
  eliminar(){
    console.log("jlas"+this.data.id);
    this.serviceProducto.eliminarProducto(this.data.id);
    this.dialog.closeAll();
  }
  salir(){
    this.dialog.closeAll();
  }
}
