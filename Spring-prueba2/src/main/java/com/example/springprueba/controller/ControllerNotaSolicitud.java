package com.example.springprueba.controller;

import com.example.springprueba.model.itemdescargo;
import com.example.springprueba.model.notadescargo;
import com.example.springprueba.model.notasolicitud;
import com.example.springprueba.repo.RepoItemDescargo;
import com.example.springprueba.repo.RepoNotaDescargo;
import com.example.springprueba.repo.RepoNotaSolicitud;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/notasolicitud")
public class ControllerNotaSolicitud {
    public RepoNotaSolicitud repoNotaSolicitud;
    public RepoNotaDescargo repoNotadescargo;
    public RepoItemDescargo repoItemDescargo;
    public ControllerNotaSolicitud(RepoNotaSolicitud repoNotaSolicitud, RepoNotaDescargo repoNotadescargo, RepoItemDescargo repoItemDescargo) {
        this.repoNotaSolicitud = repoNotaSolicitud;
        this.repoNotadescargo = repoNotadescargo;
        this.repoItemDescargo = repoItemDescargo;
    }
   /* @GetMapping(value="/obtenerNotaSolicitud/{id}")
    public ResponseEntity<notasolicitud> notasolicitud(){
        notasolicitud notasolicitud = repoNotaSolicitud.findById()
    }*/
    @GetMapping("/findAll")
    public ResponseEntity<List<notasolicitud>> findAll(){
        List<notasolicitud> findAll = repoNotaSolicitud.findAll();
        return new ResponseEntity<>(findAll, HttpStatus.OK);
    }
    @GetMapping("/entreFechas/{fechaInicio}/{fechaFinal}")
    public ResponseEntity<List<notasolicitud>> findBetween2Date(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal){
        List<notasolicitud> findAll = repoNotaSolicitud.findAll();
        List<notasolicitud> entreFechas = new ArrayList<>();
        for(notasolicitud n : findAll){
            Date fecha = n.getFecha();
            if((fecha.before(fechaFinal) || fechaFinal.equals(fecha)) && (fecha.after(fechaInicio) || fechaInicio.equals(fecha))){
                entreFechas.add(n);
            }
        }
        return new ResponseEntity<>(entreFechas, HttpStatus.OK);
    }
    @GetMapping("/entreFechasCliente/{fechaInicio}/{fechaFinal}/{nombreResponsable}")
    public ResponseEntity<List<notasolicitud>> findBetween2Date(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal, @PathVariable("nombreResponsable") String nombreResponsable){
        List<notasolicitud> findAll = repoNotaSolicitud.findAll();
        List<notasolicitud> entreFechasCliente = new ArrayList<>();
        for(notasolicitud n : findAll){
            Date fecha = n.getFecha();
            if((fecha.before(fechaFinal) || fechaFinal.equals(fecha)) && (fecha.after(fechaInicio) || fechaInicio.equals(fecha)) && (nombreResponsable.equals(n.getUseract()))){
                List<notadescargo> descargo = repoNotadescargo.findBySolicitud(n.getNrodoc());
                n.setMontodescargo(0.0);
                for(notadescargo nt: descargo){
                    /*if(!Objects.isNull(nt.getMontosol())){
                        n.setMontodescargo(n.getMontodescargo()+nt.getMontosol());
                    }*/

                    List<itemdescargo> itdModel = repoItemDescargo.findByNotadescargo(nt);
                    double sumar = 0;
                    for(itemdescargo itd : itdModel){
                        sumar += itd.getMonto();
                    }
                    n.setMontodescargo(n.getMontodescargo()+sumar);
                }

                entreFechasCliente.add(n);
            }
        }
        return new ResponseEntity<>(entreFechasCliente, HttpStatus.OK);
    }
}
