package com.example.springprueba.repo;

import com.example.springprueba.model.codificadores.deposito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReposDeposito extends JpaRepository<deposito, Long> {
    Optional<deposito> findDepositoById(Long id);
    @Query(value = "SELECT new com.example.springprueba.model.codificadores.deposito(de.nombre) from deposito de")
    Optional<List<deposito>> encontrarNombresDepositos();

    deposito findByNombre(String nombre);
}
