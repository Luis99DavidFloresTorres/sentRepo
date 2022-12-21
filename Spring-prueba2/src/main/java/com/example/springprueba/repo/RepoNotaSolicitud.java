package com.example.springprueba.repo;

import com.example.springprueba.model.notasolicitud;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoNotaSolicitud extends JpaRepository<notasolicitud, Long> {
}
