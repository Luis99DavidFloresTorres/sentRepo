package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.tipoCliente;
import com.example.springprueba.model.codificadores.tipoGasto;
import com.example.springprueba.repo.RepoTipoCliente;
import com.example.springprueba.repo.RepoTipoGasto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTipoGasto{
    private final RepoTipoGasto repo;
    @Autowired
    public ServiceTipoGasto(RepoTipoGasto repoI){
        repo = repoI;
    }
    public tipoGasto addTipoGasto(tipoGasto tipoGastop){

        return  repo.save(tipoGastop);
    }
    public List<tipoGasto> findAllTipoGastos(){
        return repo.findAll();
    }
    public tipoGasto findbyidTipoGasto(Long id){
        return repo.findTipoGastoById(id).orElseThrow(()-> new ExceptionGeneral("Gasto no encontrado"));
    }
    public tipoGasto editarTipoGasto(tipoGasto tipoGastop){
        return repo.save(tipoGastop);
    }
}