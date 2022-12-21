package com.example.springprueba.repo;

import com.example.springprueba.model.derechos;
import com.example.springprueba.model.tipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoDerechos extends JpaRepository<derechos, Long> {
    List<derechos> findByTipoUsuario(tipoUsuario tipoUsuario);
}
