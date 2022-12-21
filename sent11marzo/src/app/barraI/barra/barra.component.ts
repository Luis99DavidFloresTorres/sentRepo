import { Component, OnInit, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceUsuario } from 'src/app/services/UsuarioService.service';
import { AdministrarUsuarioComponent } from './administrar-usuario/administrar-usuario.component';
import { AdministrarRutas, AdministrarVectorRutas, clase, subClase } from '../../Models/AdministrarRutasBotonces.model';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ModelNivelUsuario } from 'src/app/Models/nivelUsuario.model';
//import { ServiceConfiguration } from 'src/app/services/configuracion.service';
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  subject= new Observable();
  subscribeUsuario: Subscription|any;
  subscriberLogin: Subscription|any;
  subscriberInsertar: Subscription|any;
  subscriberLimpiar: Subscription|any;
  claseCodificador:clase= {valor:false,clase:"CODIFICADORES",nombre:"clase"};
  claseAlmacenes:clase={valor:false, clase:"ALMACENES",nombre:"clase"};
  claseProyecto:clase={valor:false,clase:"PROYECTOS",nombre:"clase"};
  claseProducto:clase={valor:false, clase:"PRODUCTOS",nombre:"clase"};
  claseCliente:clase={valor:false, clase:"CLIENTES",nombre:"clase"};
  claseProveedor:clase={valor:false, clase:"PROVEEDORES",nombre:"clase"};
  claseMenu:clase={valor:false, clase:"menu",nombre:"clase"};
  claseVenta:clase={valor:false, clase:"VENTAS",nombre:"clase"};
  claseInforme:clase={valor:false, clase:"INFORMES",nombre:"clase"};
  logout=false;
  claseAdministracion:clase={valor:false, clase:"ADMINISTRACION",nombre:"clase"};
 //clases principales las de arriba
 //subclases las de abajo
 subClaseCodificadorPais:subClase={valor:false,clase:"Paises",nombre:"subclase"};
 subClaseCodificadorCiudad:subClase={valor:false,clase:"Ciudades",nombre:"subclase"};
 subClaseCodificadorUnidad:subClase={valor:false,clase:"Unidades",nombre:"subclase"};
 subClaseCodificadorTipoGasto:subClase={valor:false,clase:"Tipos de Gasto",nombre:"subclase"};
 subClaseCodificadorTipoCliente:subClase={valor:false,clase:"Tipos de Cliente",nombre:"subclase"};
 subClaseCodificadorRubro:subClase={valor:false,clase:"Rubros",nombre:"subclase"};
 subClaseCodificadorZona:subClase={valor:false,clase:"Zonas",nombre:"subclase"};
 subClaseCodificadorDeposito:subClase={valor:false,clase:"Deposito",nombre:"subclase"};
  subClaseusuarios:subClase={valor:false,clase:"Usuarios",nombre:"subclase"};
  subClaseConfiguracion:subClase={valor:false,clase:"Configuración",nombre:"subclase"};
  subClaseBaseDatos:subClase={valor:false,clase:"Base de Datos",nombre:"subclase"};
  subClaseReprocesos:subClase={valor:false,clase:"Reprocesos",nombre:"subclase"};
  subClaseDato:subClase={valor:false,clase:"subClaseDato",nombre:"subclase"};
  subClaseGestionOrdenesCliente:subClase={valor:false,clase:"Usuarios",nombre:"subclase"};
  subClaseRegistrarCotizacion:subClase={valor:false,clase:"COTIZACION CLIENTE",nombre:"subclase"};
  subClaseRegistrarNotaVenta:subClase={valor:false,clase:"EMITIR NOTA VENTA",nombre:"subclase"};
  subClaseCotizacionProyecto:subClase={valor:false,clase:"COTIZACION PROYECTO",nombre:"subclase"};
  subClaseGestionProyecto:subClase={valor:false,clase:"GESTION PROYECTO",nombre:"subclase"};
  subClaseAdjudicarProyecto:subClase={valor:false,clase:"ADJUDICAR PROYECTO",nombre:"subclase"};
  subClaseEstadoProyecto:subClase={valor:false,clase:"Estado de Proyectos",nombre:"subclase"};
  subClaseCobroProyecto:subClase={valor:false,clase:"COBRO PROYECTO",nombre:"subclase"};
  subClaseConsultas:subClase={valor:false,clase:"Consultas",nombre:"subclase"};
  subClaseSolicitudPresupuesto:subClase={valor:false,clase:"SOLICITAR PRESUPUESTO",nombre:"subclase"};
  subClaseDescargoGasto:subClase={valor:false,clase:"Descargo de Gastos",nombre:"subclase"};
  subClaseGestionHerramienta:subClase={valor:false,clase:"GESTION HERRAMIENTAS",nombre:"subclase"};
  subClaseAsignacionHerramienta:subClase={valor:false,clase:"ASIGNACION HERRAMIENTAS",nombre:"subclase"};
  subClaseDevolucionHerramienta:subClase={valor:false,clase:"DEVOLUCION HERRAMIENTAS",nombre:"subclase"};
  subClaseEntregaProductosProyecto:subClase={valor:false,clase:"Entregas Productos por Proyecto",nombre:"subclase"};
  subClaseEntregaProductoPorFecha:subClase={valor:false,clase:"Entregas Productos por Fecha",nombre:"subclase"};
  subClaseGestionProducto:subClase={valor:false,clase:"GESTION PRODUCTO",nombre:"subclase"};
  subClaseGestionSeriales:subClase={valor:false,clase:"Gestion de Seriales",nombre:"subclase"};
  subClaseItemProducto:subClase={valor:false,clase:"Item Producto",nombre:"subclase"};
  subClaseInventarioProducto:subClase={valor:false,clase:"Inventario de Productos",nombre:"subclase"};
  subClaseConsultaDeposito:subClase={valor:false,clase:"Consultas por deposito",nombre:"subclase"};
  subClaseProductoProyecto:subClase={valor:false,clase:"Productos por proyecto",nombre:"subclase"};
  subClaseGestionCliente:subClase={valor:false,clase:"GESTION CLIENTES",nombre:"subclase"};
  subClaseListaCliente:subClase={valor:false,clase:"Lista de Clientes",nombre:"subclase"};
  subClaseCotizacionCliente:subClase={valor:false,clase:"COTIZACION CLIENTE",nombre:"subclase"};
  subClaseVentaPorCliente:subClase={valor:false,clase:"Ventas por Cliente",nombre:"subclase"};
  subClaseEntregaProductosPorCliente:subClase={valor:false,clase:"Entrega Productos por cliente",nombre:"subclase"};
  subClaseRegistrarCotizacionProveedor:subClase={valor:false,clase:"COTIZACION PROVEEDOR",nombre:"subclase"};
  subClaseRegistrarOrdenCompra:subClase={valor:false,clase:"ORDEN DE COMPRA",nombre:"subclase"};
  subClaseRegistrarEntradaProducto:subClase={valor:false,clase:"INGRESO PRODUCTOS",nombre:"subclase"};
  subClaseRegistrarSalidaProductos:subClase={valor:false,clase:"SALIDA PRODUCTOS",nombre:"subclase"};
  subClaseRegistrarGarantia:subClase={valor:false,clase:"EMITIR GARANTIA",nombre:"subclase"};

  subClaseInformeVenta:subClase={valor:false,clase:"INFORME VENTAS",nombre:"subclase"};
  subClaseInformeCotizacionCliente:subClase={valor:false,clase:"INFORME COTIZAR CLIENTE",nombre:"subclase"};
  subClaseInformeAlmacen:subClase={valor:false,clase:"INFORME ALMACENES",nombre:"subclase"};
  subClaseInformeOrdenes:subClase={valor:false,clase:"INF ORDENES COTIZ",nombre:"subclase"};
  subClaseInformeProyecto:subClase={valor:false,clase:"INFORME PROYECTOS",nombre:"subclase"};
  subClaseInformeHerramienta:subClase={valor:false,clase:"INF HERRAMIENTAS",nombre:"subclase"};


  subClaseGestionProveedor:subClase={valor:false,clase:"Gestion Proveedor",nombre:"subclase"}
  subClaseListaProveedor:subClase = {valor:false,clase:"Lista de Proveedores",nombre:"subclase"}
  subClaseMayorCompras:subClase={valor:false,clase:"Mayor de Compras",nombre:"subclase"}
  subClaseMayorOrdenCompras:subClase={valor:false,clase:"Mayor Orden Compras",nombre:"subclase"}
  subClaseMayorCotizaciones:subClase={valor:false,clase:"Mayor Cotizaciones",nombre:"subclase"}
  subClaseMayorProductosCompra:subClase={valor:false,clase:"",nombre:"subclase"}
  subClaseMayorProductosOrdenCompra:subClase={valor:false,clase:"Mayor Productos Orden Compra",nombre:"subclase"}
  subClaseMayorProductosCotizacion:subClase={valor:false,clase:"Mayor Productos Cotizacion",nombre:"subclase"}
  //abajo union de clases y subclases
  subClaseCodificadorvector:subClase[]=[this.subClaseCodificadorPais,this.subClaseCodificadorCiudad,this.subClaseCodificadorDeposito,
    this.subClaseCodificadorRubro,this.subClaseCodificadorTipoCliente,this.subClaseCodificadorZona,this.subClaseCodificadorUnidad, this.subClaseCodificadorTipoGasto]
  codificadorRutas: AdministrarRutas={clase:this.claseCodificador,subClases:this.subClaseCodificadorvector};

  subclasesProyectovector:subClase[]=[this.subClaseCotizacionProyecto,this.subClaseGestionProyecto,this.subClaseAdjudicarProyecto,this.subClaseEstadoProyecto, this.subClaseCobroProyecto, this.subClaseConsultas, this.subClaseGestionHerramienta, this.subClaseAsignacionHerramienta, this.subClaseDevolucionHerramienta, this.subClaseSolicitudPresupuesto, this.subClaseEntregaProductoPorFecha, this.subClaseEntregaProductosProyecto, this.subClaseDescargoGasto]
  proyectoRutas: AdministrarRutas={clase:this.claseProyecto,subClases:this.subclasesProyectovector};

  subclasesProductovector:subClase[]=[this.subClaseGestionProducto,this.subClaseGestionSeriales,this.subClaseItemProducto,this.subClaseInventarioProducto,this.subClaseConsultaDeposito,this.subClaseProductoProyecto];
  productoRutas: AdministrarRutas={clase:this.claseProducto, subClases:this.subclasesProductovector};

  subclasesClientevector:subClase[]=[this.subClaseGestionCliente,this.subClaseListaCliente,this.subClaseCotizacionCliente,this.subClaseVentaPorCliente,this.subClaseEntregaProductosPorCliente]
  clienteRutas: AdministrarRutas={clase:this.claseCliente, subClases: this.subclasesClientevector};

  subclasesProveedorvector:subClase[]=[this.subClaseGestionProveedor,this.subClaseListaProveedor,this.subClaseMayorCompras,this.subClaseMayorOrdenCompras, this.subClaseMayorCotizaciones, this.subClaseMayorProductosCompra, this.subClaseMayorProductosOrdenCompra, this.subClaseMayorProductosCotizacion]
  proveedorRutas: AdministrarRutas={clase:this.claseProveedor, subClases: this.subclasesProveedorvector};

  subclasesAdministracionvector=[this.subClaseusuarios,this.subClaseConfiguracion,this.subClaseBaseDatos,this.subClaseReprocesos, this.subClaseDato]
  administracionRutas: AdministrarRutas={clase:this.claseAdministracion, subClases: this.subclasesAdministracionvector};

  subclasesVentavector:subClase[]=[this.subClaseGestionOrdenesCliente, this.subClaseRegistrarCotizacion, this.subClaseRegistrarNotaVenta];
  ventaRutas: AdministrarRutas={clase:this.claseVenta, subClases: this.subclasesVentavector};

  subclasesAlmacenesvector :subClase[]=[this.subClaseRegistrarSalidaProductos,this.subClaseRegistrarEntradaProducto,this.subClaseRegistrarGarantia,this.subClaseRegistrarOrdenCompra,this.subClaseRegistrarCotizacionProveedor, this.subClaseInformeProyecto, this.subClaseInformeHerramienta];
  almacenesRutas:AdministrarRutas = {clase:this.claseAlmacenes, subClases:this.subclasesAlmacenesvector};


  subclasesInformesvector:subClase[] = [this.subClaseInformeVenta, this.subClaseInformeCotizacionCliente, this.subClaseInformeAlmacen, this.subClaseInformeAlmacen, this.subClaseInformeOrdenes, ];
  informeRutas: AdministrarRutas={clase:this.claseInforme,subClases:this.subclasesInformesvector}
  vector:AdministrarRutas[]=[this.proyectoRutas, this.productoRutas, this.clienteRutas, this.ventaRutas, this.administracionRutas, this.almacenesRutas, this.codificadorRutas, this.informeRutas, this.proveedorRutas];
  conjuntodeRutas:AdministrarVectorRutas=new AdministrarVectorRutas(this.vector);
  @Output() barraMenu = new EventEmitter<void>();
  sesionAbierta:ModelNivelUsuario|any;
  constructor(private serviceLogin:ServiceUsuario, private matDialog: MatDialog, private serviceUsuario: ServiceUsuario, private route: Router) { }
  ngOnDestroy(): void {
 /* if(localStorage.length!=0){
    localStorage.removeItem('verificarGestionProducto');
  }*/
    if(this.subscribeUsuario!=undefined) {
      this.subscribeUsuario.unsubscribe();
    }
    if(this.subscriberLogin!=undefined){
      this.subscriberLogin.unsubscribe();
    }
    if(this.subscriberInsertar!=undefined){
      this.subscriberInsertar.unsubscribe();
    }
    if(this.subscriberLimpiar!=undefined){
      this.subscriberLimpiar.unsubscribe();
    }
  }

  ngOnInit(): void {
    if(this.subscriberLogin!=undefined){
      this.subscriberLogin.unsubscribe();
    }
    if(localStorage.getItem('verificarGestionProducto')!=null){
      //console.log(localStorage.getItem('verificarGestionProducto'));
      var buscar:string[] = JSON.parse( localStorage.getItem('verificarGestionProducto')||'{}');
      buscar.forEach(datos=>{
        if(datos=="ADMIN"){
          this.conjuntodeRutas.ifAdmin(datos);
        }
      })
      this.vector =this.conjuntodeRutas.stringtoModelNivel(buscar);
      this.logout=true;
    }
      this.subscriberLogin = this.serviceLogin.listenerRespuestaLogin().subscribe(datos=>{
        if(this.subscribeUsuario!=undefined) {
          this.subscribeUsuario.unsubscribe();
        }
        if(this.conjuntodeRutas.getNombreRutas()){
          this.logout=true;
        }
        if(datos.respuesta=="ADMIN"){
          this.conjuntodeRutas.ifAdmin(datos.respuesta);

          localStorage.setItem('verificarGestionProducto',JSON.stringify(this.conjuntodeRutas.getNombreRutas()));

        }else if(datos.respuesta=="vacio"){
          alert("no tiene ningun nivel");
        }else if(datos.respuesta=="incorrecto"){
          alert("contraseña incorrecto")
        }else if(datos.respuesta=="correcto"){

          this.subscribeUsuario=this.serviceUsuario.listenerNivelUsuario().subscribe(datos=>{

            this.conjuntodeRutas.vectorStringNivelUsuario(datos);
            this.conjuntodeRutas.cambiarValores(datos);
           // console.log("al ingresar"+JSON.stringify(this.conjuntodeRutas.getNombreRutas()))
            localStorage.setItem('verificarGestionProducto',JSON.stringify(this.conjuntodeRutas.getNombreRutas()));
            localStorage.setItem('nivelesDerechos',JSON.stringify(this.conjuntodeRutas.nivelesDerechoIndexVector));

            this.logout=true;
          });
        }
      })

      /*this.codificadores = [
      {valor: 'paises', verValor: 'Steak'},
      {valor: 'ciudades', verValor: 'Pizza'},
      {valor: 'zonas', verValor: 'Tacos'},
      {valor: 'unidades', verValor: 'Steak'},
      {valor: 'rubros', verValor: 'Pizza'},
      {valor: 'tipos de cliente', verValor: 'Tacos'},
      {value: 'tipos de gasto', verValor: 'Steak'},
      {value: 'depositos', verValor: 'Pizza'}
    ];*/
  }
  desplegar(){
    this.barraMenu.emit();
  }
  clasesAtrue(nombre: String){

  }
  gestionarFunciones(){
    this.matDialog.open(AdministrarUsuarioComponent,{width:'700px',height:'700px',data:this.conjuntodeRutas});
  }
  gestionarClientes(){
    this.matDialog.open(GestionUsuarioComponent,{width:'700px',height:'700px',data:this.conjuntodeRutas});
  }
  salirSesion(){
    this.conjuntodeRutas.allFalse();
    this.logout=false;
    localStorage.removeItem("verificarGestionProducto");
    this.route.navigate(['/']);
  }
  /*gestionarLimpiezaCodigo(){
    this.serviceConfiguration.limpiarCodigos();
    this.subscriberLimpiar = this.serviceConfiguration.listenerLimpiar().subscribe((datos)=>{
      alert("Correcto")
    });
  }
  gestionarDatoCodigo(){
    this.serviceConfiguration.insertarCodigos();
    this.subscriberInsertar=this.serviceConfiguration.listenerInsertar().subscribe((datos)=>{
      alert("Correcto")
    });
  }*/
  /*@HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event:any) {
    localStorage.clear();
}*/
}
