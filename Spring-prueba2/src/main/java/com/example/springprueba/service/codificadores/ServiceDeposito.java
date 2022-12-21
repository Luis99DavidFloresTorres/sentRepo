package com.example.springprueba.service.codificadores;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.deposito;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.repo.RepoPais;
import com.example.springprueba.repo.ReposDeposito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceDeposito{
    private final ReposDeposito repo;
    @Autowired
    public ServiceDeposito(ReposDeposito repoI){
        repo = repoI;
    }
    public deposito addDeposito(deposito depositop){

        return  repo.save(depositop);
    }
    public List<deposito> findAlldepositos(){
        return repo.findAll();
    }
    public deposito findbyidDeposito(Long id){
        return repo.findDepositoById(id).orElseThrow(()-> new ExceptionGeneral("Deposito no encontrado"));
    }
    public List<deposito> findbyNameDeposito(){
        return repo.encontrarNombresDepositos().orElseThrow(()-> new ExceptionGeneral("Error"));
    }
}