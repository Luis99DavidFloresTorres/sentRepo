package com.example.springprueba.service;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoProducto;
import com.example.springprueba.repo.RepoTransproducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTransproducto {
    private final RepoTransproducto repo;
    private final RepoItemProducto repoItemProducto;
    @Autowired
    public ServiceTransproducto(RepoTransproducto repoI, RepoItemProducto repoItemProducto) {
        repo = repoI;
        this.repoItemProducto = repoItemProducto;
    }
    public transactionProduct addProducto(transactionProduct transactionProductp){

        return  repo.save(transactionProductp);
    }
    public List<transactionProduct> findAllTransactionsProduct(){
        return repo.getAllTransaction();
    }
    public List<transactionProduct> findOperDate(){
        return repo.getOpeFecha();
    }
    public List<transactionProduct> findOperDateDetails(){
        return repo.getOperDateDetails();
    }
    /*public transactionProduct findbyidTransactionProducto(Long id){
        return repo.findProductoById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }*/
    /*public producto editarZona(producto productop){
        return repo.save(productop);
    }*/
    public List<transactionProduct> entradas(int cantidadRevisar){
        return repo.findByOperLessThan(320, PageRequest.of(0,cantidadRevisar, Sort.by(Sort.Direction.DESC,"nrodoc")));
                //repo.findByOperGreaterThanEqual(321, PageRequest.of(0,cantidadRevisar, Sort.by(Sort.Direction.DESC,"nrodoc")));
    }
    public List<transactionProduct> salidas(int cantidadRevisar){
        return repo.findByOperGreaterThanEqual(321, PageRequest.of(0,cantidadRevisar, Sort.by(Sort.Direction.DESC,"nrodoc")));
    }
    public Double costoTotal(transactionProduct tr){
        List<itemProducto> listItems = repoItemProducto.findByTransproducto(tr);
        double montoTotal = 0.0;
        for(itemProducto it : listItems){
            montoTotal += it.getCosto() * it.getCantidad();
        }
        return montoTotal;
    }
}
