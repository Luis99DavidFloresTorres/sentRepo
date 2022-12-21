package com.example.springprueba.service;
import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.acceso;
import com.example.springprueba.repo.RepoAcceso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ServiceAcceso {
    private final RepoAcceso repo;
    @Autowired
    public ServiceAcceso(RepoAcceso repoI){
        repo = repoI;
    }
    public acceso addAcceso(acceso acceso){

        return  repo.save(acceso);
    }
    public List<acceso> findAllAccesos(){
        return repo.findAll();
    }
    public acceso findbyidInmueble(Long id){
        return repo.findInmuebleById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }
    public acceso editarZona(acceso inmueble){
        return repo.save(inmueble);
    }
}