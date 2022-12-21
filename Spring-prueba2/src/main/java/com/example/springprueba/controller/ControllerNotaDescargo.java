package com.example.springprueba.controller;

import com.example.springprueba.model.notaasigna;
import com.example.springprueba.model.notadescargo;
import com.example.springprueba.repo.RepoNotaAsigna;
import com.example.springprueba.repo.RepoNotaDescargo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notadescargo")
public class ControllerNotaDescargo {
    private RepoNotaDescargo repoNotaDescargo;
    public ControllerNotaDescargo(RepoNotaDescargo repoNotaDescargo){
        this.repoNotaDescargo = repoNotaDescargo;
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<notadescargo>> findAll(){
        List<notadescargo> all = repoNotaDescargo.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
