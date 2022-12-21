package com.example.springprueba.repo;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.codificadores.unidades;
import com.example.springprueba.model.proyecto;
import com.example.springprueba.model.transactionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface RepoTransproducto extends JpaRepository<transactionProduct, Long> {
   //@Query(value = "SELECT new com.example.springprueba.model.transactionProduct(oper,fecha) from transproducto ")
   @Query("SELECT new com.example.springprueba.model.transactionProduct(tr.oper, tr.fecha) from transproducto tr")
    List<transactionProduct> getOpeFecha();
    @Query("SELECT new com.example.springprueba.model.transactionProduct(tr.id,tr.oper, tr.fecha,tr.notaventa,tr.nrodoc,tr.detalle) from transproducto tr")
    List<transactionProduct> getAllTransaction();
    @Query("SELECT new com.example.springprueba.model.transactionProduct(tr.oper, tr.fecha,tr.detalle) from transproducto tr")
    List<transactionProduct> getOperDateDetails();
    List<transactionProduct> findByOperGreaterThanEqual(Integer ope, Pageable pageable);
    List<transactionProduct> findByOperGreaterThanEqual(Integer ope);
    List<transactionProduct> findByOperLessThan(Integer ope, Pageable pageable);
    List<transactionProduct> findByOperLessThan(Integer ope);
    List<transactionProduct> findByOper(Integer ope, Pageable pageable);
    @Transactional
    void deleteByNrodocAndOper(Integer nroDoc, Integer oper);
    transactionProduct findByNrodocAndOper(Integer nrodoc, Integer oper);
    List<transactionProduct> findByProyecto(proyecto proyecto);
    List<transactionProduct> findByCliente(cliente cliente);
    List<transactionProduct> findByFechaBetweenAndOperAfter(Date fechaInicio, Date fechaFinal, Integer oper);
    List<transactionProduct> findByFechaBetweenAndOperBefore(Date fechaInicio, Date fechaFinal, Integer oper);
    List<transactionProduct> findByFechaBetween(Date fechaStart, Date fechaEnd, Pageable pageable);
}
