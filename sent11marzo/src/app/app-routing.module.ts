import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraComponent } from './barraI/barra/barra.component';
import { EntradaProductoComponent } from './contenido/barra/almacen/entrada-producto/entrada-producto.component';
import { ItemSalidaComponent } from './contenido/barra/almacen/salida-producto/item-salida/item-salida.component';
import { SalidaProductoComponent } from './contenido/barra/almacen/salida-producto/salida-producto.component';
import { CotizacionesporClienteComponent } from './contenido/barra/cliente/cotizacionespor-cliente/cotizacionespor-cliente.component';
import { EntregaProductoporClienteComponent } from './contenido/barra/cliente/entrega-productopor-cliente/entrega-productopor-cliente.component';
import { FormularioGestionclienteComponent } from './contenido/barra/cliente/gestion-cliente/formulario-gestioncliente/formulario-gestioncliente.component';
import { VentasporClienteComponent } from './contenido/barra/cliente/ventaspor-cliente/ventaspor-cliente.component';
import { CiudadesComponent } from './contenido/barra/codificador/ciudades/ciudades.component';
import { DepositosComponent } from './contenido/barra/codificador/depositos/depositos.component';
import { PaisesComponent } from './contenido/barra/codificador/paises/paises.component';
import { RubrosComponent } from './contenido/barra/codificador/rubros/rubros.component';
import { TiposClienteComponent } from './contenido/barra/codificador/tipos-cliente/tipos-cliente.component';
import { TiposGastoComponent } from './contenido/barra/codificador/tipos-gasto/tipos-gasto.component';
import { UnidadesComponent } from './contenido/barra/codificador/unidades/unidades.component';
import { ZonasComponent } from './contenido/barra/codificador/zonas/zonas.component';
import { ArbolProyectosComponent } from './contenido/barra/cotizacion-cliente/arbol-proyectos/arbol-proyectos.component';
import { CotizacionClienteComponent } from './contenido/barra/cotizacion-cliente/cotizacion-cliente.component';
import { ImprimirProyectoComponent } from './contenido/barra/cotizacion-cliente/imprimir-proyecto/imprimir-proyecto.component';
import { ItemDepositoComponent } from './contenido/barra/item-deposito/item-deposito.component';
import { ItemProductoComponent } from './contenido/barra/item-producto/item-producto.component';
import { ItemProyectoComponent } from './contenido/barra/item-proyecto/item-proyecto.component';
import { EntreFechasComponent } from './contenido/barra/item-proyecto/entre-fechas/entre-fechas.component';
import { FechasproductoNotaventaComponent } from './contenido/barra/notaventa/fechasproducto-notaventa/fechasproducto-notaventa.component';
import { NotaventaComponent } from './contenido/barra/notaventa/notaventa.component';
import { OrdencompraComponent } from './contenido/barra/ordencompra/ordencompra.component';
import { GestionProductoComponent } from './contenido/barra/producto/gestion-producto/gestion-producto.component';
import { GestionProveedorComponent } from './contenido/barra/proveedores/gestion-proveedor/gestion-proveedor.component';
import { MayorcotizacionesProvComponent } from './contenido/barra/proveedores/mayorcotizaciones-prov/mayorcotizaciones-prov.component';
import { MayordeComprasComponent } from './contenido/barra/proveedores/mayorde-compras/mayorde-compras.component';
import { MayordeProductosCompraProvComponent } from './contenido/barra/proveedores/mayorde-productos-compra-prov/mayorde-productos-compra-prov.component';
import { MayorordenesCompraComponent } from './contenido/barra/proveedores/mayorordenes-compra/mayorordenes-compra.component';
import { ProductoOrdenCompraProvComponent } from './contenido/barra/proveedores/producto-orden-compra-prov/producto-orden-compra-prov.component';
import { ProductosCotizacionProvComponent } from './contenido/barra/proveedores/productos-cotizacion-prov/productos-cotizacion-prov.component';
import { AdjudicarProyectoComponent } from './contenido/barra/proyecto/adjudicar-proyecto/adjudicar-proyecto.component';
import { EntregaProductoProyectoComponent } from './contenido/barra/proyecto/entrega-producto-proyecto/entrega-producto-proyecto.component';
import { EstadoProyectosComponent } from './contenido/barra/proyecto/estado-proyectos/estado-proyectos.component';
import { GestionHerramientasProyectoComponent } from './contenido/barra/proyecto/gestion-herramientas-proyecto/gestion-herramientas-proyecto.component';
import { LoginComponent } from './contenido/login/login.component';
import { PaginaInicialComponent } from './contenido/pagina-inicial/pagina-inicial.component';
import { SeguridadEntradaProductoGuard } from './seguridad/seguridadEntradaProducto/seguridad-entrada-producto.guard';
import { SeguridadGuard } from './seguridad/seguridadGestionProducto/seguridad.guard';
import { SeguridadItemDepositoGuard } from './seguridad/seguridadItemDeposito/seguridad-item-deposito.guard';
import { SeguridadItemProductoGuard } from './seguridad/seguridadItemProducto/seguridad-item-producto.guard';
import { NotaventaGuardGuard } from './seguridad/seguridadNotaVenta/notaventa-guard.guard';
import { SeguridadProyectoCotzGuard } from './seguridad/seguridadProyecto/seguridad-proyecto-cotz.guard';
import { SalidaProductoGuard } from './seguridad/seguridadSalidaProducto/salida-producto.guard';
import { SeguimientporUsuarioComponent } from './contenido/barra/proyecto/seguimientpor-usuario/seguimientpor-usuario.component';
import { CobroProyectoComponent } from './contenido/barra/proyecto/cobro-proyecto/cobro-proyecto.component';
import { DevolucionHerramientaComponent } from './contenido/barra/proyecto/devolucion-herramienta/devolucion-herramienta.component';
import { GestionProyectoComponent } from './contenido/barra/proyecto/gestion-proyecto/gestion-proyecto.component';
import { AsignacionHerramientaComponent } from './contenido/barra/proyecto/asignacion-herramienta/asignacion-herramienta.component';
import { MayordeOrdencompras2Component } from './contenido/barra/proveedores/mayorde-ordencompras2/mayorde-ordencompras2.component';
import { SolicitudPresupuestoProyectoComponent } from './contenido/barra/proyecto/solicitud-presupuesto-proyecto/solicitud-presupuesto-proyecto.component';
import { DescargogastosComponent } from './contenido/barra/proyecto/descargogastos/descargogastos.component';
import { InformeVentasComponent } from './contenido/barra/informe/informedeventas/informe-ventas/informe-ventas.component';
import { InformeVentasPorvendedorComponent } from './contenido/barra/informe/informedeventas/informe-ventas-porvendedor/informe-ventas-porvendedor.component';
import { InformeComisionesPorventaComponent } from './contenido/barra/informe/informedeventas/informe-comisiones-porventa/informe-comisiones-porventa.component';
import { InformeVentasDeproductosComponent } from './contenido/barra/informe/informedeventas/informe-ventas-deproductos/informe-ventas-deproductos.component';
import { EntradasSalidasProductoComponent } from './contenido/barra/informe/informe-de-almacenes/entradas-salidas-producto/entradas-salidas-producto.component';
import { EntradaProductovaloradoComponent } from './contenido/barra/informe/informe-de-almacenes/entrada-productovalorado/entrada-productovalorado.component';
import { SalidaProductovaloradoComponent } from './contenido/barra/informe/informe-de-almacenes/salida-productovalorado/salida-productovalorado.component';
import { UtilidadSalidadeproductosComponent } from './contenido/barra/informe/informe-de-almacenes/utilidad-salidadeproductos/utilidad-salidadeproductos.component';
import { InformeOrdenesCompraComponent } from './contenido/barra/informe/ordenes-cotizacionoes-proveedor/informe-ordenes-compra/informe-ordenes-compra.component';
import { InformeProyectoCotizacionesProductoComponent } from './contenido/barra/informe/informe-proyectos/informe-proyecto-cotizaciones-producto/informe-proyecto-cotizaciones-producto.component';
import { InformeSolicitudPresupuestoComponent } from './contenido/barra/informe/informe-proyectos/informe-solicitud-presupuesto/informe-solicitud-presupuesto.component';
import { InformeSolicitudPresupuestoResponsableComponent } from './contenido/barra/informe/informe-proyectos/informe-solicitud-presupuesto-responsable/informe-solicitud-presupuesto-responsable.component';
import { InformeSolicitudDescargoResponsableComponent } from './contenido/barra/informe/informe-proyectos/informe-solicitud-descargo-responsable/informe-solicitud-descargo-responsable.component';
import { ResultadoPresumibleProyectoComponent } from './contenido/barra/proyecto/resultado-presumible-proyecto/resultado-presumible-proyecto.component';
import { EntregaProductoPorFechaComponent } from './contenido/barra/proyecto/entrega-producto-por-fecha/entrega-producto-por-fecha.component';


