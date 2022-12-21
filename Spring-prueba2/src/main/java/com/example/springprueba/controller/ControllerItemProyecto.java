package com.example.springprueba.controller;

import com.example.springprueba.model.*;
import com.example.springprueba.repo.*;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/itemProyecto")
public class ControllerItemProyecto {
    private final ServiceItemProyecto serviceItemProyecto;
    private final RepoProyecto proyecto;
    private final RepoItemProyecto repoItemProyecto;
    private final RepoNotaVenta repoNotaVenta;
    private final RepoTransproducto repoTransproducto;
    private final RepoNotaDescargo repoNotaDescargo;
    private final ServiceTransproducto serviceTransproducto;
    private final ServiceNotaVenta serviceNotaVenta;
    private final ServiceNotaDescargo serviceNotaDescargo;
    private final RepoItemProducto repoItemProducto;
    //private final ServiceUnidad serviceUnidad;
    public ControllerItemProyecto(ServiceItemProyecto serviceItemProyecto, RepoProyecto repoProyecto, RepoItemProyecto repoItemProyecto, RepoNotaVenta repoNotaVenta, RepoNotaDescargo repoNotaDescargo, RepoTransproducto repoTransproducto, ServiceTransproducto serviceTransproducto, ServiceNotaVenta serviceNotaVenta, ServiceNotaDescargo serviceNotaDescargo, RepoItemProducto repoItemProducto){
        this.serviceTransproducto = serviceTransproducto;
        this.serviceItemProyecto = serviceItemProyecto;
        this.proyecto = repoProyecto;
        this.repoItemProyecto = repoItemProyecto;
        this.repoNotaVenta = repoNotaVenta;
        this.repoNotaDescargo = repoNotaDescargo;
        this.repoTransproducto = repoTransproducto;
        this.serviceNotaVenta = serviceNotaVenta;
        this.serviceNotaDescargo = serviceNotaDescargo;
        this.repoItemProducto = repoItemProducto;
    }
    //    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<ItemProyecto>> getItemProyectos(){
        List<ItemProyecto> proyectoList = serviceItemProyecto.findAllItemProyectos();
        return new ResponseEntity<>(proyectoList, HttpStatus.OK);
    }
  /*  @GetMapping("/costo")
    public ResponseEntity<List<ItemProyecto>> getCostos(){
        List<ItemProyecto> proyectList = serviceItemProyecto.findAllCostos();
        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
    public ItemProyecto arbol(ItemProyecto itemProyecto){
        if(Objects.isNull(itemProyecto.getProyectoProductosHijos())){
            return itemProyecto;
        }else{
            itemProyecto.setProducto(null);
             arbol(itemProyecto.getProyectoProductosHijos().getItemProyecto());
            return itemProyecto;
        }
    }*/
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> add(@RequestBody List<ItemProyecto> itemProyectoList){

    /*    itemProyectoList.forEach(data->{
            if(!Objects.isNull(data.getNombrePadre())){
                data.setProducto(null);
            }
        });*/

        //sumas de las ventas en el total del proyecto
        Long id = this.proyecto.findByNroprj(itemProyectoList.get(0).getProyecto().getNroprj()).getId();
        proyecto proyectoObtener = itemProyectoList.get(0).getProyecto();
        String descto = proyectoObtener.getCliente().getTipodescto();
        double suma= 0;
        for(ItemProyecto proyecto1: itemProyectoList){
            if(!Objects.isNull(proyecto1.getPrecioventa())) {
                if(descto.equals('A')){
                    suma += proyecto1.getProducto().getDesctoa()*proyecto1.getCantidad();
                }else if(descto.equals('B')){
                    suma += proyecto1.getProducto().getDesctob()*proyecto1.getCantidad();
                }else if(descto.equals('C')) {
                    suma += proyecto1.getProducto().getDesctoc() * proyecto1.getCantidad();
                }else{
                    suma += proyecto1.getMonto();
                }
            }
        }
        proyectoObtener.setTotalventas(suma);
        proyectoObtener.setId(id);
        proyectoObtener.setTotalutilbruta(0.0);
        proyectoObtener.setPorcsociedad(0.0);
        proyectoObtener.setTc(6.96);
        proyectoObtener.setComisionban(0.0);
        proyectoObtener.setComisioncon(0.0);
        proyectoObtener.setTotaltaxtransporte(0.0);
        proyectoObtener.setUltimacot(0);
        proyectoObtener.setMontome(0.0);
        proyectoObtener.setEstado("COTIZACION");
        proyectoObtener.setTotalpregastos(0.0);
        proyectoObtener.setEjecucionfisica(0.0);
        proyectoObtener.setEjecuciongastos(0.0);
        proyectoObtener.setEjecucionproductos(0.0);
        proyectoObtener.setEjecucionfinanciera(0.0);
        proyectoObtener.setEjecucionventas(0.0);
        proyecto nuevoProyecto = this.proyecto.save(proyectoObtener);
        itemProyectoList.forEach(data->{
            data.setProyecto(nuevoProyecto);
        });
        repoItemProyecto.saveAll(itemProyectoList);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    @GetMapping("/byProyecto/{id}")
    public ResponseEntity<List<ItemProyecto>> findByProyecto(@PathVariable("id") Long id) {
        System.out.println(id);
        Optional<proyecto> proyecto = this.proyecto.findById(id);
        List<ItemProyecto> itemProyectoList = this.repoItemProyecto.findByProyecto(proyecto.get()); // id 413 no tiene itemproyecto entonces no devuelve nada
        if(itemProyectoList.size()==0){
            ItemProyecto itemProyecto = new ItemProyecto();
            itemProyecto.setProyecto(proyecto.get());
            itemProyecto.setOrigen("sinItems");
            List lista = new ArrayList<ItemProyecto>();
            lista.add(itemProyecto);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(itemProyectoList, HttpStatus.OK);
        }
    }

    @GetMapping("/entreFechasProductos/{fecha1}/{fecha2}")
    public ResponseEntity<List<ItemProyecto>> entreFechasProd(@PathVariable("fecha1") Date fechaInicio, @PathVariable("fecha2") Date fechaFinal){
        List<proyecto> listProyecto = proyecto.findByFechaBetween(fechaInicio,fechaFinal);
        List<ItemProyecto> itemProyectoMandar = new ArrayList<>();
        for(proyecto p: listProyecto){
            List<transactionProduct> tr = repoTransproducto.findByProyecto(p);
            List<itemProducto> itemProductoList = new ArrayList<>();
            for(transactionProduct t:tr){
                itemProductoList.addAll(repoItemProducto.findByTransproducto(t));
            }
            List<ItemProyecto> itemProyectoList  = repoItemProyecto.findByProyecto(p);
            for(itemProducto it: itemProductoList){
                Integer cantidad;
                producto producto = it.getProducto();
                boolean sw = true;
                if(it.getTransproducto().getOper()<320){
                    cantidad = -it.getCantidad();
                }else{
                    cantidad = it.getCantidad();
                }
                for(ItemProyecto itproyecto:itemProyectoList){
                    if(producto.equals(itproyecto.getProducto())){

                        itproyecto.setCantidadentr(itproyecto.getCantidadentr()+cantidad);
                       // itproyecto.setMonto(itproyecto.getCantidad()-itproyecto.getCantidadentr()+itproyecto.getEntregaanterior());
                        sw = false;
                        break;
                    }
                }
                if(sw){
                    ItemProyecto itemProyecto= new ItemProyecto();
                    itemProyecto.setProyecto(p);
                    itemProyecto.setEntregaanterior(0.0);
                    itemProyecto.setProducto(producto);
                    itemProyecto.setCantidad(0.0);
                    itemProyecto.setCantidadentr(cantidad);
                   // itemProyecto.setMonto(0.0-itemProyecto.getCantidadentr()+itemProyecto.getEntregaanterior());
                    itemProyectoList.add(itemProyecto);
                }
            }
            itemProyectoMandar.addAll(itemProyectoList);
        }
        return new ResponseEntity<>(itemProyectoMandar, HttpStatus.OK);
    }
    @GetMapping("/resultadoPresumibleProyecto/{id}")
    public ResponseEntity<proyecto> resultadoPresumibleProyecto(@PathVariable("id") Long id) {
        Optional<proyecto> proyecto = this.proyecto.findById(id);
        List<notaventa> notaventa = repoNotaVenta.findByProyecto(proyecto.get());
        List<transactionProduct> transactionProductList = repoTransproducto.findByProyecto(proyecto.get());
        List<notadescargo> notadescargo = repoNotaDescargo.findByProyecto(proyecto.get());
        double gastoPrevisto = 0.0;
        gastoPrevisto=proyecto.get().getTotalpregastos();
        double totalProyecto = 0.0;
        double gastoEjecutado = 0.0;
        double totalcompra = 0.0;
        double utilidadSupuesta = 0.0;
        String nrofact ="";
        double impuestoReserv=0.0;
        for(notaventa nt : notaventa){
            if(!Objects.isNull(nt.getNrofact()) || !nt.getNrofact().isEmpty()){
                nrofact = nt.getNrofact();
            }
            totalProyecto += serviceNotaVenta.montoTotal(nt);
        }
        for(transactionProduct tr : transactionProductList){
            //if(tr.getOper()>320){
                totalcompra += serviceTransproducto.costoTotal(tr);
            //}
        }
        for(notadescargo nt : notadescargo){
            gastoEjecutado+=serviceNotaDescargo.montoTotal(nt);
        }
        if(totalProyecto!=0.0){
            utilidadSupuesta = (1-totalcompra/totalProyecto)*100;
        }else{
            utilidadSupuesta =0.0;
        }
        if(!Objects.isNull(nrofact) || !nrofact.isEmpty()){
            impuestoReserv = totalProyecto*0.16;
        }
        proyecto.get().setGastoPrevisto(gastoPrevisto);
        proyecto.get().setPrecioProyecto(totalProyecto);
        proyecto.get().setGastoEjecutado(gastoEjecutado);
        proyecto.get().setCostoTotalCompra(totalcompra);
        proyecto.get().setUtilidadSupuesto(utilidadSupuesta);
        proyecto.get().setImpuestoReservado(impuestoReserv);
        return new ResponseEntity<>(proyecto.get(),HttpStatus.OK);
    }
    @GetMapping("/fechasP/{fecha1}/{fecha2}/{nombreP}")
    public ResponseEntity<List<ItemProyecto>> entreFechasProducto(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreP") String nombreP) throws Exception {
        System.out.println(nombreP);
        List<ItemProyecto> itemProyecto = serviceItemProyecto.entreFechas(fecha1,fecha2,nombreP);
        return new ResponseEntity<>(itemProyecto,HttpStatus.OK);
    }
}
