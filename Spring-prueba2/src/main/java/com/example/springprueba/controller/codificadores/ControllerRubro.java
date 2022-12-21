package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.model.codificadores.rubro;
import com.example.springprueba.service.codificadores.ServiceRubro;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rubro")
public class ControllerRubro {
    private final ServiceRubro serviceRubro;
    public ControllerRubro(ServiceRubro serviceRubro){
        this.serviceRubro = serviceRubro;
    }
    @GetMapping
    public ResponseEntity<List<rubro>> getRubro(){
        List<rubro> rubroList = serviceRubro.findAllRubros();
        return new ResponseEntity<>(rubroList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<rubro> getRubroId(@PathVariable("id") Long id){
        rubro rubroR = serviceRubro.findbyidRubro(id);
        return new ResponseEntity<>(rubroR, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<rubro> addPaises(@RequestBody rubro rubrop){
        rubro rubroR = serviceRubro.addRubro(rubrop);
        return new ResponseEntity(rubroR, HttpStatus.CREATED);
    }
}