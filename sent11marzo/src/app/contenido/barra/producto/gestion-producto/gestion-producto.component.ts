import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceProducto } from 'src/app/services/producto.service';
import { InsertWithStepperComponent } from '../insert-with-stepper/insert-with-stepper.component';
import { MostrarFormProductoComponent } from '../mostrar-form-producto/mostrar-form-producto.component';

import { EliminarComponent } from './eliminar.component';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass: any;
  displayedColumns = ['codigo','nombre','marca','imagen','enlace'];
  dataSource= new MatTableDataSource<ProductoModel>();
  formCheckboxGroup : FormGroup|any;
  fechas: boolean=true;
  id: FormControl|any;
  archivos =[];
  pais:ProductoModel[]|any;
  sujetoSubs:Subscription|any; //    aumentamos esta linea el 15 de febrero de 2022 11:16
  sujetoSubscripcion: Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;

  constructor(private dialog: MatDialog, private serviceProducto: ServiceProducto, private formBuild: FormBuilder, public overlayContainer:OverlayContainer) { }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
    if(this.sujetoSubs!=undefined){
      this.sujetoSubs.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.onSetTheme("dark-theme");
    this.id = new FormControl();
    this.formCheckboxGroup = this.formBuild.group({
        check1:['',[Validators.required]],
        check2:['',[Validators.required]],
        check3:['',[Validators.required]]
    })
    this.serviceProducto.obtenerProductosImagen();
    this.sujetoSubscripcion=this.serviceProducto.listenerDatosProductoImagen().subscribe((datos)=>{
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
    })
    this.sujetoSubscripcion =this.serviceProducto.listenerDatosProducto().subscribe((datos)=>{

      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
    });
    this.sujetoSubs = this.serviceProducto.listenerEditarProduct().subscribe(datos=>{
      this.serviceProducto.obtenerProductosImagen();
    this.sujetoSubscripcion=this.serviceProducto.listenerDatosProductoImagen().subscribe((datos)=>{
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
    })
    })
    this.sujetoSubs =this.serviceProducto.listeneraddProduct().subscribe(datos=>{
      this.serviceProducto.obtenerProductosImagen();
    this.sujetoSubscripcion=this.serviceProducto.listenerDatosProductoImagen().subscribe((datos)=>{
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;

    })
    })
    this.sujetoSubs = this.serviceProducto.listeneraddImage().subscribe(datos=>{
      this.serviceProducto.obtenerProductosImagen();
      this.sujetoSubscripcion=this.serviceProducto.listenerDatosProductoImagen().subscribe((datos)=>{
      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;

    })
    })
  }
  cambiarValoresFalse(valorCheck:any){
    for(var elemento in this.formCheckboxGroup.controls){
          if(elemento != valorCheck){
              this.formCheckboxGroup.controls[elemento].setValue(false);
          }else{

          }
    }
  }
  tablaPrecio(){
    this.serviceProducto.obtenerProductos();
    this.cambiarValoresFalse( this.formCheckboxGroup.controls.check2);
    this.displayedColumns = ["codigo","nombre","unidadS","modelo","marca","costo"]
  }
  tablaProducto(){
    this.serviceProducto.obtenerProductos();
    this.cambiarValoresFalse( this.formCheckboxGroup.controls.check1);
    this.displayedColumns = ["codigo","nombre","ingresos","salidas","saldo","costo"]
  }
  tablaProductoValorado(){
    this.serviceProducto.obtenerProductos();
    this.cambiarValoresFalse( this.formCheckboxGroup.controls.check3);
    this.displayedColumns=["codigo","nombre","unidadS","invinicial","ingresos","salidas","saldo","costo","costoTotal"];
  }
  eliminar(id:String){
    this.dialog.open(EliminarComponent,{width:'400px',height:'150px', data:{id:id}})
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm:any, key:any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
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
  abrirDialog(){
    this.dialog.open(InsertWithStepperComponent,{width:'700px',height:'800px', data:{boton: "agregar"}});
  }
  obtenerFotoConsulta(id: String){
    this.dialog.open(MostrarFormProductoComponent,{width:'700px',height:'800px', data : {id:id,boton: "editar"}});
  }
  /*obtenerFotoById(foto:any){
    this.extraerBase64(foto).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(this.previsualizacion); // esto hara que se agregue uno al vector es decir que al momento de agregar ya estara esa imagen
  }
  extraerBase64 = async($event: any) => new Promise((resolve, reject)=>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader= new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base: reader.result
        });
      }
      reader.onerror = error =>{
        resolve({
          base:null

        })
      }
      return reader;
    } catch (error) {
      return null;
    }
  })*/
  public onSetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }
}
