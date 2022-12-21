package com.example.springprueba.repo;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.model.producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RepoItemCompra extends JpaRepository<itemcompra, Long> {
    List<itemcompra> findByOrdencompra(ordencompra ordencompra);

    List<itemcompra> findByProducto(producto producto);
    @Query(value = "SELECT new com.example.springprueba.model.itemcompra(oc,ic.precio, (ic.precio*ic.cantidad)) from itemcompra ic inner join ordencompra oc on ic.ordencompra.id = oc.id where oc.proveedor.nombre= :nombre order by oc.nrodoc asc")
    List<itemcompra> byProveedor(@Param("nombre") String nombre);
    @Query(value = "SELECT new com.example.springprueba.model.itemcompra(oc,ic.precio, (ic.precio*ic.cantidad),ic.cantidad, pr) from itemcompra ic inner join ordencompra oc on ic.ordencompra.id = oc.id inner join producto pr on ic.producto.id = pr.id where oc.proveedor.nombre= :nombre order by oc.nrodoc asc")
    List<itemcompra> productoOrdenCompra(@Param("nombre") String nombre);
    @Query(value = "SELECT new com.example.springprueba.model.itemcompra(oc, sum(ic.precio*ic.cantidad)) from itemcompra ic inner join ordencompra oc on ic.ordencompra.id = oc.id inner join producto pr on ic.producto.id = pr.id where oc.fecha <= :fechaHasta and oc.fecha >= :fechaDesde group by oc.id order by oc.nrodoc desc")
    List<itemcompra> entre2Fechas(@Param("fechaHasta") Date fechaHasta, @Param("fechaDesde") Date fechaDesde);

}
