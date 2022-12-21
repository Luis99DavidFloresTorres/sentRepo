package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.unidades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RepoUnidad extends JpaRepository<unidades, Long> {
    Optional<unidades> findUnidadById(Long id);
    @Query(value = "SELECT new com.example.springprueba.model.codificadores.unidades(u.id,u.codigo,u.nombre) from unidad u where u.nombre=?1")
    unidades findUnidadesbyName(String nombre);
}