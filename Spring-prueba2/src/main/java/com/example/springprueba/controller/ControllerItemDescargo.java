package com.example.springprueba.controller;

import com.example.springprueba.model.itemdescargo;
import com.example.springprueba.model.notadescargo;
import com.example.springprueba.repo.RepoItemDescargo;
import com.example.springprueba.service.ServiceItemDescargo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/itemdescargo")
public class ControllerItemDescargo {
    private RepoItemDescargo repoItemDescargo;
    private ServiceItemDescargo serviceItemDescargo;
    public ControllerItemDescargo(RepoItemDescargo repoItemDescargo, ServiceItemDescargo serviceItemDescargo){
        this.repoItemDescargo= repoItemDescargo;
        this.serviceItemDescargo= serviceItemDescargo;
    }
    @GetMapping("/buscarNotas")
    public ResponseEntity<List<notadescargo>> findAll(){
        long maximo = repoItemDescargo.count();
        System.out.println(maximo);
        System.out.println(repoItemDescargo.findAll().size());
        List<itemdescargo> itemdescargo = repoItemDescargo.findAll(PageRequest.of( 0,(int) maximo, Sort.by(Sort.Direction.ASC,"notadescargo.id"))).getContent();

        List<notadescargo> sumaTotal =  serviceItemDescargo.sacarSumaTotal(itemdescargo);
        System.out.println(sumaTotal.get(0).getMontoTotal());
        System.out.println(sumaTotal.get(1).getMontoTotal());

        //System.out.println(itemdescargo.get(0).getNotadescargo().getMontoTotal());
        //System.out.println(itemdescargo.get(1).getNotadescargo().getMontoTotal());
        /*Map<String, String> mapPrueba = new HashMap<>();
        for(itemdescargo id: itemdescargo){
                mapPrueba.put(id.getNotadescargo().getResponsable(), id.getDetalle());
        }
        for (Map.Entry<String, String> jugador : mapPrueba.entrySet()){
            String clave = jugador.getKey();
            String valor = jugador.getValue();
            System.out.println(clave+"  ->  "+valor);
        }*/

        return new ResponseEntity<>(sumaTotal, HttpStatus.OK);
    }
    @PostMapping("/findByNotaDescargo")
    public ResponseEntity<List<itemdescargo>> findByNotaDescargo(@RequestBody notadescargo notadescargo){
        List<itemdescargo> itemsPorNotas = repoItemDescargo.findByNotadescargo(notadescargo);
        itemsPorNotas.get(0).getNotadescargo().setMontoTotal(notadescargo.getMontoTotal());
        return new ResponseEntity<>(itemsPorNotas, HttpStatus.OK);
    }
}

