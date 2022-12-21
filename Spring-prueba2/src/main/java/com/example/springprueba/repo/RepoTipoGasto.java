package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.tipoGasto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepoTipoGasto extends JpaRepository<tipoGasto, Long> {
    Optional<tipoGasto> findTipoGastoById(Long id);
}
