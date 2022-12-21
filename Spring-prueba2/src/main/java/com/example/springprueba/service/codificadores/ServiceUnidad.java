package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.repo.RepoUnidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceUnidad{
    private final RepoUnidad repo;
    @Autowired
    public ServiceUnidad(RepoUnidad repoI){
        repo = repoI;
    }
    public unidades addUnidad(unidades unidadp){

        return  repo.save(unidadp);
    }
    public List<unidades> findAllUnidades(){
        return repo.findAll();
    }
    public unidades findbyidUnidades(Long id){
        return repo.findUnidadById(id).orElseThrow(()-> new ExceptionGeneral("Unidad no encontrada"));
    }
    public unidades editarZona(unidades unidadp){
        return repo.save(unidadp);
    }
    public unidades findbyName(String nombre){
        return repo.findUnidadesbyName(nombre);
    }
}
