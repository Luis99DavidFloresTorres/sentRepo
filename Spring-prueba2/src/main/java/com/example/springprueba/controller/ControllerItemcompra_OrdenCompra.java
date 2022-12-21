package com.example.springprueba.controller;

import com.example.springprueba.functions.factories.FactoryProveedores;
import com.example.springprueba.model.*;
import com.example.springprueba.repo.RepoCotizProducto;
import com.example.springprueba.repo.RepoItemCotizProd;
import com.example.springprueba.repo.RepoProveedor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/api/itemcompra_ordencompra")
public class ControllerItemcompra_OrdenCompra {
    private final FactoryProveedores factoryProveedores;
    private final RepoProveedor repoProveedor;
    private final RepoCotizProducto repoCotizProducto;
    private final RepoItemCotizProd repoItemCotizProd;
    public ControllerItemcompra_OrdenCompra(FactoryProveedores factoryProveedores, RepoCotizProducto repoCotizProducto, RepoProveedor repoProveedor, RepoItemCotizProd repoItemCotizProd){
        this.factoryProveedores = factoryProveedores;
        this.repoProveedor = repoProveedor;
        this.repoCotizProducto = repoCotizProducto;
        this.repoItemCotizProd = repoItemCotizProd;
    }
    @GetMapping("/tablas/{nombre}/{fecha1}/{fecha2}/{nombreProveedor}")
    public ResponseEntity<List<?>> tablasConsulta(@PathVariable("nombre") String nombre, @PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreProveedor") String nombreProveedor){
        List<?> listaTablaProveedor = this.factoryProveedores.tablas(nombre, fecha1, fecha2, nombreProveedor);

        return new ResponseEntity<>(listaTablaProveedor, HttpStatus.OK);
    }
    @PostMapping("/tablas/{nombre}/{fecha1}/{fecha2}/")
    public ResponseEntity<List<ItemCotizProducto>> tabla(@PathVariable("nombre") String nombre, @PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @RequestBody proveedor proveedor){
        List<ItemCotizProducto> pr = new ArrayList<>();
        List<cotizProducto> cotizProducto = repoCotizProducto.findByProveedor(proveedor);
        for(cotizProducto c : cotizProducto){
            List<ItemCotizProducto> icp = repoItemCotizProd.findByCotizProducto(c);
            pr.addAll(icp);
        }
        List<ItemCotizProducto> itemcompraEntreFechas = new ArrayList<>();
        for(ItemCotizProducto itemcompraFor: pr){

            Date fechaCompra = itemcompraFor.getCotizProducto().getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                itemcompraEntreFechas.add(itemcompraFor);
            }
        }


        /*List<cotizProducto> itemcompra= repoCotizProducto.findByProveedor(proveedor);

        List<cotizProducto> itemcompraEntreFechas = new ArrayList<>();
        for(cotizProducto itemcompraFor: itemcompra){

            Date fechaCompra = itemcompraFor.getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){

                itemcompraEntreFechas.add(itemcompraFor);
            }
        }
        itemcompra = itemcompraEntreFechas;*/

        return new ResponseEntity<>(itemcompraEntreFechas, HttpStatus.OK);
    }
}
