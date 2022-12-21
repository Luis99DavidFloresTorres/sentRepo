package com.example.springprueba.service;

import com.example.springprueba.model.Ultimonro;
import com.example.springprueba.repo.RepoUltimoNro;
import org.springframework.stereotype.Service;

@Service
public class ServiceUltimoNro {
    private final RepoUltimoNro repoUltimoNro;
    public ServiceUltimoNro(RepoUltimoNro repoUltimoNro) {
        this.repoUltimoNro = repoUltimoNro;
    }
    public void insertarAlmacenUltimoNro(int operacion, int nrodoc){
        if(operacion < 320){
            long id = 4;
            Ultimonro ultimoNro = repoUltimoNro.findById(id).get();
            int nrodocBaseDatos = ultimoNro.getNrodoc();
            if(nrodoc>nrodocBaseDatos){
                ultimoNro.setNrodoc(nrodoc);
                repoUltimoNro.save(ultimoNro);
            }
        }
        if(operacion>320){
            long id = 5;
            Ultimonro ultimoNro = repoUltimoNro.findById(id).get();
            int nrodocBaseDatos = ultimoNro.getNrodoc();
            if(nrodoc>nrodocBaseDatos){
                ultimoNro.setNrodoc(nrodoc);
                repoUltimoNro.save(ultimoNro);
            }
        }
    }
}
