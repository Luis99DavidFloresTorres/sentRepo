package com.example.springprueba.controller;

import com.example.springprueba.model.activoFijo;
import com.example.springprueba.repo.RepoActivoFijo;
import com.example.springprueba.service.ServiceActivoFijo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activoFijo")
public class ControllerActivoFijo {
    private ServiceActivoFijo serviceActivoFijo;
    public ControllerActivoFijo(ServiceActivoFijo serviceActivoFijo){
        this.serviceActivoFijo = serviceActivoFijo;
    }
    @GetMapping("/herramientas")
    public ResponseEntity<List<activoFijo>> porNombre(){
            List<activoFijo> porNombre = this.serviceActivoFijo.ordenarPorNombre();
            return new ResponseEntity<>(porNombre, HttpStatus.OK);
    }
}
