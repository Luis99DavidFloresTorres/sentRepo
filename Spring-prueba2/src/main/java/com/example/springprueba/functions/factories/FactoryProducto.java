package com.example.springprueba.functions.factories;

import com.example.springprueba.functions.ProductsModules;
import com.example.springprueba.functions.operationRestrict;
import com.example.springprueba.model.ItemCotizProducto;
import com.example.springprueba.model.cliente;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoTransproducto;
import com.example.springprueba.service.ServiceItemProducto;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class FactoryProducto extends operationRestrict {
    private ServiceItemProducto serviceItemProducto;
    private ProductsModules productsModules;
    private RepoItemProducto repoItemProducto;
    private RepoTransproducto repoTransproducto;
    public FactoryProducto(ServiceItemProducto serviceItemProducto1, ProductsModules productsModules1, RepoItemProducto repoItemProducto, RepoTransproducto repoTransproducto){
        this.serviceItemProducto = serviceItemProducto1;
        this.productsModules = productsModules1;
        this.repoTransproducto= repoTransproducto;
        this.repoItemProducto = repoItemProducto;
    }
    public List<itemProducto> returnMayorIngresos(String consulta, String fecha, String nombre) throws ParseException {

        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);

            List<itemProducto> itemProductoList = serviceItemProducto.mayorIngresos();
            int aux = 0;
            for(itemProducto it:itemProductoList){
                if(aux<it.getId().intValue()){
                    aux=it.getId().intValue();
                }
            }
            System.out.println(aux);
            List<itemProducto> itemProductoList1 = productsModules.mayorIngresosFC(itemProductoList,date1);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.mayorIngresos();
            List<itemProducto> itemProductoList1 = productsModules.mayorIngresosNC(itemProductoList,nombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.mayorIngresos();
            List<itemProducto> itemProductoList1 = productsModules.mayorIngresosFNC(itemProductoList,date1, nombre);
            return itemProductoList1;
        }
    }
    public List<itemProducto> returnMayorSalidas(String consulta, String fecha, String nombre) throws ParseException {

        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
          //  LocalDateTime date1 =LocalDateTime.of(date0.getYear(),date0.getMonth(),date0.getDay(),date0.getHours(),date0.getMinutes());

            List<itemProducto> itemProductoList = serviceItemProducto.mayorSalidas();
            List<itemProducto> itemProductoList1 = productsModules.mayorSalidasDC(itemProductoList,date1);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.mayorSalidas();
            List<itemProducto> itemProductoList1 = productsModules.mayorSalidasNC(itemProductoList,nombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.mayorSalidas();
            List<itemProducto> itemProductoList1 = productsModules.mayorSalidasFNC(itemProductoList,date1, nombre);
            return itemProductoList1;
        }
    }
    public List<itemProducto> returnKardex(String consulta, String fecha, String nombre) throws ParseException {
        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.kardexProducto();
            List<itemProducto> itemProductoList1 = productsModules.kardexOnlyDateC(itemProductoList,date1);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.kardexProducto();
            List<itemProducto> itemProductoList1 = productsModules.kardexOnlyNameC(itemProductoList, nombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
         //   LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.kardexByNamesDate(nombre);
            List<itemProducto> itemProductoList1 = productsModules.kardexNameDateC(itemProductoList,date1);
            return itemProductoList1;
        }
    }
    public List<itemProducto> entregaProductosPorCliente(Date fechaInicial, Date fechaFinal, cliente cliente){
        //System.out.println(cliente);
        List<transactionProduct> transproducto = repoTransproducto.findByCliente(cliente);
        List<itemProducto> listaClientes  = new ArrayList<>();
        for(transactionProduct i : transproducto) {
            //System.out.println(i.getId());
            listaClientes.addAll(this.repoItemProducto.findByTransproducto(i));
        }
        List<itemProducto> listaProductosPorClienteEntregados = null;
        if(listaClientes.size()>0){
            List<itemProducto> itemcompraEntreFechas = new ArrayList<>();// nos quedamos aqui
            for(itemProducto itemProductoFor: listaClientes){
                Date fechaCompra = itemProductoFor.getTransproducto().getFecha();
                if(((fechaCompra.after(fechaInicial)) || (fechaInicial.equals(fechaCompra))) && ((fechaCompra.before(fechaFinal)) || (fechaInicial.equals(fechaCompra)))){
                    itemcompraEntreFechas.add(itemProductoFor);
                }
            }
            listaProductosPorClienteEntregados = itemcompraEntreFechas;
        }
        return listaProductosPorClienteEntregados;
    }
}
