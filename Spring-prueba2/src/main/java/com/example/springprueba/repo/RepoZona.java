package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepoZona extends JpaRepository<zona, Long> {
    Optional<zona> findZonaById(Long id);

    @Query("SELECT new com.example.springprueba.model.codificadores.zona(z.id,z.codigo, z.nombre,z.ciudad) from zona z join ciudad c on z.ciudad.id = c.id")
    List<zona> ObtenerInfo();
}
