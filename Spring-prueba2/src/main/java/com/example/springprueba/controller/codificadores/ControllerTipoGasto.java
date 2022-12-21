package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.tipoCliente;
import com.example.springprueba.model.codificadores.tipoGasto;
import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.repo.RepoUnidad;
import com.example.springprueba.service.codificadores.ServiceTipoCliente;
import com.example.springprueba.service.codificadores.ServiceTipoGasto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/tipoGasto")
public class ControllerTipoGasto {
    private final ServiceTipoGasto serviceTipoGasto;
    private final RepoUnidad repoUnidad;
    public ControllerTipoGasto(ServiceTipoGasto serviceRubro, RepoUnidad repoUnidad){
        this.serviceTipoGasto = serviceRubro;
        this.repoUnidad = repoUnidad;
    }
    @GetMapping
    public ResponseEntity<List<tipoGasto>> getTipoGastos(){


        List<tipoGasto> tipoGastoList = serviceTipoGasto.findAllTipoGastos();
        return new ResponseEntity<>(tipoGastoList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<tipoGasto> getRubroId(@PathVariable("id") Long id){
        tipoGasto tipoGastoG = serviceTipoGasto.findbyidTipoGasto(id);
        return new ResponseEntity<>(tipoGastoG, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<tipoGasto> addPaises(@RequestBody tipoGasto tipoGastop){
        unidades unidad = this.repoUnidad.findUnidadesbyName(tipoGastop.getUnidad().getNombre());
        tipoGastop.setUnidad(unidad);
        tipoGasto tipoGastoG = serviceTipoGasto.addTipoGasto(tipoGastop);
        return new ResponseEntity(tipoGastoG, HttpStatus.CREATED);
    }
}
