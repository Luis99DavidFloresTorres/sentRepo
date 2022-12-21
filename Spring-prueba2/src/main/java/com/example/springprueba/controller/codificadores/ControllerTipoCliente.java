package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.rubro;
import com.example.springprueba.model.codificadores.tipoCliente;
import com.example.springprueba.service.codificadores.ServiceTipoCliente;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipoCliente")
public class ControllerTipoCliente {
    private final ServiceTipoCliente serviceTipoCliente;
    public ControllerTipoCliente(ServiceTipoCliente serviceRubro){
        this.serviceTipoCliente = serviceRubro;
    }
    @GetMapping
    public ResponseEntity<List<tipoCliente>> getTipoClientes(){
        List<tipoCliente> tipoClienteList = serviceTipoCliente.findAllTipoClientes();
        return new ResponseEntity<>(tipoClienteList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<tipoCliente> getRubroId(@PathVariable("id") Long id){
        tipoCliente tipoClienteR = serviceTipoCliente.findbyidTipoCliente(id);
        return new ResponseEntity<>(tipoClienteR, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<tipoCliente> addPaises(@RequestBody tipoCliente tipoClientep){
        tipoCliente tipoClienteR = serviceTipoCliente.addTipoCliente(tipoClientep);
        return new ResponseEntity(tipoClienteR, HttpStatus.CREATED);
    }
}