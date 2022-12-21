package com.example.springprueba.controller;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.proyecto;
import com.example.springprueba.repo.RepoProyecto;
import com.example.springprueba.responsesJson.seguimientoPorUsuario;
import com.example.springprueba.service.ServiceProyecto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/proyecto")
public class ControllerProyecto {
    private final RepoProyecto repoProyecto;
    private final ServiceProyecto serviceProyecto;
    public ControllerProyecto(RepoProyecto repoProyecto, ServiceProyecto serviceProyecto){
        this.repoProyecto = repoProyecto;
        this.serviceProyecto = serviceProyecto;
    }
    @GetMapping("/obtenerTodos")
    public ResponseEntity<List<proyecto>> getAll(){
        List<proyecto> proyectList = repoProyecto.findAll();
        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
    @GetMapping("/estadoProyecto/{fechaini}/{fechafinal}/{estadoProyecto}")
    public ResponseEntity<List<proyecto>> estadoProyecto(@PathVariable("fechaini") Date fechaini, @PathVariable("fechafinal") Date fechafinal,@PathVariable("estadoProyecto") String estadoProyecto ){
        List<proyecto> proyectList = serviceProyecto.proyectoPorProyecto(fechaini,fechafinal,estadoProyecto);

        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
    @GetMapping("/estados")
    public ResponseEntity<List<String>> estados(){
        List<proyecto> proyectList = repoProyecto.findAll();
        List<String> estados = new ArrayList<>();
        for(proyecto proyecto:proyectList){
            boolean bandera = false;
            for(int i=0; i<estados.size();i++){
                if(estados.get(i).equals(proyecto.getEstado())){
                    bandera=true;
                }
            }
            if(!bandera){
                estados.add(proyecto.getEstado());
            }
        }
        return new ResponseEntity<>(estados, HttpStatus.OK);
    }
    @GetMapping("/estadosReponsables")
    public ResponseEntity<List<proyecto>> estadoResponsable(){
       List<proyecto> estadosResponsables = repoProyecto.porEstadosResponsables().get();
        return new ResponseEntity<>(estadosResponsables, HttpStatus.OK);
    }
    @GetMapping("/byName")
    public ResponseEntity<List<String>> porNombre(){
        List<proyecto> porNombres = repoProyecto.porNombres().get();
        List<String> nombres = new ArrayList<>();
        for(proyecto pr: porNombres){
            nombres.add(pr.getNombre());
        }
        return new ResponseEntity<>(nombres, HttpStatus.OK);
    }
    @PostMapping("/seguimientoPorUsuario")
    public ResponseEntity<List<seguimientoPorUsuario>> estadoProyecto(@RequestBody proyecto proyecto){
        List<seguimientoPorUsuario> proyectList = serviceProyecto.seguimientoPorUsuario(proyecto);
        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
}
