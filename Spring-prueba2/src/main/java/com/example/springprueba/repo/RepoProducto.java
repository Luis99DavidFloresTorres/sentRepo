package com.example.springprueba.repo;
import com.example.springprueba.model.codificadores.unidades;

import com.example.springprueba.model.producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
public interface RepoProducto extends JpaRepository<producto, Long> {
    Optional<producto> findProductoById(Long id);
    @Query(value = "SELECT new com.example.springprueba.model.producto(p.id,p.codigo,u.nombre,p.invinicial, p.costo,p.costo*(p.ingresos-p.salidas), p.detalle,p.marca, p.modelo, p.useract, p.color, p.tipo, p.desctoa,p.desctob, p.desctoc ,p.ingresos,p.nombre, p.salidas, (p.ingresos-p.salidas)) from producto p join unidad u on p.unidad.id = u.id  where p.tipo= :tipo")
    List<producto> findProductoSaldo(@Param("tipo") String tipo);
   // @Query(value = "SELECT new com.example.springprueba.model.producto(p.nombre) from producto p")
    producto findByNombre(String nombre);
    @Query(value = "SELECT new com.example.springprueba.model.producto(p.id,p.codigo, p.detalle,p.marca, p.modelo,  p.color, p.tipo,p.nombre, p.rutaPortada, p.precio) from producto p join unidad u on p.unidad.id = u.id where p.tipo= :tipo")
    List<producto> clienteMotrarProducto(@Param("tipo") String tipo);
    @Transactional
    @Modifying
    @Query(value = "UPDATE producto set nombre= :name, modelo= :modelo, marca= :marca, unidad= :unidad, costo= :costo, utilidad= :utilidad, detalle= :detalle, industria= :industria, desctoa= :desctoa, desctob= :desctob, desctoc= :desctoc, precio= :precio where id= :id")
    Optional<Integer> editarProductoSinUrl( @Param("name") String nombre, @Param("modelo") String modelo, @Param("marca")
            String marca, @Param("unidad") unidades unidad, @Param("costo") Double costo, @Param("utilidad") Integer utilidad, @Param("detalle") String detalle,@Param("industria") String industria, @Param("desctoa") Double desctoa, @Param("desctob") Double desctob, @Param("desctoc") Double desctoc,@Param("precio") Double precio, @Param("id") Long id);
    @Transactional
    @Modifying
    @Query(value = "UPDATE producto set nombre= :name, codigo= :codigo, modelo= :modelo, marca= :marca, unidad= :unidad, costo= :costo, utilidad= :utilidad, detalle= :detalle, industria= :industria, desctoa= :desctoa, desctob= :desctob, desctoc= :desctoc, precio= :precio, rutaPortada= :ruta_portada where id= :id")
    Optional<Integer> editarProductoConUrl(@Param("codigo") String codigo, @Param("name") String nombre, @Param("modelo") String modelo, @Param("marca")
            String marca, @Param("unidad") unidades unidad, @Param("costo") Double costo, @Param("utilidad") Integer utilidad, @Param("detalle") String detalle,@Param("industria") String industria, @Param("desctoa") Double desctoa, @Param("desctob") Double desctob, @Param("desctoc") Double desctoc,@Param("precio") Double precio, @Param("ruta_portada") String rutaPortada,@Param("id") Long id);
    @Transactional
    @Modifying
    @Query(value = "delete from producto where id= :id")
    Optional<Integer> eliminarProducto(@Param("id") Long id);

    List<producto> findAllByTipo(String tipo);
}
