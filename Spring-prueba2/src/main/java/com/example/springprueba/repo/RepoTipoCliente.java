package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.tipoCliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepoTipoCliente extends JpaRepository<tipoCliente, Long> {
    Optional<tipoCliente> findTipoClienteById(Long id);
}
