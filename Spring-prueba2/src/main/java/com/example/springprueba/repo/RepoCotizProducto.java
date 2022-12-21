package com.example.springprueba.repo;

import com.example.springprueba.model.cotizProducto;
import com.example.springprueba.model.proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoCotizProducto extends JpaRepository<cotizProducto, Long> {
    List<cotizProducto> findByProveedor(proveedor proveedor);
}
