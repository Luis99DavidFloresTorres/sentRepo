package com.example.springprueba.controller;

import com.example.springprueba.model.Proyecto_productopadre;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
/*@RestController
@RequestMapping("/api/productoPadre")
public class ControllerProductoPadre {
    private RepoProductoPadre repoProductoPadre;
    public ControllerProductoPadre(RepoProductoPadre repoProductoPadre){
        this.repoProductoPadre = repoProductoPadre;
    }
    @GetMapping("/obtener")
    public ResponseEntity<List<Proyecto_productopadre>> obtener(){
        List<Proyecto_productopadre> producto_padreList = repoProductoPadre.findAll();
        return new ResponseEntity<>(producto_padreList, HttpStatus.OK);
    }
}*/
