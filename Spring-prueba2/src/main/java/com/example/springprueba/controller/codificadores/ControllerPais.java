package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.repo.RepoPais;
import com.example.springprueba.service.codificadores.ServicePais;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pais")
public class ControllerPais {
    private final ServicePais servicePais;
    private final RepoPais repoPais;
    public ControllerPais(ServicePais servicePais, RepoPais repoPais) {
        this.servicePais = servicePais;
        this.repoPais = repoPais;
    }
    @GetMapping
    public ResponseEntity<List<pais>> getPaises(){
        List<pais> paisList = servicePais.findAllpaises();
        return new ResponseEntity<>(paisList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<pais> getPaisId(@PathVariable("id") Long id){
        pais paisR = servicePais.findbyidPais(id);
        return new ResponseEntity<>(paisR, HttpStatus.OK);
    }
    @PostMapping(path = "/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Long id){
        pais pais = this.repoPais.findPaisById(id).get();
        this.repoPais.delete(pais);
        return new ResponseEntity<>("exito", HttpStatus.OK);
    }
    @GetMapping(path = "/nombres")
    public ResponseEntity<List> getPaisNombres(){
        ArrayList<String> pais = new ArrayList<>();
        //List<String> paisNombres = servicePais.findByNames();
       /* ArrayList<paisNombre> pais = new ArrayList<>();
        servicePais.findAllpaises().forEach((dato)-> {
            paisNombre paisNombre = new paisNombre();
            paisNombre.setNombre(dato.getNombre());
            pais.add(paisNombre);
        });*/
        servicePais.findAllpaises().forEach((dato)-> {
            pais.add(dato.getNombre());
        });
        return new ResponseEntity<>(pais, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<pais> addPaises(@RequestBody pais paisp){
        pais paisG = servicePais.addPais(paisp);
        return new ResponseEntity(paisG, HttpStatus.CREATED);
    }
}
