package com.example.springprueba.controller;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.cotizacion;
import com.example.springprueba.model.itemcompra;
import com.example.springprueba.repo.RepoCliente;
import com.example.springprueba.repo.RepoCotizacion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/cotizacion")
public class ControllerCotizacion {
    private final RepoCotizacion repoCotizacion;
    private final RepoCliente repoCliente;
    public ControllerCotizacion(RepoCotizacion repoCotizacion, RepoCliente repoCliente){
        this.repoCotizacion = repoCotizacion;
        this.repoCliente = repoCliente;
    }
    @GetMapping("/{fecha1}/{fecha2}/{nombreCliente}")
    public ResponseEntity<List<?>> tablasConsulta(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreCliente") String nombreCliente){
        cliente cliente = repoCliente.findByNombre(nombreCliente);
        List<cotizacion> listaClientes = this.repoCotizacion.findByCliente(cliente);
        List<cotizacion> nuevaLista = new ArrayList<>();
        for(cotizacion cotizacionFor: listaClientes){
            Date fechaCompra = cotizacionFor.getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                nuevaLista.add(cotizacionFor);
            }
        }
        return new ResponseEntity<>(nuevaLista, HttpStatus.OK);
    }
}
