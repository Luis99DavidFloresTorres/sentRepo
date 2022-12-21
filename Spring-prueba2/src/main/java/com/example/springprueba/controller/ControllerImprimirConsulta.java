package com.example.springprueba.controller;

import com.example.springprueba.functions.imprimir.ImprimirConsulta;
import com.example.springprueba.model.itemProducto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/imprimirConsulta")
public class ControllerImprimirConsulta {
    @PostMapping("/kardex")
    public ResponseEntity<InputStreamResource> kardexImprimir(@RequestBody List<itemProducto> itemProductoList) throws Exception {
        ImprimirConsulta imprimir = new ImprimirConsulta();
        ByteArrayInputStream byteCliente = imprimir.kardex(itemProductoList);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"kardex.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @PostMapping("/primeros1000")
    public ResponseEntity<InputStreamResource> primeros1000(@RequestBody List<itemProducto> itemProductoList) throws Exception {
        ImprimirConsulta imprimir = new ImprimirConsulta();
        ByteArrayInputStream byteCliente = imprimir.primeros1000PorFecha(itemProductoList);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"primeros1000.xlsx\"");

        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @PostMapping("/mayorIngresos")
    public ResponseEntity<InputStreamResource> mayorIngresosImprimir(@RequestBody List<itemProducto> itemProductoList) throws Exception {
        ImprimirConsulta imprimir = new ImprimirConsulta();
        ByteArrayInputStream byteCliente = imprimir.ingresos(itemProductoList);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"kardex.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @PostMapping("/mayorSalidas")
    public ResponseEntity<InputStreamResource> mayorSalidasImprimir(@RequestBody List<itemProducto> itemProductoList) throws Exception {
        ImprimirConsulta imprimir = new ImprimirConsulta();
        ByteArrayInputStream byteCliente = imprimir.salidas(itemProductoList);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"kardex.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @PostMapping("/productoPeriodo")
    public ResponseEntity<InputStreamResource> productoPeriodoImprimir(@RequestBody List<itemProducto> itemProductoList) throws Exception {
        ImprimirConsulta imprimir = new ImprimirConsulta();
        ByteArrayInputStream byteCliente = imprimir.productoPeriodo(itemProductoList);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"kardex.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
}
