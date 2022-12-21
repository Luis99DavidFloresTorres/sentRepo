package com.example.springprueba.service;

import com.example.springprueba.model.itemdescargo;
import com.example.springprueba.model.notadescargo;
import com.example.springprueba.repo.RepoItemDescargo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceItemDescargo {
    private RepoItemDescargo repoItemDescargo;
    public ServiceItemDescargo(RepoItemDescargo repoItemDescargo){
        this.repoItemDescargo = repoItemDescargo;
    }
    public List<notadescargo> sacarSumaTotal(List<itemdescargo> listItemDescargo){
        double acumulador = 0;
        long id = listItemDescargo.get(0).getNotadescargo().getId();
        List<notadescargo> listanotadescargo = new ArrayList<>();
        for(int i = 0; i<listItemDescargo.size();i++){

            long idFor = listItemDescargo.get(i).getNotadescargo().getId();
            if(id == idFor){
                acumulador+= listItemDescargo.get(i).getMonto();

            }else{
                listItemDescargo.get(i-1).getNotadescargo().setMontoTotal(acumulador);

                listanotadescargo.add(listItemDescargo.get(i-1).getNotadescargo());
                acumulador = listItemDescargo.get(i).getMonto();
                id = idFor;
            }
            if(listItemDescargo.get(listItemDescargo.size()-1).equals(listItemDescargo.get(i))){

                listItemDescargo.get(i).getNotadescargo().setMontoTotal(acumulador);
                listanotadescargo.add(listItemDescargo.get(i).getNotadescargo());
            }
        }
        return listanotadescargo;
    }
}
