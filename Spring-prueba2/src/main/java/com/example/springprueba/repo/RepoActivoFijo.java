package com.example.springprueba.repo;

import com.example.springprueba.model.activoFijo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoActivoFijo extends JpaRepository<activoFijo, Long> {
}
