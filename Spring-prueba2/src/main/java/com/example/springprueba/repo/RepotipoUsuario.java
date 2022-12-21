package com.example.springprueba.repo;

import com.example.springprueba.model.tipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepotipoUsuario extends JpaRepository<tipoUsuario, Long> {
}
