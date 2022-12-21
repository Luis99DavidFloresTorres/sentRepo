package com.example.springprueba.repo;

import com.example.springprueba.model.ItemCotizProducto;
import com.example.springprueba.model.cotizProducto;
import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepoItemCotizProd extends JpaRepository<ItemCotizProducto, Long> {
    @Query(value = "SELECT new com.example.springprueba.model.ItemCotizProducto(co,pr, ic.precio, ic.cantidad) from itemcotizprod ic inner join cotizproducto co on ic.cotizProducto.id = co.id inner join producto pr on ic.producto.id = pr.id where co.proveedor= :proveedor order by co.nrodoc asc")
    List<ItemCotizProducto> byProveedor(@Param("proveedor") proveedor proveedor);
    List<ItemCotizProducto> findByCotizProducto(cotizProducto c);
}
