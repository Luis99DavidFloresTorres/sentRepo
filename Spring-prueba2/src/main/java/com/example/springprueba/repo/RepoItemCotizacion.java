package com.example.springprueba.repo;

import com.example.springprueba.model.itemCotizacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoItemCotizacion extends JpaRepository<itemCotizacion, Long> {
}
