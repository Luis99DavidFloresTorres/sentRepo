package com.example.springprueba.repo;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.ordencompra;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RepoOrdenCompra extends JpaRepository<ordencompra, Long>{
    List<ordencompra> findByOperLessThan(Integer oper,Pageable pageable);
    @Transactional
    void deleteByNrodoc(Integer nroDoc);
    ordencompra findByNrodoc(Integer doc);

}
