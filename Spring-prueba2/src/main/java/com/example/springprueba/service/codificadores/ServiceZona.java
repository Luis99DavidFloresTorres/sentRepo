package com.example.springprueba.service.codificadores;


import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.zona;
import com.example.springprueba.repo.RepoZona;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceZona {
    private final RepoZona repo;
    @Autowired
    public ServiceZona(RepoZona repoI){
        repo = repoI;
    }
    public zona addZona(zona zonaP){
        return  repo.save(zonaP);
    }
    public List<zona> findAllZonas(){
        return repo.findAll();
    }
    public zona findbyidZona(Long id){
        return repo.findZonaById(id).orElseThrow(()-> new ExceptionGeneral("Zona no encontrada"));
    }
    public List<zona> findAllInfo(){
        return repo.ObtenerInfo();
    }
    public zona editarZona(zona zonap){
        return repo.save(zonap);
    }
}