import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ProyectoProductosHijos } from 'src/app/Models/ProyectoProductosHijos.model';
import { ServiceRecuperarDocumentosObservables } from 'src/app/services/observables/RecuperarDocumentosObservables.service';
import { ServiceProducto } from 'src/app/services/producto.service';
import { ItemProyectoModel } from '../../item-proyecto/itemProyecto.model';
import { NotaCotizacionRecuperarComponent } from '../../RecuperarDocumentos/nota-cotizacion-recuperar/nota-cotizacion-recuperar.component';
import { NotaOrdenCompraComponent } from '../../RecuperarDocumentos/nota-orden-compra/nota-orden-compra.component';
import { NotaVentaRecuperarComponent } from '../../RecuperarDocumentos/nota-venta-recuperar/nota-venta-recuperar.component';

@Component({
  selector: 'app-items-cotizcliente',
  templateUrl: './items-cotizcliente.component.html',
  styleUrls: ['./items-cotizcliente.component.css'],
})
export class ItemsCotizclienteComponent implements OnInit {
  myControl = new FormControl();
  costoTotal = new FormControl({
    value: '',
    disabled: true,
  });
  precio = new FormControl({
    value: '',
    disabled: true,
  });
  padreInputValor = new FormControl('');
  padreInputProductoValor = new FormControl('');
  padreInput = false;
  padreInputProducto = false;
  options: String[] = [];
  obtenerValores: ProductoModel | any;
  subscriber: Subscription | any;
  suscribeRecuperarDocumentoNotaVenta: Subscription | any;
  suscribeRecuperarDocumentoProyecto: Subscription | any;
  suscribeRecuperarDocumentoOrdenCompra: Subscription | any;
  suscribeProductosRecuperados: Subscription | any;
  itemSubproducto: ModelItemProyecto | any;
  filteredOptions: Observable<String[]> | any;
  tablaDatos: ModelItemProyecto[] | any = [];
  @ViewChild(MatPaginator) pag: MatPaginator | any;
  valorColor: String = '';
  cantidad = 1;
  displayedColumns = [
    'producto.codigo',
    'producto.nombre',
    'detalle',
    'producto.tipo',
    'cantidad',
    'producto.precio',
    'producto.descto',
    'monto',
    'eliminar',

  ];
  dataSource = new MatTableDataSource<ModelItemProyecto>();
  serial = '';
  nuevo: boolean | any;
  cancelar: boolean = false;
  @Output() mandarProductos = new EventEmitter<ModelItemProyecto[]>();
  @Input() boton: any;
  @Input() recuperar: any = false;
  @Output() canastaVacia = new EventEmitter<void>();
  constructor(
    private serviceProducto: ServiceProducto,
    private matDialog: MatDialog,
    private serviceRecuperarDocumentos: ServiceRecuperarDocumentosObservables,

  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.boton);
    if (changes.boton != undefined) {
      if (!changes.boton.isFirstChange()) {
        this.nuevo = changes.boton.previousValue['nuevo'];
        this.cancelar = !changes.boton.previousValue['cancelar'];
        if (this.cancelar) {
          this.dataSource.data = [];
          this.tablaDatos = [];
        }
      }
    }
    if (changes.recuperar != undefined) {
      if (changes.recuperar.currentValue == true) {
        if (this.tablaDatos.length > 0) {
          this.emitir();
          this.recuperar = false;
        } else {
          alert('Ingrese productos, no se guardaron los cambios');
          this.canastaVacia.emit();
        }
      }
    }
  }
  ngOnDestroy(): void {
    if (this.subscriber != undefined) {
      this.subscriber.unsubscribe();
    }
    if (this.suscribeRecuperarDocumentoNotaVenta != undefined) {
      this.suscribeRecuperarDocumentoNotaVenta.unsubscribe();
    }
    if (this.suscribeRecuperarDocumentoProyecto != undefined) {
      this.suscribeRecuperarDocumentoProyecto.unsubscribe();
    }
    if (this.suscribeRecuperarDocumentoOrdenCompra != undefined) {
      this.suscribeRecuperarDocumentoOrdenCompra.unsubscribe();
    }
    if (this.suscribeProductosRecuperados != undefined) {
      this.suscribeProductosRecuperados.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.nuevo = true;
    this.serviceProducto.obtenerbyName();
    this.subscriber = this.serviceProducto
      .listenerDatosProductoNombre()
      .subscribe((datos) => {
        this.options = datos;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    this.documentoRecuperadCotizacionProyecto();
    this.documentoRecuperarOrdenCompra();
    this.documentoRecuperadNotaaVenta();
  }
  documentoRecuperadNotaaVenta() {
    if(this.suscribeRecuperarDocumentoNotaVenta!=undefined) {
      this.suscribeRecuperarDocumentoNotaVenta.unsubscribe();
    }
    this.suscribeRecuperarDocumentoNotaVenta = this.serviceRecuperarDocumentos
      .listenerSujetoNotaVenta_Proyecto()
      .subscribe((datos) => {
        //consolethis.serviceProducto.buscarProductoParaRecuperarDocumento(datos[0].producto.id);
        var vector: any = [];

        for (var i = 0; i < datos.length; i++) {
          var itemsVenta = datos[i];
          var cliente  = itemsVenta.notaventa.cliente
          var descto:Number = 0;
          if(cliente!=undefined){
            if(cliente.tipodescto=='A'){
              descto = itemsVenta.producto.desctoa
            }else if (cliente.tipodescto=='B'){
              descto = itemsVenta.producto.desctob
            }else if(cliente.tipodescto=='C'){
              descto = itemsVenta.producto.desctoc
            }
          }
          if(itemsVenta.precio==undefined) {
            itemsVenta.precio = 0;
          }

          var item_proyecto: ModelItemProyecto | any = {
            nivel: '1',
            cantidad: itemsVenta.cantidad,
            monto:
              (itemsVenta.producto.precio.valueOf() *
              itemsVenta.cantidad.valueOf())- (descto.valueOf()*itemsVenta.cantidad.valueOf()),
            costo: itemsVenta.producto.costo,
            producto: itemsVenta.producto,
            cliente: cliente,
            descto:descto
          };
          vector.push(item_proyecto);
        }
        this.dataSource.data = vector;
        this.tablaDatos = vector;
        this.dataSource.paginator = this.pag;
        this.totalPrecioFuncion(this.tablaDatos);
      });
  }
  documentoRecuperadCotizacionProyecto() {
    if(this.suscribeRecuperarDocumentoProyecto!=undefined) {
      this.suscribeRecuperarDocumentoProyecto.unsubscribe();
    }
    this.suscribeRecuperarDocumentoProyecto = this.serviceRecuperarDocumentos
      .listenerSujetoProyecto_Proyecto()
      .subscribe((datos) => {
        console.log(datos);
        if (datos[0].origen != 'sinItems') {
          datos.forEach((dato) => {
            dato.monto = dato.cantidad.valueOf() * dato.costo.valueOf();
            dato.precioventa = dato.precioventa;
            dato.costo = dato.producto.costo;
            dato.nivel = '1';

          });
          this.dataSource.paginator = this.pag;
          this.dataSource.data = datos;
          this.tablaDatos = datos;
          this.totalPrecioFuncion(this.tablaDatos);
        }
      });
  }
  documentoRecuperarOrdenCompra() {
    if(this.suscribeRecuperarDocumentoOrdenCompra!=undefined) {
      this.suscribeRecuperarDocumentoOrdenCompra.unsubscribe();
    }
    this.suscribeRecuperarDocumentoOrdenCompra = this.serviceRecuperarDocumentos
      .listenerSujetoOrdenCompra_Proyecto()
      .subscribe((datos) => {
        var vector: any = [];
        for (var i = 0; i < datos.length; i++) {
          var itemsVenta = datos[i];
          if(itemsVenta.precio==undefined) {
            itemsVenta.precio = 0;

          }
          var item_producto: ModelItemProyecto | any = {
            nivel: '1',
            cantidad: itemsVenta.cantidad,
            monto:
              itemsVenta.producto.precio.valueOf() *
              itemsVenta.cantidad.valueOf(),
            costo: itemsVenta.producto.costo,
            producto: itemsVenta.producto,
          };
          vector.push(item_producto);
        }
        this.dataSource.paginator = this.pag;
        this.tablaDatos = vector;

        this.dataSource.data =  this.tablaDatos;
        console.log(this.dataSource.data);
        this.totalPrecioFuncion(this.tablaDatos);
      });
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra = this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return palabra;
  }
  agregar() {
    const recuperarInput: String = this.myControl.value;
    if (this.suscribeProductosRecuperados != undefined) {
      this.suscribeProductosRecuperados.unsubscribe();
    }
    this.serviceProducto.findbyName(recuperarInput);
    this.suscribeProductosRecuperados = this.serviceProducto
      .listenerFindByName()
      .subscribe((datos) => {
        const producto: ProductoModel = datos;
        if (isNaN(producto.precio.valueOf())) {
          producto.precio = 0;
        }
        const itemProyecto: ModelItemProyecto | any = {
          nivel: '1',
          utilidad: producto.utilidad,
          costo: producto.costo,
          producto: producto,
          costocompra: producto.costo,
          cantidad: 1,
          precioventa: producto.precio,
          monto: producto.precio,
        };
        if (this.tablaDatos.length == 0) {
          this.tablaDatos.push(itemProyecto);
          this.dataSource.data = this.tablaDatos;
          this.totalPrecioFuncion(this.tablaDatos);
        } else {
          //if (this.verificarProductosIguales(producto)) {
            this.tablaDatos.push(itemProyecto);
            this.dataSource.data = this.tablaDatos;
            this.totalPrecioFuncion(this.tablaDatos);
          //}
        }
        this.myControl.setValue('');
      });
  }
  input(input: String, valorInput: any, indice: number) {
    var numero: number = parseInt(valorInput);
    if(valorInput==''){
      this.dataSource.data[indice].monto = 0;
    }else{
      if(this.dataSource.data[indice].descto!=undefined){
        this.dataSource.data[indice].monto= (numero * this.dataSource.data[indice].producto.precio.valueOf())- (this.dataSource.data[indice].descto.valueOf()*numero);
      }else{
        this.dataSource.data[indice].monto= (numero * this.dataSource.data[indice].producto.precio.valueOf());
      }
      this.dataSource.data[indice].cantidad = numero;
    }
    this.tablaDatos = this.dataSource.data;
    this.totalPrecioFuncion(this.tablaDatos);
  }
  totalPrecioFuncion(vector: ModelItemProyecto[]) {
    var suma: number = 0;
    vector.forEach((data) => {
      suma += data.monto.valueOf();
    });
    this.precio.setValue(suma);
  }
  emitir() {
    this.mandarProductos.emit(this.tablaDatos);
  }
  inputDetalle(palabra: String, id: Number) {
    for (var i = 0; i < this.tablaDatos.length; i++) {
      if (this.tablaDatos[i].producto.id == id) {
        this.tablaDatos[i].detalle = palabra;
        this.dataSource.data = this.tablaDatos;
      }
    }
  }
  eliminarItem(id: Number) {
    this.tablaDatos.splice(id, 1);
    this.dataSource.data = this.tablaDatos;
    this.dataSource.data=this.tablaDatos;
    var suma:number=0;
    this.dataSource.data.forEach(data=>{
        suma+=data.monto.valueOf();
    })
    this.precio.setValue(suma);
  }
  recuperarNotaVenta() {
    this.matDialog.open(NotaVentaRecuperarComponent, {
      width: '700px',
      data: 'proyecto',
    });
  }
  recuperarOrdenCompra() {
    this.matDialog.open(NotaOrdenCompraComponent, {
      width: '700px',
      data: 'proyecto',
    });
  }
  recuperarProyecto() {
    this.matDialog.open(NotaCotizacionRecuperarComponent, {
      width: '700px',
      data: 'proyecto',
    });
  }
  mostrar() {
    this.padreInput = true;
  }
  agregarPadre() {
    var nombreProductoNuevo = this.padreInputValor.value;
    var productoNuevo: ProductoModel | any = { nombre: nombreProductoNuevo };
    this.dataSource.paginator = this.pag;
    var nuevoItem: ItemProyectoModel = {
      producto: productoNuevo,
      nivel: '1',
      monto: 0,
      nombrePadre: nombreProductoNuevo,
      //proyectoTablaHijos:{proyectoProductosHijos:[]}
      proyectoTablaHijos:{itemProyectos:[]}
    };
    this.tablaDatos.push(nuevoItem);

    this.dataSource.data = this.tablaDatos;
    this.padreInput = false;
    this.padreInputValor.setValue('');
  }
  //splice(lugar o posicion donde insertar, cantidad elementos a borrar, elemento a insertar)
  agregarSubproducto() {
    var nombreProductoNuevo = this.padreInputProductoValor.value;
    var productoNuevo: ProductoModel | any = {
      nombre: nombreProductoNuevo,
      codigo: this.itemSubproducto.producto.nombre,
      id: this.itemSubproducto.id,
    };

    this.dataSource.paginator = this.pag;

    var nivel = parseInt(this.itemSubproducto.nivel.toString()) + 1;

    var nuevoItem: ModelItemProyecto|any  = {
      producto: productoNuevo,
      nivel: nivel.toString(),
      monto: 0,
      proyectoTablaHijos:{itemProyectos:[]},
    };
    this.tablaDatos.push(nuevoItem);
    this.dataSource.data = this.tablaDatos;
    this.padreInput = false;
    this.padreInputProductoValor.setValue('');
    this.itemSubproducto = null;
    this.padreInputProducto = false;
  }
  mostrarSubproducto(item: ItemProductoModel) {
    this.padreInputProducto = true;
    this.itemSubproducto = item;
  }

  agregarSubproductoConExistenteProducto(item: ModelItemProyecto) {
    const recuperarInput: String = this.myControl.value;
    this.serviceProducto.findbyName(recuperarInput);
    if (this.suscribeProductosRecuperados != undefined) {
      this.suscribeProductosRecuperados.unsubscribe();
    }
    this.suscribeProductosRecuperados = this.serviceProducto// sin el subscribtion no da
      .listenerFindByName()
      .subscribe((datos) => {
        const producto: ProductoModel = datos;
        if (isNaN(producto.precio.valueOf())) {
          producto.precio = 0;
        }
        var nivel = parseInt(item.nivel.toString()) + 1;
        const itemProyecto: ModelItemProyecto | any = {
          nivel: nivel,
          utilidad: producto.utilidad,
          costo: producto.costo,
          producto: producto,
          costocompra: producto.costo,
          cantidad: 1,
          precioventa: producto.precio,
          monto: producto.precio,
        };
        item.proyectoTablaHijos.itemProyectos.push(itemProyecto)
        if (this.tablaDatos.length == 0) {
          this.tablaDatos.push(itemProyecto);
          this.dataSource.data = this.tablaDatos;
          this.totalPrecioFuncion(this.tablaDatos);
        } else {
          /*if (this.verificarProductosIguales(producto)) {
            this.tablaDatos.push(itemProyecto);
            this.dataSource.data = this.tablaDatos;
            this.totalPrecioFuncion(this.tablaDatos);
          }*/
        }
        this.myControl.setValue('');
      });
  }
}
