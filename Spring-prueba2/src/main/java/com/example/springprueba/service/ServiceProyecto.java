package com.example.springprueba.service;

import com.example.springprueba.model.*;
import com.example.springprueba.repo.*;
import com.example.springprueba.responsesJson.seguimientoPorUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceProyecto {
    private final RepoProyecto repo;
    private final RepoNotaVenta repoNotaVenta;
    private final RepoCotizacion repoCotizacion;
    private final RepoTransproducto repoTransproducto;
    @Autowired
    public ServiceProyecto(RepoProyecto repoI, RepoNotaVenta repoNotaVenta, RepoCotizacion repoCotizacion, RepoTransproducto repoTransproducto){

        repo = repoI;
        this.repoNotaVenta = repoNotaVenta;
        this.repoCotizacion = repoCotizacion;
        this.repoTransproducto = repoTransproducto;
    }
    public List<proyecto> proyectoPorProyecto(Date fecha1, Date fecha2, String estado){
        List<proyecto> listEstados=null;
        List<proyecto> filterDates = new ArrayList();
        if(estado.equals("TODOS")){
            listEstados=repo.findAll();
        }else{
            listEstados=repo.findByEstado(estado);
        }
        for(proyecto proyectoFor: listEstados){

            Date fechaCompra = proyectoFor.getFecha();
            if(((fechaCompra.after(fecha1)) || (fecha1.equals(fechaCompra))) && ((fechaCompra.before(fecha2)) || (fecha2.equals(fechaCompra)))){
                filterDates.add(proyectoFor);
            }
        }
        return filterDates;
    }
    public List<seguimientoPorUsuario> seguimientoPorUsuario(proyecto proyecto){
        List<cotizacion> cotizacion = repoCotizacion.findByProyecto(proyecto);
        List<transactionProduct> transactionProduct = repoTransproducto.findByProyecto(proyecto);
        List<notaventa> notaventa = repoNotaVenta.findByProyecto(proyecto);
        List<seguimientoPorUsuario> seguimientoPorUsuarioList = new ArrayList<>();
        seguimientoPorUsuario seguimientoPorUsuarioElaborado = new seguimientoPorUsuario();
        seguimientoPorUsuarioElaborado.setFecha(proyecto.getFecha());
        seguimientoPorUsuarioElaborado.setAccion("ELABORADO");
        seguimientoPorUsuarioElaborado.setResponsable(proyecto.getResponsable());
        seguimientoPorUsuario seguimientoPorUsuarioActualizado = new seguimientoPorUsuario();
        seguimientoPorUsuarioActualizado.setFecha(proyecto.getFechaact());
        seguimientoPorUsuarioActualizado.setAccion("ACTUALIZADO");
        seguimientoPorUsuarioActualizado.setResponsable(proyecto.getUseract());

        seguimientoPorUsuarioList.add(seguimientoPorUsuarioActualizado);
        seguimientoPorUsuarioList.add(seguimientoPorUsuarioElaborado);
        for(cotizacion cotizacionFor: cotizacion){
            seguimientoPorUsuario seguimientoPorUsuario = new seguimientoPorUsuario();
            seguimientoPorUsuario.setAccion("COTIZACION "+cotizacionFor.getNrodoc());
            seguimientoPorUsuario.setFecha(cotizacionFor.getFecha());
            seguimientoPorUsuario.setResponsable(cotizacionFor.getUseract());
            seguimientoPorUsuarioList.add(seguimientoPorUsuario);
        }
        for(notaventa notaventaFor: notaventa){
            seguimientoPorUsuario seguimientoPorUsuario = new seguimientoPorUsuario();
            seguimientoPorUsuario.setAccion("NOTA VENTA "+notaventaFor.getNrodoc());
            seguimientoPorUsuario.setFecha(notaventaFor.getFecha());
            seguimientoPorUsuario.setResponsable(notaventaFor.getUseract());
            seguimientoPorUsuarioList.add(seguimientoPorUsuario);
        }
        for(transactionProduct transactionProductFor: transactionProduct){
            if(transactionProductFor.getOper()<320){
                seguimientoPorUsuario seguimientoPorUsuario = new seguimientoPorUsuario();
                seguimientoPorUsuario.setAccion("NOTA ENTRADA PRODUCTOS "+transactionProductFor.getNrodoc());
                seguimientoPorUsuario.setFecha(transactionProductFor.getFecha());
                seguimientoPorUsuario.setResponsable(transactionProductFor.getUseract());
                seguimientoPorUsuarioList.add(seguimientoPorUsuario);
            }else if(transactionProductFor.getOper()>320){
                seguimientoPorUsuario seguimientoPorUsuario = new seguimientoPorUsuario();
                seguimientoPorUsuario.setAccion("NOTA SALIDA PRODUCTOS "+transactionProductFor.getNrodoc());
                seguimientoPorUsuario.setFecha(transactionProductFor.getFecha());
                seguimientoPorUsuario.setResponsable(transactionProductFor.getUseract());
                seguimientoPorUsuarioList.add(seguimientoPorUsuario);
            }
        }
        return seguimientoPorUsuarioList;
    }
}
