package com.example.springprueba.controller;


import com.example.springprueba.functions.facades.FacadeNroDocMaximo;
import com.example.springprueba.functions.ultimoNro.NotaVentaMaximo;
import com.example.springprueba.functions.ultimoNro.Salidas;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoTransproducto;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.ServiceTransproducto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transproducto")
public class ControllerTransproduct {
    private final RepoTransproducto repoTransproducto;
    private final ServiceTransproducto serviceTransproducto;
    public ControllerTransproduct(RepoTransproducto repoTransproducto, ServiceTransproducto serviceTransproducto){
        this.repoTransproducto = repoTransproducto;
        this.serviceTransproducto = serviceTransproducto;
    }
    @GetMapping("/entradasProducto")
    public ResponseEntity<List<transactionProduct>> obtenerEntradaProducto(){
        List<transactionProduct> transactionProductList =  this.repoTransproducto.findByOperLessThan(320);
        return new ResponseEntity<>(transactionProductList, HttpStatus.OK);
    }
    @GetMapping("/salidasProducto")
    public ResponseEntity<List<transactionProduct>> obtenerSalidaProducto(){
        List<transactionProduct> transactionProductList =  this.repoTransproducto.findByOperGreaterThanEqual(320);
        return new ResponseEntity<>(transactionProductList, HttpStatus.OK);
    }
}