const routes: Routes = [
  { path:'codificador/paises', component: PaisesComponent},
  { path:'codificador/ciudades', component: CiudadesComponent},
  { path:'codificador/zonas', component: ZonasComponent},
  { path:'codificador/unidades', component: UnidadesComponent},
  { path:'codificador/rubros', component: RubrosComponent},
  { path:'codificador/tipoClientes', component: TiposClienteComponent},
  { path:'codificador/tipoGastos', component: TiposGastoComponent},
  { path:'codificador/depositos', component: DepositosComponent},
  { path:'Gestion Productos', component: GestionProductoComponent, canActivate:[SeguridadGuard]},
  { path:'Gestion Cliente', component: FormularioGestionclienteComponent},
  { path:'Gestion Proveedor', component: GestionProveedorComponent},
  { path:'itemProducto', component: ItemProductoComponent, canActivate:[SeguridadItemProductoGuard]},
  { path:'itemProyecto', component: ItemProyectoComponent},
  { path:'itemDeposito', component: ItemDepositoComponent, canActivate:[SeguridadItemDepositoGuard]},
  { path:'salidaProducto', component: SalidaProductoComponent, canActivate:[SalidaProductoGuard]},
  { path:'entradaProducto', component: EntradaProductoComponent, canActivate:[SeguridadEntradaProductoGuard]},
  { path:'ordencompra', component: OrdencompraComponent, canActivate:[SalidaProductoGuard]},
  { path:'notaventa', component: NotaventaComponent, canActivate:[NotaventaGuardGuard]},
  { path:'cotizacionProyecto', component: CotizacionClienteComponent, canActivate:[SeguridadProyectoCotzGuard]},
  { path:'', component: LoginComponent},
  { path:'cotizacionesVenta', component: CotizacionesporClienteComponent},
  { path:'inicial', component: PaginaInicialComponent},
  { path:'mayordecompras', component: MayordeComprasComponent},
  { path:'mayorordencompras', component: MayorordenesCompraComponent},//pruebaaaaaaaaaaaaaaaaaaaa      MayorordenesCompraComponent
  { path:'mayorcotizaciones', component: MayorcotizacionesProvComponent},
  { path:'productoOrdenCompra', component: ProductoOrdenCompraProvComponent},
  { path:'mayorproductosCompra', component:MayordeProductosCompraProvComponent},
  { path:'productoCotizacion', component:ProductosCotizacionProvComponent},
  { path:'entregaProductosPorCliente', component:EntregaProductoporClienteComponent},
  { path:'ventasPorCliente', component:VentasporClienteComponent},
  { path:'adjudicarProyecto', component:AdjudicarProyectoComponent},
  { path:'seguimientoUsuario', component:SeguimientporUsuarioComponent},
  { path:'entregaProductoProyecto', component:EntregaProductoProyectoComponent},
  { path:'gestionHerramienta', component:GestionHerramientasProyectoComponent},
  { path:'notaventaFechas', component:FechasproductoNotaventaComponent},
  { path:'cotizacionFechas',component:EntreFechasComponent},
  { path:'estadoProyecto', component:EstadoProyectosComponent},
  { path:'cobroProyecto', component:CobroProyectoComponent},
  { path:'devolucionHerramienta',component:DevolucionHerramientaComponent},
  { path:'gestionProyecto',component:GestionProyectoComponent},
  { path:'asignacionHerramienta',component:AsignacionHerramientaComponent},
  { path:'solicitudPresupuesto', component:SolicitudPresupuestoProyectoComponent},
  { path:'informeVentas', component:InformeVentasComponent},
  { path:'descargoGastos', component:DescargogastosComponent},
  { path:'prueba', component: ImprimirProyectoComponent},
  { path:'ventasporvendedor', component:InformeVentasPorvendedorComponent},
  { path:'comisionesporventas', component:InformeComisionesPorventaComponent},
  { path:'ventasdeproductos', component:InformeVentasDeproductosComponent},
  { path:'informeEntradaSalidasProductos', component:EntradasSalidasProductoComponent},
  { path:'informeEntradaProductos', component:EntradaProductovaloradoComponent},
  { path:'informeSalidasProductos', component:SalidaProductovaloradoComponent},
  { path:'utilidadSalidaProductos', component: UtilidadSalidadeproductosComponent},
  { path:'informeOrdenesCompra', component: InformeOrdenesCompraComponent},
  { path:'proyectoCotizaciones' , component: InformeProyectoCotizacionesProductoComponent},
  { path:'informeSolicitudPresupuesto', component: InformeSolicitudPresupuestoComponent},
  { path:'informeSolicitudPresupuestoPorResponsable', component: InformeSolicitudPresupuestoResponsableComponent},
  { path:'informeSolicitudPresupuestoDescargoResponsable', component: InformeSolicitudDescargoResponsableComponent},
  { path:'resultadoPresumible', component: ResultadoPresumibleProyectoComponent},
  { path:'entregaPorProductoPorFecha', component: EntregaProductoPorFechaComponent},
  { path:'prueba2', component: ArbolProyectosComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
