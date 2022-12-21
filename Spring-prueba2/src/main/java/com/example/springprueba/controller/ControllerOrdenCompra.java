package com.example.springprueba.controller;

import com.example.springprueba.functions.factories.FactoryProveedores;
import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoOrdenCompra;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ordencompra")
public class ControllerOrdenCompra {
    private RepoOrdenCompra ordenCompraRepo;
    private  FactoryProveedores factoryProveedores;
    public ControllerOrdenCompra(RepoOrdenCompra repoOrdenCompra, FactoryProveedores factoryProveedores){
        this.ordenCompraRepo=repoOrdenCompra;
        this.factoryProveedores=factoryProveedores;
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<ordencompra>> encontrarTodo(){
        List<ordencompra> ordencompras = ordenCompraRepo.findAll();
        return new ResponseEntity<>(ordencompras, HttpStatus.OK);
    }
}
