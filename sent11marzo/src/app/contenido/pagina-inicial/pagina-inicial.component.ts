import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceProducto } from 'src/app/services/producto.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  productos:ProductoModel[]=[]
  suscripcionProducto:Subscription|any;
  constructor(private serviceProducto: ServiceProducto) {
    if(this.suscripcionProducto!=undefined){
        this.suscripcionProducto.unsubscribe();
    }
   }

  ngOnInit(): void {
    if(this.suscripcionProducto!=undefined){
        this.suscripcionProducto.unsubscribe();
    }
    this.serviceProducto.clienteShow();
    this.suscripcionProducto=this.serviceProducto.listenerClienteShow().subscribe(datos=>{
      this.productos = datos;
    })
  }

}
