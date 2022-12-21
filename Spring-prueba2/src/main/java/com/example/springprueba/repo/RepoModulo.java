package com.example.springprueba.repo;

import com.example.springprueba.model.modulo;
import com.example.springprueba.model.tipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoModulo extends JpaRepository<modulo, Long> {
}
