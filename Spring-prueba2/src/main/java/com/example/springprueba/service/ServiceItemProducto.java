package com.example.springprueba.service;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.functions.ProductsModules;
import com.example.springprueba.functions.operationRestrict;
import com.example.springprueba.model.acceso;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoAcceso;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoTransproducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class ServiceItemProducto {
    private final RepoItemProducto repo;


    @Autowired
    public ServiceItemProducto(RepoItemProducto repoI){
        repo = repoI;
    }
    public itemProducto addItemProducto(itemProducto itemProducto){

        return  repo.save(itemProducto);
    }
   /* public List<itemProducto> findAllItemProductos(){
        return repo.obtenerItems();
    }*/
    public List<itemProducto> obtenerNormal(){
        return repo.findAll();
    }
    public List<itemProducto> obtenerDatosProductoItemProducto(){
        return repo.obtenerItems();
    }
    public List<itemProducto> obtenerDatosProductoPeriodo(){
        return repo.findProductoPeriodo();
    }
    public List<itemProducto> kardexProducto(){
        return repo.kardexProducto();
    }
    public List<itemProducto> mayorIngresos(){
        return repo.mayorIngresos();
    }
    public List<itemProducto> mayorSalidas(){ return repo.mayorSalidas();}
    public List<itemProducto> kardexByNamesDate(String nombre){ return repo.kardexProductoByName(nombre);}
    public List<itemProducto> obtenerDatosIdProducto(){
        return repo.findByIdProducto();
    }
    public List<itemProducto> obtenerDatosIdProductoPorDeposito(String depositoNombre){
        return repo.obtenerProductosPorDepositos(depositoNombre);
    }
    public List<itemProducto> operacionesDeposito(){ return repo.depositoOperaciones();}
    public List<itemProducto> depositoMayorIngresos(){ return repo.depositoMayorIngresos();}
    public List<itemProducto> depositoMayorSalidas(){ return repo.depositoMayorSalidas();}
    public List<itemProducto> depositoKardex(){ return repo.depositokardexProducto();}
    public List<itemProducto> depositoKardexNombreProducto(String nombreProducto, String nombreDeposito){ return repo.depositokardexProductoByName(nombreProducto, nombreDeposito);}
    public List<itemProducto> productosConMovimientos() { return repo.productosWithMov();}
    public List<itemProducto> primeros1000PorFecha(Integer limit){

            return repo.primeros1000fechas(PageRequest.of(0, limit));
    }
    public List<itemProducto> entre2FechasSalidas(List<transactionProduct> lista){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            for(itemProducto i: it){
                i.setNrodoc(tr.getNrodoc());
                i.setOpe(tr.getOper());
                i.setClienteNombre(tr.getCliente().getNombre());
                i.setFechaact(tr.getFecha());
                i.setObservaciones(tr.getDetalle());
                i.setSalidas(i.getCantidad().doubleValue());
            }
            itemP.addAll(it);
        }
        return itemP;
    }
    public List<itemProducto> entre2FechasSalidasDeposito(List<transactionProduct> lista, String depositoNombre){
        List<itemProducto> itemP = new ArrayList<>();

        for(transactionProduct tr : lista){
            String nombreDeposito = tr.getDeposito().getNombre();
            if(depositoNombre.equals(nombreDeposito)) {
                List<itemProducto> it = repo.findByTransproducto(tr);
                for(itemProducto i:it){
                    i.setNrodoc(tr.getNrodoc());
                    i.setOpe(tr.getOper());
                    i.setClienteNombre(tr.getCliente().getNombre());
                    i.setFechaact(tr.getFecha());
                    i.setObservaciones(tr.getDetalle());
                    i.setSalidas(i.getCantidad().doubleValue());
                }
                itemP.addAll(it);
            }

        }

        return itemP;
    }
    public List<itemProducto> entre2FechasIngresos(List<transactionProduct> lista){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            if(!tr.getNrodoc().equals(1)){
                for(itemProducto i:it){
                    i.setNrodoc(tr.getNrodoc());
                    i.setOpe(tr.getOper());
                    i.setProveedorNombre(tr.getProveedor().getNombre());
                    i.setFechaact(tr.getFecha());
                    i.setObservaciones(tr.getDetalle());
                    i.setIngresos(i.getCantidad().doubleValue());
                }
                itemP.addAll(it);
            }

        }
        return itemP;
    }
    public List<itemProducto> entre2FechasIngresosDeposito(List<transactionProduct> lista, String depositoNombre){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            String nombreDeposito = tr.getDeposito().getNombre();
            if(depositoNombre.equals(nombreDeposito)) {
                if (!tr.getNrodoc().equals(1)){
                    for(itemProducto i:it){
                        i.setNrodoc(tr.getNrodoc());
                        i.setOpe(tr.getOper());
                        i.setProveedorNombre(tr.getProveedor().getNombre());
                        i.setFechaact(tr.getFecha());
                        i.setObservaciones(tr.getDetalle());
                        i.setIngresos(i.getCantidad().doubleValue());
                    }
                    itemP.addAll(it);
                }

            }
        }
        return itemP;
    }
    public List<itemProducto> entre2FechasSalidasProducto(List<transactionProduct> lista, producto producto){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            for(itemProducto i:it){
                if(producto.getId().equals(i.getProducto().getId())){
                    i.setNrodoc(tr.getNrodoc());
                    i.setOpe(tr.getOper());
                    i.setClienteNombre(tr.getCliente().getNombre());
                    i.setFechaact(tr.getFecha());
                    i.setSalidas(i.getCantidad().doubleValue());
                    i.setObservaciones(tr.getDetalle());
                    itemP.add(i);
                }
            }

        }
        System.out.println(itemP);
        return itemP;
    }
    public List<itemProducto> entre2FechasSalidasProductoDeposito(List<transactionProduct> lista, producto producto, String depositoNombre){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            String nombreDeposito = tr.getDeposito().getNombre();
            if(depositoNombre.equals(nombreDeposito)){
                for(itemProducto i:it){
                    if(producto.getId().equals(i.getProducto().getId())){
                        i.setNrodoc(tr.getNrodoc());
                        i.setOpe(tr.getOper());
                        i.setClienteNombre(tr.getCliente().getNombre());
                        i.setFechaact(tr.getFecha());
                        i.setObservaciones(tr.getDetalle());
                        i.setSalidas(i.getCantidad().doubleValue());
                        itemP.add(i);
                    }
                }
            }
        }
        return itemP;
    }
    public List<itemProducto> entre2FechasIngresosProducto(List<transactionProduct> lista, producto producto){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            for(itemProducto i:it){
                if(producto.getId().equals(i.getProducto().getId())&& !tr.getNrodoc().equals(1)){
                    i.setNrodoc(tr.getNrodoc());
                    i.setOpe(tr.getOper());
                    i.setProveedorNombre(tr.getProveedor().getNombre());
                    i.setFechaact(tr.getFecha());
                    i.setObservaciones(tr.getDetalle());
                    i.setIngresos(i.getCantidad().doubleValue());
                    itemP.add(i);
                }
            }
        }
        return itemP;
    }
    public List<itemProducto> entre2FechasIngresosProductoDeposito(List<transactionProduct> lista, producto producto, String depositoNombre){
        List<itemProducto> itemP = new ArrayList<>();
        for(transactionProduct tr : lista){
            List<itemProducto> it = repo.findByTransproducto(tr);
            String nombreDeposito = tr.getDeposito().getNombre();
            if(depositoNombre.equals(nombreDeposito)){
                for(itemProducto i:it){
                    if(producto.getId().equals(i.getProducto().getId())&& !tr.getNrodoc().equals(1)){
                        i.setNrodoc(tr.getNrodoc());
                        i.setOpe(tr.getOper());
                        i.setProveedorNombre(tr.getProveedor().getNombre());
                        i.setFechaact(tr.getFecha());
                        i.setObservaciones(tr.getDetalle());
                        i.setIngresos(i.getCantidad().doubleValue());
                        itemP.add(i);
                    }
                }
            }
        }
        return itemP;
    }
    public List<itemProducto> primeros1000PorFechaYDeposito(Integer limit){
        return repo.primeros1000fechasDeposito(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC,"tr.fecha").and(Sort.by("de.nombre"))));
    }
    /*public acceso findbyidItemProducto(Long id){
        return repo.findInmuebleById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }*/
    public itemProducto editarItemProducto(itemProducto itemProducto){
        return repo.save(itemProducto);
    }

}
