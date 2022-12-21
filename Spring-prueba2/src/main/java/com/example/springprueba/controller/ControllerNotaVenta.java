package com.example.springprueba.controller;

import com.example.springprueba.model.Usuario;
import com.example.springprueba.model.cliente;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.repo.RepoCliente;
import com.example.springprueba.repo.RepoItemnotaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.repo.RepoUsuario;
import com.example.springprueba.service.ServiceNotaVenta;
import javassist.bytecode.stackmap.TypeData;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/notaventa")
public class ControllerNotaVenta {
    private final RepoNotaVenta repoNotaVenta;
    private final RepoCliente repoCliente;
    private final RepoItemnotaventa repoItemVenta;
    private final RepoUsuario repoUsuario;
    private final ServiceNotaVenta serviceNotaVenta;
    public ControllerNotaVenta(RepoNotaVenta repoNotaVenta, RepoCliente repoCliente, RepoItemnotaventa repoItemVenta, RepoUsuario repoUsuario, ServiceNotaVenta serviceNotaVenta){
        this.repoNotaVenta = repoNotaVenta;
        this.repoCliente = repoCliente;
        this.repoItemVenta = repoItemVenta;
        this.repoUsuario = repoUsuario;
        this.serviceNotaVenta = serviceNotaVenta;
    }
    @GetMapping("/obtenerNotasVenta")
    public ResponseEntity<List<notaventa>> obtenerTodo(){
        List<notaventa> notaventaList = repoNotaVenta.findAll();
        return new ResponseEntity<>(notaventaList, HttpStatus.OK);
    }
    @GetMapping("/porCliente/{fechaInicio}/{fechaFinal}/{nombreCliente}")
    public ResponseEntity<List<notaventa>> porClienteFechas(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal, @PathVariable("nombreCliente") String nombreCliente ){

       // System.out.println(nombreCliente);
        cliente cliente = this.repoCliente.findByNombre(nombreCliente);

        List<notaventa> notaventa = this.repoNotaVenta.findByCliente(cliente);
        List<notaventa> filterArray = new ArrayList<>();
        System.out.println(notaventa.size());
        for(notaventa notaventaFor : notaventa){
          Date fechaNotaventa = notaventaFor.getFecha();
            if(((fechaNotaventa.after(fechaInicio)) || (fechaInicio.equals(fechaNotaventa))) && ((fechaNotaventa.before(fechaFinal)) || (fechaFinal.equals(fechaNotaventa)))){
                filterArray.add(notaventaFor);
            }
        }
        return new ResponseEntity<>(filterArray, HttpStatus.OK);
    }
    @GetMapping("/informeVenta/{fechaInicio}/{fechaFinal}")
    public ResponseEntity<List<itemnotaventa>> informeVentas(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal){

        List<itemnotaventa> all = repoItemVenta.sumaPrecioTotalItems();
        List<itemnotaventa> filterArray = new ArrayList<>();
        Integer nrodocumento=null;
        itemnotaventa ultimo = null;
        int j=0;
        for(int i = 0 ; i<all.size();i++){
            Date fechaItem = all.get(i).getNotaventa().getFecha();
            notaventa notaventa = all.get(i).getNotaventa();
            double costoTotalItem = all.get(i).getCostoTotal().doubleValue();
            double precioTotal = all.get(i).getPrecioTotal().doubleValue();

            if((fechaItem.after(fechaInicio)||fechaInicio.equals(fechaItem))&&(fechaFinal.equals(fechaItem) || fechaItem.before(fechaFinal))){
                if(j==0){
                    nrodocumento = all.get(i).getNotaventa().getNrodoc();
                }
                if(i!= all.size()-1){
                    if(notaventa.getNrodoc().equals(nrodocumento)){
                        if(j==0){
                            all.get(i).setCostoTotal(costoTotalItem);
                            all.get(i).setPrecioTotal(precioTotal);
                        }else{
                            all.get(i).setCostoTotal(all.get(i-1).getCostoTotal()+costoTotalItem);
                            all.get(i).setPrecioTotal(all.get(i-1).getPrecioTotal()+precioTotal);
                            ultimo = all.get(i);
                        }
                    }else{
                        all.get(i-1).setImpuestoReservado(all.get(i-1).getPrecioTotal()*0.16);
                        all.get(i-1).setUtilidad(all.get(i-1).getPrecioTotal()-all.get(i-1).getCostoTotal());
                        filterArray.add(all.get(i-1));
                        ultimo = all.get(i);
                        nrodocumento = all.get(i).getNotaventa().getNrodoc();
                    }
                }/*else{
                    if(nrodocumento == notaventa.getNrodoc().intValue()) {
                        all.get(i).setCostoTotal(all.get(i-1).getCostoTotal()+costoTotalItem);
                        all.get(i).setPrecioTotal(all.get(i-1).getPrecioTotal()+precioTotal);
                        all.get(i).setImpuestoReservado(precioTotal*0.16);
                        filterArray.add(all.get(i));
                    }else{
                        all.get(i).setImpuestoReservado(precioTotal*0.16);
                        filterArray.add(all.get(i));
                    }
                }*/
                j++;
            }
        }
        double costoTotalItem = ultimo.getCostoTotal().doubleValue();
        double precioTotal = ultimo.getPrecioTotal().doubleValue();
        double utilidad = ultimo.getPrecioTotal()-ultimo.getCostoTotal();
        if(ultimo.getNotaventa().getNrodoc().equals(filterArray.get(filterArray.size()-1).getNotaventa().getNrodoc())){
            ultimo.setCostoTotal(filterArray.get(filterArray.size()-2).getCostoTotal()+costoTotalItem);
            ultimo.setPrecioTotal(filterArray.get(filterArray.size()-2).getPrecioTotal()+precioTotal);
            ultimo.setImpuestoReservado(precioTotal*0.16);
            ultimo.setUtilidad(utilidad);
            filterArray.add(ultimo);
        }else{
            ultimo.setImpuestoReservado(precioTotal*0.16);
            ultimo.setPrecioTotal(precioTotal);
            ultimo.setCostoTotal(costoTotalItem);
            ultimo.setUtilidad(utilidad);
            filterArray.add(ultimo);
        }
        return new ResponseEntity<>(filterArray, HttpStatus.OK);
    }
    @PostMapping("/informePorComision/{fechaInicio}/{fechaFinal}")
    public ResponseEntity<List<itemnotaventa>> informePorComision(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal, @RequestBody Usuario usuario){
        List<itemnotaventa> all = serviceNotaVenta.ventasPorVendedor(usuario, fechaInicio, fechaFinal);
        all.forEach(data->{
           if(!Objects.isNull(data.getNotaventa().getUsuario().getComision())){
               data.setTotalComision(data.getPrecioTotal() * (data.getNotaventa().getUsuario().getComision()/100));
           }else{
               data.setTotalComision(data.getPrecioTotal() * (1/100));
           }

        });
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
    @GetMapping("/informeVentasPorProducto/{fechaInicio}/{fechaFinal}")
    public ResponseEntity<List<itemnotaventa>> ventasPorProducto(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal){
        List<itemnotaventa> all = serviceNotaVenta.ventasPorProducto(fechaInicio,fechaFinal);
        Comparator<itemnotaventa> compareById = new Comparator<itemnotaventa>() {
            @Override
            public int compare(itemnotaventa o1, itemnotaventa o2) {
                return o1.getNotaventa().getNrodoc().compareTo(o2.getNotaventa().getNrodoc());

            }
        };
        Collections.sort(all,compareById);
        /*List<itemnotaventa> filterArray = new ArrayList<>();
        for(itemnotaventa notaventaFor : all){
            Date fechaNotaventa = notaventaFor.getNotaventa().getFecha();
            if(((fechaNotaventa.after(fechaInicio)) || (fechaInicio.equals(fechaNotaventa))) && ((fechaNotaventa.before(fechaFinal)) || (fechaFinal.equals(fechaNotaventa)))){
                filterArray.add(notaventaFor);
            }
        }*/
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
    @PostMapping("/informeVentasPorVendedor/{fechaInicio}/{fechaFinal}")
    public ResponseEntity<List<itemnotaventa>> ventasPorVendedor(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal, @RequestBody Usuario usuario){
        List<itemnotaventa> all = serviceNotaVenta.ventasPorVendedor(usuario, fechaInicio, fechaFinal);
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
