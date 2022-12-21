package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.repo.RepoPais;
import com.example.springprueba.repo.RepoUnidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicePais{
    private final RepoPais repo;
    @Autowired
    public ServicePais(RepoPais repoI){
        repo = repoI;
    }
    public pais addPais(pais paisp){

        return  repo.save(paisp);
    }
    public List<pais> findAllpaises(){
        return repo.findAll();
    }
    public pais findbyidPais(Long id){
        return repo.findPaisById(id).orElseThrow(()-> new ExceptionGeneral("Pais no encontrado"));
    }
    public List<String> findByNames(){
        return repo.nombrePaises().orElseThrow(()-> new ExceptionGeneral("Hubo un error inesperado"));
    }
}