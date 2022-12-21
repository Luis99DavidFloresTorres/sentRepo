package com.example.springprueba.controller;

import com.example.springprueba.functions.factories.FactoryProveedores;
import com.example.springprueba.model.proveedor;
import com.example.springprueba.repo.RepoProveedor;
import com.example.springprueba.responsesJson.LoginResponse;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/proveedor")
public class ControllerProveedor {
    private final RepoProveedor repoProveedor;
    private final FactoryProveedores factoryProveedores;
    public ControllerProveedor(RepoProveedor repoProveedor, FactoryProveedores factoryProveedores){
        this.repoProveedor = repoProveedor;
        this.factoryProveedores = factoryProveedores;
    }
    @GetMapping("/all")
    public ResponseEntity<List<proveedor>> getAll(){
        List<proveedor> proveedorList = repoProveedor.findAll(Sort.by(Sort.Direction.ASC,"nombre"));
        return new ResponseEntity<>(proveedorList, HttpStatus.OK);
    }
    @PostMapping("/findByName/")
    public ResponseEntity<proveedor> byName(@RequestBody LoginResponse nombre){
        System.out.println(nombre.getRespuesta().length());
        proveedor proveedor = repoProveedor.findByNombre(nombre.getRespuesta()); //en la url se elimina el espacio

        return new ResponseEntity<>(proveedor, HttpStatus.OK);
    }
    /*@GetMapping("/tablas/{nombre}/{fecha1}/{fecha2}/{nombreProveedor}")
    public ResponseEntity<List<?>> tablasConsulta(@PathVariable("nombre") String nombre, @PathVariable("fecha1") LocalDate fecha1, @PathVariable("fecha2") LocalDate fecha2, @PathVariable("nombreProveedor") String nombreProveedor){
        List<?> listaTablaProveedor = this.factoryProveedores.tablas(nombre, fecha1, fecha2, nombreProveedor);
        return new ResponseEntity<>(listaTablaProveedor, HttpStatus.OK);
    }*/
}
