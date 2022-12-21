import { Component, OnInit } from '@angular/core';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';

@Component({
  selector: 'app-imprimir-proyecto',
  templateUrl: './imprimir-proyecto.component.html',
  styleUrls: ['./imprimir-proyecto.component.css']
})
export class ImprimirProyectoComponent implements OnInit {
  productoActivado= false;
  producto:ModelItemProyecto[]=[]
  detalleProductoActivado=false;
  detalleProyectoActivado = false;
  nombreCliente:string|String = ""
  constructor(private serviceItemProyecto:ServiceItemProyecto) { }

  ngOnInit(): void {
    this.serviceItemProyecto.obtenerByProyecto(417);
    this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
      this.producto = datos;
     this.nombreCliente = datos[0].proyecto.cliente.nombre;
    })
  }
  productoActivar(){
    this.productoActivado=true;
  }
  productoOcultar(){
    this.productoActivado = false;
  }
  detalleProductoActivar(){
    this.detalleProductoActivado=true;
  }
  detalleProductoOcultar(){
    this.detalleProductoActivado= false;
  }
  detalleActivar(){
    this.detalleProyectoActivado = true;
  }
  detalleOcultar(){
    this.detalleProyectoActivado=false;
  }
}
