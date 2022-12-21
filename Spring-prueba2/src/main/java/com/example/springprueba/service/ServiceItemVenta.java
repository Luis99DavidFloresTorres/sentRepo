package com.example.springprueba.service;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoItemnotaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class ServiceItemVenta {
    private final  RepoItemnotaventa itemnotaventa;
    private final RepoProducto repoProducto;
    @Autowired
    public ServiceItemVenta(RepoItemnotaventa itemnotaventa, RepoProducto repoProducto){
        this.itemnotaventa =itemnotaventa;
        this.repoProducto= repoProducto;
    }
    public List<itemnotaventa> entreFechas(Date fecha1, Date fecha2, String productoN){
        producto producto = this.repoProducto.findByNombre(productoN);
        List<itemnotaventa> itemnotaVenta = itemnotaventa.findByProducto(producto);
        List<itemnotaventa> itemVentaEntreFechas = new ArrayList<>();
        for(itemnotaventa itemNotaVentaF: itemnotaVenta){

            Date fechaCompra = itemNotaVentaF.getNotaventa().getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                itemVentaEntreFechas.add(itemNotaVentaF);
            }
        }
       return itemVentaEntreFechas;
    }
}
