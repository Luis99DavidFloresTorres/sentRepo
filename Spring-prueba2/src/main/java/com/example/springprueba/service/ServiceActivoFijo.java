package com.example.springprueba.service;

import com.example.springprueba.model.activoFijo;
import com.example.springprueba.repo.RepoActivoFijo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceActivoFijo {
    private RepoActivoFijo repoActivoFijo;
    @Autowired
    public ServiceActivoFijo(RepoActivoFijo repoActivoFijo){
        this.repoActivoFijo =repoActivoFijo;
    }
    public List<activoFijo> ordenarPorNombre(){
        long maximo = repoActivoFijo.count();
        List<activoFijo> ordenadoNombre = repoActivoFijo.findAll(PageRequest.of( 0,(int) maximo,Sort.by(Sort.Direction.ASC,"nombre"))).getContent();
        return ordenadoNombre;
    }
}
