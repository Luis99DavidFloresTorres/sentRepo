package com.example.springprueba.repo;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepoItemProyecto extends JpaRepository<ItemProyecto, Long> {
    @Query(value = "SELECT new com.example.springprueba.model.ItemProyecto(i.id,i.costo) from itemproyecto i")
    List<ItemProyecto> queryCosto();
    @Query(value = "SELECT new com.example.springprueba.model.ItemProyecto(i.id,i.costo, i.cantidad, i.costocompra,i.precioventa) from itemproyecto i")
    List<ItemProyecto> obtenerDatos();
    List<ItemProyecto> findByProducto(producto prod);

    List<ItemProyecto> findByProyecto(proyecto proyecto);
}
