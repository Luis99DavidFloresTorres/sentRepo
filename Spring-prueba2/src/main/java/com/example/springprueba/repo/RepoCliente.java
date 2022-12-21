package com.example.springprueba.repo;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.notaventa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoCliente extends JpaRepository<cliente, Long> {
    cliente findByNombre(String nombre);

}
