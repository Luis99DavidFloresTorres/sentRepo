package com.example.springprueba.controller.codificadores;


import com.example.springprueba.model.codificadores.deposito;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.repo.ReposDeposito;
import com.example.springprueba.service.codificadores.ServiceDeposito;
import com.example.springprueba.service.codificadores.ServicePais;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deposito")
public class ControllerDeposito {
    private final ServiceDeposito serviceDeposito;
    private final ReposDeposito reposDeposito;
    public ControllerDeposito(ServiceDeposito serviceDeposito, ReposDeposito repoDeposito){
        this.serviceDeposito = serviceDeposito;
        this.reposDeposito = repoDeposito;
    }
    @GetMapping
    public ResponseEntity<List<deposito>> getDepositos(){
        List<deposito> depositoList = serviceDeposito.findAlldepositos();
        return new ResponseEntity<>(depositoList, HttpStatus.OK);
    }
    @GetMapping("/byName")
    public ResponseEntity<List<deposito>> getDepositosName(){
        List<deposito> depositoList = serviceDeposito.findbyNameDeposito();
        return new ResponseEntity<>(depositoList, HttpStatus.OK);
    }
    @GetMapping("/byName/{nombre}")
    public ResponseEntity<deposito> getDepositosName(@PathVariable("nombre") String nombre){
        deposito depositoList = reposDeposito.findByNombre(nombre);
        return new ResponseEntity<>(depositoList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<deposito> getPaisId(@PathVariable("id") Long id){
        deposito depositoR = serviceDeposito.findbyidDeposito(id);
        return new ResponseEntity<>(depositoR, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<deposito> addPaises(@RequestBody deposito depositop){
        deposito depositoG = serviceDeposito.addDeposito(depositop);
        return new ResponseEntity(depositoG, HttpStatus.CREATED);
    }
}