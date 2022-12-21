package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.pais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepoPais extends JpaRepository<pais, Long> {
    Optional<pais> findPaisById(Long id);
    @Query("SELECT new pais(p.nombre) from pais p")
    Optional<List<String>> nombrePaises();
    pais findByNombre(String nombre);
}
