package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.ciudad;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.repo.RepoPais;
import com.example.springprueba.service.codificadores.ServiceCiudad;
import com.example.springprueba.service.codificadores.ServicePais;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ciudad")
public class ControllerCiudad {
    private final ServiceCiudad serviceCiudad;
    private final RepoPais repoPais;
    public ControllerCiudad(ServiceCiudad servicePais, RepoPais repoPais){
        this.serviceCiudad = servicePais;
        this.repoPais = repoPais;
    }
    @GetMapping
    public ResponseEntity<List<ciudad>> getPaises(){
        List<ciudad> paisList = serviceCiudad.findAllciudades();
        return new ResponseEntity<>(paisList, HttpStatus.OK);
    }
      @GetMapping(path = "/byId/{id}")
      public ResponseEntity<ciudad> getPaisId(@PathVariable("id") Long id){
          ciudad ciudadR = serviceCiudad.findbyidCiudad(id);
          return new ResponseEntity<>(ciudadR, HttpStatus.OK);
      }
    @PostMapping("/add")
    public ResponseEntity<ciudad> addPaises(@RequestBody ciudad ciudadp){
        pais pais = repoPais.findByNombre(ciudadp.getPais().getNombre());
        ciudadp.setPais(pais);
        ciudad ciudadG = serviceCiudad.addPais(ciudadp);
        return new ResponseEntity(ciudadG, HttpStatus.CREATED);
    }

}
