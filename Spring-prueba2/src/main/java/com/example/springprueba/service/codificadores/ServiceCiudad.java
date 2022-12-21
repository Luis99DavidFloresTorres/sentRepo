package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.ciudad;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.repo.RepoCiudad;
import com.example.springprueba.repo.RepoPais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCiudad{
    private final RepoCiudad repo;
    @Autowired
    public ServiceCiudad(RepoCiudad repoI){
        repo = repoI;
    }
    public ciudad addPais(ciudad ciudadp){
        ciudad ciudad =  repo.save(ciudadp);
        return ciudad;
    }

    public List<ciudad> findAllciudades(){
        return repo.findAll();
    }
    public ciudad findbyidCiudad(Long id){
        return repo.findCiudadById(id).orElseThrow(()-> new ExceptionGeneral("Pais no encontrado"));
    }
}