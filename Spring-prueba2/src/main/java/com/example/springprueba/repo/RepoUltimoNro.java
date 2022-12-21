package com.example.springprueba.repo;

import com.example.springprueba.model.Ultimonro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoUltimoNro extends JpaRepository<Ultimonro, Long> {
}
