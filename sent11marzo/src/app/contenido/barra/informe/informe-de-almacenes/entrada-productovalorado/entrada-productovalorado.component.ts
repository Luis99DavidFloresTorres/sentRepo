import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceInformes } from 'src/app/services/Informes.service';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

@Component({
  selector: 'app-entrada-productovalorado',
  templateUrl: './entrada-productovalorado.component.html',
  styleUrls: ['./entrada-productovalorado.component.css']
})
export class EntradaProductovaloradoComponent implements OnInit,OnDestroy {

  costoTotal=new FormControl();
  //costo=new FormControl();
  informeVentas:FormGroup|any;
  conFactura= new FormControl();
  sinFactura = new FormControl();
  cantidad = new FormControl();
  iva = new FormControl();
  dataSource = new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[]=[]
  subscriptionInformeAlmacen:Subscription|any;
  subscriptionInformeAlmacenConFactura:Subscription|any;
  subscriptionInformeAlmacenSinFactura:Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private formBuilder:FormBuilder, private serviceInforme:ServiceInformes, public datepipe: DatePipe, public dateAdapter:DateAdapter<any>) { }
  ngOnDestroy(): void {
    if(this.subscriptionInformeAlmacen!=undefined){
      this.subscriptionInformeAlmacen.unsubscribe();
    }
    if(this.subscriptionInformeAlmacenConFactura!=undefined){
      this.subscriptionInformeAlmacenConFactura.unsubscribe();
    }
    if(this.subscriptionInformeAlmacenSinFactura!=undefined){
      this.subscriptionInformeAlmacenSinFactura.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
    this.informeVentas = this.formBuilder.group({
      fechaDesde:[''],
      fechaHasta:['']
    })
  }
  buscarItems(){
    if(this.subscriptionInformeAlmacen!=undefined){
      this.subscriptionInformeAlmacen.unsubscribe();
    }
    this.serviceInforme.informeAlmacenPorEntradasDeProductos(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionInformeAlmacen = this.serviceInforme.listenerInformeAlmacenEntradaU().subscribe(data=>{
      this.dataSource.data=data;
      var sumaCostoTotal = 0;
 //     var sumaCosto = 0;
      data.forEach(fecha=>{

        let latest_date:any =this.datepipe.transform(fecha.transproducto.fecha, 'yyyy-MM-dd');
        fecha.fechaact = new Date(latest_date[0]) ;
       // sumaCosto+=fecha.costo.valueOf();
        sumaCostoTotal+=fecha.monto.valueOf();
      })
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper', 'transproducto.notaventa','transproducto.factura','producto.nombre','producto.unidad.nombre','serial','cantidad','costo','monto'];

     // this.costo.setValue(sumaCosto);
      this.costoTotal.setValue(sumaCostoTotal);
    })
  }
  pathDataAccessor(item: any, path: string): any {
    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.pathDataAccessor;
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm:any, key:any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  nestedFilterCheck(search:any, data:any, key:any) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
  ventasDirectas(){
    this.conFactura.setValue(false);
    if(this.subscriptionInformeAlmacenSinFactura!=undefined){
      this.subscriptionInformeAlmacenSinFactura.unsubscribe();
    }
    if(this.subscriptionInformeAlmacenConFactura!=undefined){
      this.subscriptionInformeAlmacenConFactura.unsubscribe();
    }
    this.serviceInforme.informeAlmacenPorEntradasDeProductosSinFactura(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionInformeAlmacenSinFactura = this.serviceInforme.listenerInformeAlmacenEntradaUSinFactura().subscribe(data=>{
      this.dataSource.data=data;
      var sumaCostoTotal = 0;
      var cantidad = 0;
      data.forEach(fecha=>{

        let latest_date:any =this.datepipe.transform(fecha.transproducto.fecha, 'yyyy-MM-dd');
        fecha.fechaact = new Date(latest_date[0]) ;
        sumaCostoTotal+=fecha.monto.valueOf();
        cantidad+=fecha.cantidad.valueOf();
      })
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper', 'transproducto.notaventa','transproducto.factura','producto.nombre','producto.unidad.nombre','serial','cantidad','costo','monto'];

      this.costoTotal.setValue(sumaCostoTotal);
      this.cantidad.setValue(cantidad);
      this.iva.setValue(0);
    })
  }
  ventasConFactura(){
    this.sinFactura.setValue(false);
    if(this.subscriptionInformeAlmacenConFactura!=undefined){
      this.subscriptionInformeAlmacenConFactura.unsubscribe();
    }
    if(this.subscriptionInformeAlmacenSinFactura!=undefined){
      this.subscriptionInformeAlmacenSinFactura.unsubscribe();
    }
    this.serviceInforme.informeAlmacenPorEntradasDeProductosConFactura(this.informeVentas.get('fechaDesde').value,this.informeVentas.get('fechaHasta').value);
    this.subscriptionInformeAlmacenConFactura = this.serviceInforme.listenerInformeAlmacenEntradaUConFactura().subscribe(data=>{
      this.dataSource.data=data;
      var sumaCostoTotal = 0;
      var cantidad = 0;
      data.forEach(fecha=>{

        let latest_date:any =this.datepipe.transform(fecha.transproducto.fecha, 'yyyy-MM-dd');
        fecha.fechaact = new Date(latest_date[0]) ;
        sumaCostoTotal+=fecha.monto.valueOf();
        cantidad +=fecha.cantidad.valueOf();
      })
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper','transproducto.notaventa','transproducto.factura','producto.nombre','producto.unidad.nombre','serial','cantidad','costo','monto'];

      this.costoTotal.setValue(sumaCostoTotal);
      this.cantidad.setValue(cantidad);
      this.iva.setValue(sumaCostoTotal*0.13);
    })
  }
}
