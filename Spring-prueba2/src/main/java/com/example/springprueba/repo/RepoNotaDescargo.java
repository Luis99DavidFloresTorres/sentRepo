package com.example.springprueba.repo;

import com.example.springprueba.model.notadescargo;
import com.example.springprueba.model.proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoNotaDescargo extends JpaRepository<notadescargo,Long> {
    List<notadescargo> findBySolicitud(Integer id);
    List<notadescargo> findByProyecto(proyecto proyecto);
}
