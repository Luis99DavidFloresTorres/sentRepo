package com.example.springprueba.service;

import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoItemCompra;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceItemCompra {
    private final RepoItemCompra repoItemCompra;
    private final RepoProducto repoProducto;
    @Autowired
    public ServiceItemCompra(RepoItemCompra repoItemCompra, RepoProducto repoProducto){
        this.repoItemCompra = repoItemCompra;
        this.repoProducto = repoProducto;
    }
    public List<itemcompra> porProveedor(String nombre){
        return this.repoItemCompra.byProveedor(nombre);
    }
    public List<itemcompra> entreFechas(Date fecha1, Date fecha2, String productoN){
        producto producto = this.repoProducto.findByNombre(productoN);
        List<itemcompra> itemnotaVenta = repoItemCompra.findByProducto(producto);
        List<itemcompra> itemCompraEntreFechas = new ArrayList<>();
        for(itemcompra itemNotaVentaF: itemnotaVenta){

            Date fechaCompra = itemNotaVentaF.getOrdencompra().getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                itemCompraEntreFechas.add(itemNotaVentaF);
            }
        }
        return itemCompraEntreFechas;
    }
}
