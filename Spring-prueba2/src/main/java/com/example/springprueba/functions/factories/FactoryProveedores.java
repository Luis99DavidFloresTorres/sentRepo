package com.example.springprueba.functions.factories;
;

import com.example.springprueba.model.*;

import com.example.springprueba.repo.*;
import org.apache.commons.math3.analysis.function.Log;
import org.hibernate.type.AnyType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@Service
public class FactoryProveedores {
    private final RepoOrdenCompra repoOrdenCompra;
    private final RepoItemCompra repoItemCompra;
    private final RepoItemProducto repoItemProducto;
    private final RepoCotizProducto repoCotizProducto;
    private final RepoProveedor repoProveedor;
    private final RepoItemCotizProd repoItemCotizProd;
    public FactoryProveedores(RepoOrdenCompra repoOrdenCompra, RepoItemCompra repoItemCompra, RepoItemProducto repoItemProducto, RepoCotizProducto repoCotizProducto, RepoProveedor repoProveedor, RepoItemCotizProd repoItemCotizProd){
        this.repoItemCompra = repoItemCompra;
        this.repoOrdenCompra = repoOrdenCompra;
        this.repoItemProducto = repoItemProducto;
        this.repoCotizProducto = repoCotizProducto;
        this.repoProveedor = repoProveedor;
        this.repoItemCotizProd = repoItemCotizProd;
    };
    public List<?> tablas(String modulo, Date fecha1, Date fecha2, String nombreProveedor){
        List<?> itemcompra=null;
        if(modulo.equals("ordencompra")){

            itemcompra= repoItemCompra.byProveedor(nombreProveedor);
            List<itemcompra> itemcompraEntreFechas = new ArrayList<>();
            for(Object itemcompraFor: itemcompra){
                itemcompra itemcompraCasteado = (itemcompra) itemcompraFor;
                Date fechaCompra = itemcompraCasteado.getOrdencompra().getFecha();

                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemcompraCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        }else if(modulo.equals("compra")){
            itemcompra= repoItemProducto.proveedorMayorCompra(nombreProveedor);
            List<itemProducto> itemcompraEntreFechas = new ArrayList<>();
            for(Object itemcompraFor: itemcompra){
                itemProducto itemproductoCasteado = (itemProducto) itemcompraFor;
                Date fechaCompra = itemproductoCasteado.getTransproducto().getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        }else if(modulo.equals("cotizacionProveedor")){ // ya no se usa, se usa en el controllerItem con el POST
            List<ItemCotizProducto> pr = new ArrayList<>();
            proveedor proveedor = repoProveedor.findByNombre(nombreProveedor);
            List<cotizProducto> cotizProducto = repoCotizProducto.findByProveedor(proveedor);
            for(cotizProducto c : cotizProducto){
                List<ItemCotizProducto> icp = repoItemCotizProd.findByCotizProducto(c);
                pr.addAll(icp);
            }
            //itemcompra= repoCotizProducto.findByProveedor(proveedor);
            itemcompra = pr;
            List<ItemCotizProducto> itemcompraEntreFechas = new ArrayList<>();
            /*for(Object itemcompraFor: itemcompra){
                cotizProducto itemproductoCasteado = (cotizProducto) itemcompraFor;
                Date fechaCompra = itemproductoCasteado.getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }*/
            System.out.println("emtraaaaaaaaaaaaaaaaaaaaa");
            for(Object itemcompraFor: itemcompra){
                ItemCotizProducto itemproductoCasteado = (ItemCotizProducto) itemcompraFor;
                Date fechaCompra = itemproductoCasteado.getCotizProducto().getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        }else if(modulo.equals("mayorProductosOrdenCompra")){
            itemcompra= repoItemCompra.productoOrdenCompra(nombreProveedor);
            List<itemcompra> itemcompraEntreFechas = new ArrayList<>();

            for(Object itemcompraFor: itemcompra){
                itemcompra itemproductoCasteado = (itemcompra) itemcompraFor;

                Date fechaCompra = itemproductoCasteado.getOrdencompra().getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){

                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        }else if(modulo.equals("mayorProductosCompra")){
            itemcompra= repoItemProducto.proveedorMayorCompra(nombreProveedor);
            List<itemProducto> itemcompraEntreFechas = new ArrayList<>();
            for(Object itemcompraFor: itemcompra){
                itemProducto itemproductoCasteado = (itemProducto) itemcompraFor;
                Date fechaCompra = itemproductoCasteado.getTransproducto().getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){

                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        } else if(modulo.equals("productosCotizacion")){ // ya no se usa, se usa en el controllerItem con el POST
            proveedor proveedor = repoProveedor.findByNombre(nombreProveedor);
            itemcompra= repoItemCotizProd.byProveedor(proveedor);
            List<ItemCotizProducto> itemcompraEntreFechas = new ArrayList<>();
            for(Object itemcompraFor: itemcompra){
                ItemCotizProducto itemproductoCasteado = (ItemCotizProducto) itemcompraFor;
                Date fechaCompra = itemproductoCasteado.getCotizProducto().getFecha();
                if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemproductoCasteado);
                }
            }
            itemcompra = itemcompraEntreFechas;
        }
        return itemcompra;
    };
}
