package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.rubro;
import com.example.springprueba.model.codificadores.tipoCliente;
import com.example.springprueba.repo.RepoRubro;
import com.example.springprueba.repo.RepoTipoCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTipoCliente{
    private final RepoTipoCliente repo;
    @Autowired
    public ServiceTipoCliente(RepoTipoCliente repoI){
        repo = repoI;
    }
    public tipoCliente addTipoCliente(tipoCliente tipoClientep){

        return  repo.save(tipoClientep);
    }
    public List<tipoCliente> findAllTipoClientes(){
        return repo.findAll();
    }
    public tipoCliente findbyidTipoCliente(Long id){
        return repo.findTipoClienteById(id).orElseThrow(()-> new ExceptionGeneral("Cliente no encontrado"));
    }
    public tipoCliente editarTipoCliente(tipoCliente tipoClientep){
        return repo.save(tipoClientep);
    }
}
