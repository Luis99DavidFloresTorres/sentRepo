package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.rubro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepoRubro extends JpaRepository<rubro, Long> {
    Optional<rubro> findRubroById(Long id);
}
