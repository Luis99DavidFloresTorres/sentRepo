package com.example.springprueba.repo;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.cotizacion;
import com.example.springprueba.model.proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoCotizacion extends JpaRepository<cotizacion, Long> {
    List<cotizacion> findByCliente(cliente cliente);
    List<cotizacion> findByProyecto(proyecto proyecto);
}
