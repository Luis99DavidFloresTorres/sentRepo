package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.rubro;
import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.repo.RepoRubro;
import com.example.springprueba.repo.RepoUnidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRubro{
    private final RepoRubro repo;
    @Autowired
    public ServiceRubro(RepoRubro repoI){
        repo = repoI;
    }
    public rubro addRubro(rubro rubrop){

        return  repo.save(rubrop);
    }
    public List<rubro> findAllRubros(){
        return repo.findAll();
    }
    public rubro findbyidRubro(Long id){
        return repo.findRubroById(id).orElseThrow(()-> new ExceptionGeneral("Rubro no encontrado"));
    }
    public rubro editarZona(rubro rubrop){
        return repo.save(rubrop);
    }
}
