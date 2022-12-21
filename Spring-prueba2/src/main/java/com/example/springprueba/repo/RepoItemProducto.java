package com.example.springprueba.repo;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.transactionProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RepoItemProducto extends JpaRepository<itemProducto, Long> {

    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(i.id,i.serial,i.costome,i.costo,pr.salidas,pr.ingresos,pr.invinicial,pr.codigo,pr.nombre, u.nombre) from itemproducto i inner join producto pr on i.producto.id = pr.id inner join unidad u on pr.unidad.id = u.id inner join transproducto tr on i.transproducto.id= tr.id order by tr.fecha")
    List<itemProducto> obtenerItems();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(p.codigo, p.nombre,p.unidad.nombre,ip.cantidad, trns.oper,p.salidas, p.ingresos) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto trns on ip.transproducto.id = trns.id")
    List<itemProducto> findProductoPeriodo();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,ip.cantidad,ip.producto , ip.transproducto, p.codigo, p.id,p.nombre,p.unidad.nombre, ip.costo) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto tr on ip.transproducto.id= tr.id order by p.id asc, tr.fecha asc")//se ordena por id
    List<itemProducto> findByIdProducto();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha,ip.cantidad,ip.producto , tr.nrodoc, tr.oper, tr.detalle , p.codigo, p.id,p.nombre,p.unidad.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto tr on ip.transproducto.id= tr.id inner join deposito de on tr.deposito.id = de.id where de.nombre=?1 order by p.id asc, tr.fecha asc")//se ordena por id
    List<itemProducto> obtenerProductosPorDepositos(String depositoNombre);
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id order by p.id asc, tr.fecha asc")//se ordena por id
    List<itemProducto> kardexProducto();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id where p.nombre=?1 order by tr.fecha asc")//se ordena por id
    List<itemProducto> kardexProductoByName(String nombre);
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id where p=?1 order by p.id asc, tr.fecha asc")//se ordena por id
    List<itemProducto> kardexModelProducto(producto producto);
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.proveedor.nombre,tr.fecha, tr.nrodoc, tr.oper,tr.detalle,  ip.cantidad,ip.serial, p.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join proveedor prov on tr.proveedor.id = prov.id order by p.id asc")//se ordena por id
    List<itemProducto>  mayorIngresos();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc,cli.nombre, tr.oper,tr.detalle,  ip.cantidad,ip.serial, p.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join cliente cli on tr.cliente.id = cli.id order by p.id asc")//se ordena por id
    List<itemProducto>  mayorSalidas();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.proveedor.nombre,tr.fecha, tr.nrodoc, tr.oper,tr.detalle,  ip.cantidad,ip.serial, p.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join proveedor prov on tr.proveedor.id = prov.id inner join deposito de on tr.deposito.id = de.id order by p.id asc")//se ordena por id
    List<itemProducto>  depositoMayorIngresos();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc,cli.nombre, tr.oper,tr.detalle,  ip.cantidad,ip.serial, p.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join cliente cli on tr.cliente.id = cli.id inner join deposito de on tr.deposito.id = de.id order by p.id asc")//se ordena por id
    List<itemProducto>  depositoMayorSalidas();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,p.codigo,tr.fecha, tr.nrodoc, tr.oper,p.unidad.nombre,  ip.cantidad,ip.serial, p.nombre, de.nombre,de.codigo) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join proveedor prov on tr.proveedor.id = prov.id inner join deposito de on tr.deposito.id = de.id order by p.id asc")//se ordena por id
    List<itemProducto>  depositoOperaciones();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join deposito de on tr.deposito.id = de.id order by p.id asc, tr.fecha asc")//se ordena por id
    List<itemProducto> depositokardexProducto();
    @Query(value = "SELECT new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join deposito de on tr.deposito.id = de.id where p.nombre=?1 and de.nombre=?2 order by tr.fecha asc")//se ordena por id
    List<itemProducto> depositokardexProductoByName(String nombre,String nombreDeposito);
    @Query(value = "select distinct  new com.example.springprueba.model.itemProducto(it.producto.id, pr.nombre) from itemproducto it inner join producto pr on it.producto.id = pr.id order by it.producto.id asc ")
    List<itemProducto> productosWithMov();
    @Query(value = "select new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre, de.nombre) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join deposito de on tr.deposito.id = de.id  order by tr.fecha desc")
    List<itemProducto> primeros1000fechas(Pageable pageable);
    @Query(value = "select new com.example.springprueba.model.itemProducto(ip.id,tr.fecha, tr.nrodoc, tr.oper, tr.detalle, ip.serial, ip.costo, ip.cantidad,p.id, p.codigo, p.nombre, de.nombre, ip.transproducto) from itemproducto ip inner join producto p on ip.producto.id = p.id inner join transproducto  tr on ip.transproducto.id = tr.id inner join deposito de on tr.deposito.id = de.id ")
    List<itemProducto> primeros1000fechasDeposito(Pageable pageable);
    @Query(value = "select new com.example.springprueba.model.itemProducto( ip.transproducto, (ip.cantidad*ip.costo), pr,ip.cantidad, ip.costo) from itemproducto ip inner join transproducto  tr on ip.transproducto.id = tr.id inner join producto pr on ip.producto.id = pr.id where ip.transproducto.proveedor.nombre= :nombreProveedor order by ip.transproducto.nrodoc desc")
    List<itemProducto> proveedorMayorCompra(@Param("nombreProveedor") String nombreProveedor);
    @Query(value = "SELECT DISTINCT new com.example.springprueba.model.itemProducto(it.serial) FROM itemproducto it")
    List<itemProducto> seriales();
    @Query(value = "SELECT DISTINCT new com.example.springprueba.model.itemProducto(it.transproducto,it.producto, it.cantidad,it.costo, it.serial) FROM itemproducto it where it.transproducto.fecha <= :fechaHasta and it.transproducto.fecha >= :fechaDesde")
    List<itemProducto> rangoEntre2Fechas(@Param("fechaDesde") Date fechaDesde, @Param("fechaHasta") Date fechaHasta);
    List<itemProducto> findByTransproducto(transactionProduct trasproducto);
    @Query(value = "select new com.example.springprueba.model.itemProducto(tr, pr, it.cantidad, it.costo, pr.precio) from itemproducto it inner join transproducto tr on it.transproducto.id = tr.id inner join producto pr on it.producto.id = pr.id where tr.cliente.nombre= :clienteNombre order by tr.fecha desc ")
    List<itemProducto> findByTransproducto_Cliente_Nombre(@Param("clienteNombre") String clienteNombre);

}
