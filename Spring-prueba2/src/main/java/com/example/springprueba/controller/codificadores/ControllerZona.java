package com.example.springprueba.controller.codificadores;

import com.example.springprueba.model.acceso;
import com.example.springprueba.model.codificadores.ciudad;
import com.example.springprueba.model.codificadores.zona;
import com.example.springprueba.repo.RepoCiudad;
import com.example.springprueba.service.codificadores.ServiceCiudad;
import com.example.springprueba.service.codificadores.ServiceZona;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/zona")
public class ControllerZona {
    private final ServiceZona serviceZona;
    private final RepoCiudad repoCiudad;
    public ControllerZona(ServiceZona serviceZona, RepoCiudad repoCiudad){
        this.serviceZona = serviceZona;
        this.repoCiudad = repoCiudad;
    }
    @GetMapping
    public ResponseEntity<List<zona>> getInmuebles(){
        List<zona> zonaList = serviceZona.findAllZonas();
        System.out.println(zonaList);
        return new ResponseEntity<>(zonaList, HttpStatus.OK);
    }
    @GetMapping(path = "/find")
    public ResponseEntity<List<zona>> getInfo(){
        List<zona> infoList = serviceZona.findAllInfo();
        return new ResponseEntity<>(infoList, HttpStatus.OK);
    }
    @GetMapping(path = "/findByIdZona/{id}")
    public ResponseEntity<zona> getId(@PathVariable("id") Long id){
        zona zona = serviceZona.findbyidZona(id);

        return new ResponseEntity<>(zona, HttpStatus.OK);
    }
   // @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/add")
    public ResponseEntity<zona> addInmuebles(@RequestBody zona zonap){
        String buscar = zonap.getCiudad().getNombre();

        ciudad ciudad = repoCiudad.findByNombre(buscar);
        zonap.setCiudad(ciudad);
        zona zonaG = serviceZona.addZona(zonap);
        return new ResponseEntity(zonaG, HttpStatus.CREATED);
    }
    @PostMapping("/editar")
    public ResponseEntity<zona> editar(@RequestBody zona zona) throws IOException {
        //  MultipartFile imagen = productop.getImagen();

        String buscar = zona.getCiudad().getNombre();

        ciudad ciudad = repoCiudad.findByNombre(buscar);
        zona.setCiudad(ciudad);

        zona zonaG = serviceZona.editarZona(zona);
        return new ResponseEntity(zonaG, HttpStatus.CREATED);
    }
}
