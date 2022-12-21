package com.example.springprueba.repo;

import com.example.springprueba.model.Usuario;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.producto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Date;
import java.util.List;

public interface RepoItemnotaventa extends JpaRepository<itemnotaventa, Long> {
    List<itemnotaventa> findByNotaventa(notaventa notaventa);
    List<itemnotaventa> findByProducto(producto producto);
    @Query(value = "select new com.example.springprueba.model.itemnotaventa(it.subtotal, it.producto.costo, it.notaventa, it.cantidad) from itemventa it ")
    List<itemnotaventa> sumaPrecioTotalItems();
    @Query(value = "select new com.example.springprueba.model.itemnotaventa(it.subtotal, it.producto, it.notaventa, it.cantidad, it.precio) from itemventa it group by it.subtotal,it.producto.id, it.notaventa.id, it.cantidad,it.precio ")
    List<itemnotaventa> ventasPorProducto();
    /*@Query(value = "select new com.example.springprueba.model.itemnotaventa(sum(it.subtotal), it.producto, it.notaventa) from itemventa it inner join notaventa nt on it.notaventa.id = nt.id where nt.empleado.id=:empleadoid and nt.fecha >=:fechaInicio and nt.fecha<=:fechaFinal group by it.notaventa, it.producto.costo, it.cantidad, it.descto order by it.notaventa.id desc")
    List<itemnotaventa> buscarPorUsuarioFechas(@Param("empleadoid") Integer empleadoId, @Param("fechaInicio")Date fechaInicio, @Param("fechaFinal") Date fechaFinal);*/
    @Query(value = "select new com.example.springprueba.model.itemnotaventa(sum(it.subtotal), it.producto.costo, it.notaventa, it.cantidad, it.cantidadpend) from itemventa it where it.notaventa.usuario= :empleado and it.notaventa.fecha >= :fechaInicio and it.notaventa.fecha<= :fechaFinal group by it.notaventa.id, it.producto.costo, it.cantidad, it.descto, it.cantidadpend order by it.notaventa.id desc")
    List<itemnotaventa> buscarPorUsuarioFechas(@Param("empleado") Usuario empleado, @Param("fechaInicio") Date fechaInicio, @Param("fechaFinal") Date fechaFinal);
}
