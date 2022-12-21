package com.example.springprueba.service;

import com.example.springprueba.model.activoFijo;
import com.example.springprueba.repo.RepoActivoFijo;
import com.example.springprueba.repo.RepoCotizacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceCotizacion {
    private RepoCotizacion repoCotizacion;
    @Autowired
    public ServiceCotizacion(RepoCotizacion repoCotizacion){
        this.repoCotizacion =repoCotizacion;
    }

}
