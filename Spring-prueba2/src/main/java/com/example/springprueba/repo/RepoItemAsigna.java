package com.example.springprueba.repo;

import com.example.springprueba.model.itemasigna;
import com.example.springprueba.model.notaasigna;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoItemAsigna extends JpaRepository<itemasigna,Long> {
    List<itemasigna> findByNotaasigna(notaasigna notaasigna) ;
}
