package com.example.springprueba.controller;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.nuevo.SerialesBuscar;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/nuevo")
public class ControllerNuevo {
    SerialesBuscar s ;
    public ControllerNuevo(SerialesBuscar s){
        this.s = s;
    }
    @GetMapping("/A")
    public ResponseEntity<List<itemProducto>> seri(){
        List<String> b = new ArrayList<>();
        b.add("7K063B2PAXD0D9A");
        b.add("732105500025");
        List<itemProducto> m = s.tablaHash(b);
        return new ResponseEntity<>(m, HttpStatus.OK);
    }
}
