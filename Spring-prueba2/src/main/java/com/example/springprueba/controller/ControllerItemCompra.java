package com.example.springprueba.controller;

import com.example.springprueba.functions.imprimir.Imprimir;
import com.example.springprueba.model.itemcompra;

import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoItemCompra;

import com.example.springprueba.repo.RepoOrdenCompra;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.ServiceItemCompra;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itemCompra")
public class ControllerItemCompra {
    private RepoItemCompra repoItemCompra;
    private RepoOrdenCompra repoOrdenCompra;

    private ServiceItemCompra serviceItemCompra;
    private Imprimir imprimir;
    public ControllerItemCompra(RepoItemCompra repoItemCompra, RepoOrdenCompra repoOrdenCompra, Imprimir imprimir, ServiceItemCompra serviceItemCompra){
        this.repoItemCompra=repoItemCompra;
        this.repoOrdenCompra = repoOrdenCompra;
        this.imprimir=imprimir;
        this.serviceItemCompra = serviceItemCompra;
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<itemcompra>> encontrarTodo(){
        List<itemcompra> itemcompraList = repoItemCompra.findAll();
        return new ResponseEntity<>(itemcompraList, HttpStatus.OK);
    }
    @GetMapping("/byOrdenCompra/{id}")
    public ResponseEntity<List<itemcompra>> bydOrdenCompra(@PathVariable("id") Long id){
        Optional<ordencompra> ordencompra = repoOrdenCompra.findById(id);
        List<itemcompra> itemcompraList = repoItemCompra.findByOrdencompra(ordencompra.get());
        return new ResponseEntity<>(itemcompraList, HttpStatus.OK);
    }
    @GetMapping("/fechasP/{fecha1}/{fecha2}/{nombreP}")
    public ResponseEntity<List<itemcompra>> entreFechasProducto(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreP") String nombreP){
        System.out.println(fecha1);
        System.out.println(fecha2);
        System.out.println(nombreP);
        List<itemcompra> fechasProducto = this.serviceItemCompra.entreFechas(fecha1,fecha2,nombreP);
        return new ResponseEntity<>(fechasProducto, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> agregar(@RequestBody List<itemcompra> itemcompraList){
        Long id = repoOrdenCompra.findByNrodoc(itemcompraList.get(0).getOrdencompra().getNrodoc()).getId();
        ordencompra ordencompra = itemcompraList.get(0).getOrdencompra();
        ordencompra.setId(id);
        ordencompra nuevoOrdenCompra = repoOrdenCompra.save(ordencompra);
        for (itemcompra itemcompra: itemcompraList){
            itemcompra.setOrdencompra(nuevoOrdenCompra);
        }
        repoItemCompra.saveAll(itemcompraList);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    @GetMapping("/imprimir/{nrodoc}")
    public ResponseEntity<InputStreamResource> buildExcelDocument(@PathVariable("nrodoc") Integer nrodoc) throws Exception {
        System.out.println("entra");
        ByteArrayInputStream byteCliente = this.imprimir.ordenCompra(nrodoc,this.repoOrdenCompra,this.repoItemCompra);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"notaventa.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @PostMapping("/informeOrdenCompra/{fechaDesde}/{fechaHasta}")
    public ResponseEntity<List<itemcompra>> informeOrdenCompra(@PathVariable("fechaDesde") Date fechaDesde, @PathVariable("fechaHasta") Date fechaHasta) throws Exception {
       List<itemcompra> entreFechas = repoItemCompra.entre2Fechas(fechaDesde, fechaHasta);
       List<itemcompra> sumarOrdenes = new ArrayList<>();
       double acumulador = 0;

       int nrodoc = entreFechas.get(0).getOrdencompra().getNrodoc();
       for(int i=0;i<entreFechas.size();i++){
           if(entreFechas.get(i).getOrdencompra().getNrodoc().equals(nrodoc)){
               acumulador +=entreFechas.get(i).getCostoTotal();
           }
           else{
               sumarOrdenes.add(entreFechas.get(i-1));
               nrodoc=entreFechas.get(i).getOrdencompra().getNrodoc();
               acumulador = entreFechas.get(i).getCostoTotal();
           }
       }
       sumarOrdenes.add(entreFechas.get(entreFechas.size()-1));
        return new ResponseEntity<>(entreFechas, HttpStatus.OK);
    }
}
