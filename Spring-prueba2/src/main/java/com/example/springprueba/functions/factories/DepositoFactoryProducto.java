package com.example.springprueba.functions.factories;

import com.example.springprueba.functions.DepositoModules;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.service.ServiceItemProducto;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class DepositoFactoryProducto {
    private ServiceItemProducto serviceItemProducto;
    private DepositoModules depositoModules;
    public DepositoFactoryProducto(ServiceItemProducto serviceItemProducto1, DepositoModules depositoModule){
        this.serviceItemProducto = serviceItemProducto1;
        this.depositoModules = depositoModule;
    }
    public List<itemProducto> returnMayorIngresos(String consulta, String fecha, String nombre, String depositoNombre) throws ParseException {

        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
            //LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorIngresos();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorIngresosFC(itemProductoList,date1, depositoNombre);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorIngresos();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorIngresosNC(itemProductoList,nombre, depositoNombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorIngresos();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorIngresosFNC(itemProductoList,date1, nombre, depositoNombre);
            return itemProductoList1;
        }
    }
    public List<itemProducto> returnMayorIngresosOperaciones(String consulta, String fecha, String operaciones) throws ParseException {

        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
            //LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorIngresos();
            List<itemProducto> itemProductoList1 = depositoModules.operation(date1,operaciones, itemProductoList);
            return itemProductoList1;
        }else if(consulta.equals("operacion")){
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorIngresos();
            //List<itemProducto> itemProductoList1 = depositoModules.depositoMayorIngresosNC(itemProductoList,nombre, depositoNombre);
            return itemProductoList;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
          //  LocalDateTime date1 = LocalDateTime.parse(date0.toString());

            List<itemProducto> itemProductoList = serviceItemProducto.operacionesDeposito();
            List<itemProducto> itemProductoList1 = depositoModules.operation(date1,operaciones, itemProductoList);
            return itemProductoList1;
        }
    }
    public List<itemProducto> returnMayorSalidas(String consulta, String fecha, String nombre, String depositoNombre) throws ParseException {

        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());

            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorSalidas();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorSalidasFC(itemProductoList,date1, depositoNombre);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorSalidas();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorSalidasNC(itemProductoList,nombre, depositoNombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoMayorSalidas();
            List<itemProducto> itemProductoList1 = depositoModules.depositoMayorSalidasFNC(itemProductoList,date1, nombre, depositoNombre);
            return itemProductoList1;
        }
    }
    public List<itemProducto> returnKardex(String consulta, String fecha, String productoNombre, String depositoNombre) throws ParseException {
        if(consulta.equals("fecha")){
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
           // LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoKardex();
            List<itemProducto> itemProductoList1 = depositoModules.depositoKardexDate(itemProductoList,date1, depositoNombre);
            return itemProductoList1;
        }else if(consulta.equals("nombre")){
            List<itemProducto> itemProductoList = serviceItemProducto.depositoKardex();
            List<itemProducto> itemProductoList1 = depositoModules.depositoKardexByOnlyName(itemProductoList,productoNombre, depositoNombre);
            return itemProductoList1;
        }else {
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
            Date date1 = dateFormat.parse(fecha);
         //   LocalDateTime date1 = LocalDateTime.parse(date0.toString());
            List<itemProducto> itemProductoList = serviceItemProducto.depositoKardexNombreProducto(productoNombre, depositoNombre);
            List<itemProducto> itemProductoList1 = depositoModules.warehouseKardexByNameProduct(itemProductoList,date1);
            return itemProductoList1;
        }
    }
}
