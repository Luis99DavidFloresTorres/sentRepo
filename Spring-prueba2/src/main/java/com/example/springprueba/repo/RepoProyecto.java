package com.example.springprueba.repo;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.codificadores.deposito;
import com.example.springprueba.model.proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RepoProyecto extends JpaRepository<proyecto, Long> {
    proyecto findByNroprj(Integer prj);
    @Transactional
    void deleteByNroprj(Integer nroprj);
    List<proyecto> findByEstado(String estado);
    @Query(value = "SELECT DISTINCT new com.example.springprueba.model.proyecto(pr.estado) from proyecto pr")
    Optional<List<proyecto>> porEstados();
    @Query(value = "SELECT DISTINCT new com.example.springprueba.model.proyecto(pr.estado,pr.responsable) from proyecto pr")
    Optional<List<proyecto>> porEstadosResponsables();
    @Query(value = "SELECT DISTINCT new com.example.springprueba.model.proyecto(pr.nombre,0, 0) from proyecto pr")
    Optional<List<proyecto>> porNombres();
    List<proyecto> findByFechaBetween(Date fecha1, Date fecha2);

}
