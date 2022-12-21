package com.example.springprueba.service;

import com.example.springprueba.model.*;
import com.example.springprueba.repo.RepoItemnotaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.repo.RepoUsuario;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceNotaVenta {
    private final RepoNotaVenta repoNotaVenta;
    private final RepoItemnotaventa repoItemnotaventa;
    private final RepoUsuario repoUsuario;
    public ServiceNotaVenta(RepoNotaVenta repoNotaVenta, RepoItemnotaventa repoItemnotaventa, RepoUsuario repoUsuario){
        this.repoNotaVenta =repoNotaVenta;
        this.repoItemnotaventa=repoItemnotaventa;
        this.repoUsuario = repoUsuario;
    }
    public List<notaventa> ventasNroDoc(int cantidad){
       // List<notaventa> notaventaList = repoNotaVenta.findAll(Sort.by(Sort.Direction.DESC,"nrodoc"));
        List<notaventa> notaventaList = repoNotaVenta.findAll(PageRequest.of(0, cantidad,Sort.by(Sort.Direction.DESC,"nrodoc"))).getContent();
        return notaventaList;
    }
    public List<itemnotaventa> ventasPorProducto(Date fechaInicio, Date fechaFinal){
        //long cantidad = repoItemnotaventa.count();
        List<itemnotaventa> itemNotaVenta = repoItemnotaventa.ventasPorProducto();
        List<itemnotaventa> itemFilter = new ArrayList<>();
        for(int i = 0; i<itemNotaVenta.size();i++){
            Date fechaItem = itemNotaVenta.get(i).getNotaventa().getFecha();
            if((fechaItem.after(fechaInicio)||fechaInicio.equals(fechaItem))&&(fechaFinal.equals(fechaItem) || fechaItem.before(fechaFinal))){
                itemFilter.add(itemNotaVenta.get(i));
            }
        }
        return itemFilter;
    }
    public List<itemnotaventa> ventasPorVendedor(Usuario usuario, Date fechaInicio, Date fechaFinal){
        List<itemnotaventa> filter = repoItemnotaventa.buscarPorUsuarioFechas(usuario, fechaInicio, fechaFinal);
        int nrodocActual=0;
        if(filter.size()>0){
            nrodocActual = filter.get(0).getNotaventa().getNrodoc();
        }
        String a = "entra";
        List<itemnotaventa> itemsNotaventaSumas = new ArrayList<>();
        for(int i = 0; i<filter.size();i++){
            int nrodocFilter = filter.get(i).getNotaventa().getNrodoc();

            if(i != 0){
                if(i==filter.size()-1){
                    if(nrodocActual==nrodocFilter){
                        filter.get(i).setCostoTotal(filter.get(i-1).getCostoTotal()+filter.get(i).getCostoTotal());
                        filter.get(i).setPrecioTotal(filter.get(i-1).getPrecioTotal()+filter.get(i).getPrecioTotal());
                        itemsNotaventaSumas.add(filter.get(i));
                        nrodocActual = nrodocFilter;
                    }else{
                        itemsNotaventaSumas.add(filter.get(i-1));
                        itemsNotaventaSumas.add(filter.get(i));
                    }
                }else{
                    if(nrodocActual == nrodocFilter){
                        filter.get(i).setCostoTotal(filter.get(i-1).getCostoTotal()+filter.get(i).getCostoTotal());
                        filter.get(i).setPrecioTotal(filter.get(i-1).getPrecioTotal()+filter.get(i).getPrecioTotal());
                    }else{
                        itemsNotaventaSumas.add(filter.get(i-1));
                        nrodocActual = nrodocFilter;
                    }
                }
            }
        }
        return itemsNotaventaSumas;
    }
    public double montoTotal(notaventa notaventa){
        List<itemnotaventa> it = repoItemnotaventa.findByNotaventa(notaventa);
        double montoTotal=0.0;
        for(itemnotaventa itn : it){
            montoTotal+=(itn.getPrecio()-itn.getDescto())* itn.getCantidad();
        }
        return montoTotal;
    }
}
