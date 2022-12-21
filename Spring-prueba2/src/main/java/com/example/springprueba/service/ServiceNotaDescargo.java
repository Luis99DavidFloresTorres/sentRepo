package com.example.springprueba.service;

import com.example.springprueba.model.itemdescargo;
import com.example.springprueba.model.notadescargo;
import com.example.springprueba.repo.RepoItemDescargo;
import com.example.springprueba.repo.RepoNotaDescargo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceNotaDescargo {
    private final RepoNotaDescargo repoNotaDescargo;
    private final RepoItemDescargo repoItemDescargo;
    public ServiceNotaDescargo(RepoNotaDescargo repoNotaDescargo, RepoItemDescargo repoItemDescargo){
        this.repoNotaDescargo = repoNotaDescargo;
        this.repoItemDescargo = repoItemDescargo;
    }
    public double montoTotal(notadescargo notadescargo){
        List<itemdescargo> itemdescargo = repoItemDescargo.findByNotadescargo(notadescargo);
        double montoTotal = 0.0;
        for(itemdescargo it : itemdescargo){
            montoTotal+= it.getPrecio()*it.getPrecio();
        }
        return montoTotal;
    }
}
