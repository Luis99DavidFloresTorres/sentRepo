package com.example.springprueba.service;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoItemProyecto;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceItemProyecto {
    private final RepoItemProyecto repo;
    private final RepoProducto repoProducto;
    @Autowired
    public ServiceItemProyecto(RepoItemProyecto repoI, RepoProducto repoProducto){
        repo = repoI;
        this.repoProducto = repoProducto;
    }
    public ItemProyecto addItemProyecto(ItemProyecto itemProducto){

        return  repo.save(itemProducto);
    }
    public List<ItemProyecto> findAllItemProyectos(){
        return repo.obtenerDatos();
    }
    public List<ItemProyecto> findAllCostos(){return repo.queryCosto();}
    public List<ItemProyecto> entreFechas(Date fecha1, Date fecha2, String productoN){
        producto producto = this.repoProducto.findByNombre(productoN);
        List<ItemProyecto> itemProyecto = repo.findByProducto(producto);
        List<ItemProyecto> itemVentaEntreFechas = new ArrayList<>();
        for(ItemProyecto itemProyectoF: itemProyecto){

            Date fechaCompra = itemProyectoF.getProyecto().getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                itemVentaEntreFechas.add(itemProyectoF);
            }
        }
        return itemVentaEntreFechas;
    }
    /*public acceso findbyidItemProducto(Long id){
        return repo.findInmuebleById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }*/
   /* public itemProducto editarItemProducto(itemProducto itemProducto){
        return repo.save(itemProducto);
    }*/
}
