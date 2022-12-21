package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.service.codificadores.ServiceUnidad;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unidad")
public class ControllerUnidad {
    private final ServiceUnidad serviceAcceso;
    public ControllerUnidad(ServiceUnidad serviceUnidad){
        this.serviceAcceso = serviceUnidad;
    }
    @GetMapping
    public ResponseEntity<List<unidades>> getUnidades(){
        List<unidades> unidadList = serviceAcceso.findAllUnidades();

        return new ResponseEntity<>(unidadList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<unidades> getUnidadesId(@PathVariable("id") Long id){
        unidades unidadList = serviceAcceso.findbyidUnidades(id);
        System.out.println(unidadList);
        return new ResponseEntity<>(unidadList, HttpStatus.OK);
    }
   /* @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path = "/find")
    public ResponseEntity<List<zonaCiudad>> getInfo(){
        List<zonaCiudad> infoList = serviceAcceso.findAllInfo();

        return new ResponseEntity<>(infoList, HttpStatus.OK);
    }*/
    @PostMapping("/add")
    public ResponseEntity<List<unidades>> addUnidades(@RequestBody unidades unidadp){
        unidades zonaG = serviceAcceso.addUnidad(unidadp);
        return new ResponseEntity(zonaG, HttpStatus.CREATED);
    }
}
