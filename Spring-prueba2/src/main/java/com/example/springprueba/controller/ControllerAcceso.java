package com.example.springprueba.controller;

import com.example.springprueba.model.acceso;

import com.example.springprueba.service.ServiceAcceso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acceso")
public class ControllerAcceso {
    private final ServiceAcceso serviceAcceso;
    public ControllerAcceso(ServiceAcceso serviceAcceso){
        this.serviceAcceso = serviceAcceso;
    }
    @GetMapping
    public ResponseEntity<List<acceso>> getInmuebles(){
        List<acceso> inmuebleList = serviceAcceso.findAllAccesos();
        return new ResponseEntity<>(inmuebleList, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<List<acceso>> addInmuebles(@RequestBody acceso acceso){
        acceso inmuebleG = serviceAcceso.addAcceso(acceso);
        return new ResponseEntity(inmuebleG, HttpStatus.CREATED);
    }
}