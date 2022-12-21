package com.example.springprueba.repo;

import com.example.springprueba.model.acceso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepoAcceso extends JpaRepository<acceso, Long> {
    void deleteInmuebleById(Long id);
    Optional<acceso> findInmuebleById(Long id);
}