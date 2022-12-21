package com.example.springprueba.controller;

import com.example.springprueba.model.itemasigna;
import com.example.springprueba.model.notaasigna;
import com.example.springprueba.repo.RepoItemAsigna;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/itemasigna")
public class ControlleItemAsigna {
    private RepoItemAsigna repoItemAsigna;
    public ControlleItemAsigna(RepoItemAsigna repoItemAsigna) {
        this.repoItemAsigna = repoItemAsigna;
    }
    @PostMapping("/porNota")
    public ResponseEntity<List<itemasigna>> porNota(@RequestBody notaasigna notaasigna){
        List<itemasigna> porNotaLista = repoItemAsigna.findByNotaasigna(notaasigna);
        return new ResponseEntity(porNotaLista, HttpStatus.OK);
    }
}
