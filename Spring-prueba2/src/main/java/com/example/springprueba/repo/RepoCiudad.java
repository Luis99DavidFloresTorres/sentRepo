package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepoCiudad extends JpaRepository<ciudad, Long> {
    Optional<ciudad> findCiudadById(Long id);
    ciudad findByNombre(String nombre);
}
