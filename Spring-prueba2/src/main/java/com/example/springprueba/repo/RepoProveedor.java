package com.example.springprueba.repo;

import com.example.springprueba.model.proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoProveedor extends JpaRepository<proveedor,Long> {
    proveedor findByNombre(String nombre);
}
