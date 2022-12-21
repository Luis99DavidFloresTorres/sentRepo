package com.example.springprueba.controller;

import com.example.springprueba.model.notaasigna;
import com.example.springprueba.repo.RepoNotaAsigna;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/notaasigna")
public class ControllerNotaAsigna {
    private RepoNotaAsigna repoNotaAsigna;
    public ControllerNotaAsigna(RepoNotaAsigna repoNotaAsigna){
        this.repoNotaAsigna = repoNotaAsigna;
    }
    @GetMapping("/notas")
    public ResponseEntity<List<notaasigna>> findAll(){
        List<notaasigna> all = repoNotaAsigna.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
