package com.example.springprueba.controller;

import com.example.springprueba.functions.factories.FactoryProveedores;
import com.example.springprueba.model.cotizProducto;
import com.example.springprueba.model.proveedor;
import com.example.springprueba.repo.RepoCotizProducto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/cotizacionProducto")
public class ControllerCotizProducto {
    private final RepoCotizProducto repoCotizProducto;
    private final FactoryProveedores factoryProveedores;
    public ControllerCotizProducto(RepoCotizProducto repoCotizProducto, FactoryProveedores factoryProveedores){
        this.repoCotizProducto = repoCotizProducto;
        this.factoryProveedores = factoryProveedores;
    }
    @GetMapping("/mayorCotizacionesProveedor/{fecha1}/{fecha2}/{nombre}")
    public ResponseEntity<List<?>> mayorCotizacionesProveedor(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombre") String nombre){
        List<?> cotizProductoList = this.factoryProveedores.tablas("cotizProveedor",fecha1,fecha2,nombre);
        return new ResponseEntity<>(cotizProductoList, HttpStatus.OK);
    }
}
