package com.example.springprueba.functions;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.service.ServiceItemProducto;
import com.example.springprueba.service.ServiceProducto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
@Service
public class DepositoModules extends depositoAbstractOperations{
    private ServiceItemProducto serviceItemProducto;
    private ServiceProducto serviceProducto;
    public DepositoModules(ServiceItemProducto serviceItemProducto1, ServiceProducto serviceProducto){
        this.serviceItemProducto = serviceItemProducto1;
        this.serviceProducto=serviceProducto;
    }
    public List<itemProducto> depositoMayorSalidasFC(List<itemProducto> itemProductoList, Date fecha, String depositoNombre){
        List<itemProducto> resultado = this.mayorSalidasFecha(itemProductoList,fecha, depositoNombre);
        return resultado;
    }
    public List<itemProducto> periodoEntre2Fechas(List<itemProducto> itemProductosP, Date fecha,Date fecha2){

        return this.restrictProductoIdDatesEntre2Fechas(itemProductosP, fecha, fecha2);
    }
    public List<itemProducto> periodoEntre2FechasProducto(List<itemProducto> itemProductosP, Date fecha,Date fecha2, producto producto, String depositoNombre){

        return this.restrictProductoIdDatesEntre2FechasProductos(itemProductosP, fecha, fecha2, depositoNombre,producto);
    }
    public List<itemProducto> kardexProductoEntre2Fechas(List<itemProducto> itemProductosP, Date fecha,Date fecha2){
        List<itemProducto> it = this.kardexProductoEntre2F(itemProductosP, fecha, fecha2);
        return it;
    }
    public List<itemProducto> depositoMayorIngresosFC(List<itemProducto> itemProductoList, Date fecha, String depositoNombre){
        return this.mayorIngresosFecha(itemProductoList,fecha, depositoNombre);
    }
    public List<itemProducto> depositoMayorSalidasNC(List<itemProducto> itemProductoList, String nombre, String depositoNombre){
        return this.mayorSalidasNombre(itemProductoList,nombre, depositoNombre);
    }
    public List<itemProducto> depositoMayorIngresosNC(List<itemProducto> itemProductoList, String nombre, String depositoNombre){
        return this.mayorIngresosNombre(itemProductoList,nombre, depositoNombre);
    }public List<itemProducto> depositoMayorSalidasFNC(List<itemProducto> itemProductoList,Date fecha, String nombre, String depositoNombre){
        return this.mayorSalidasNombreFecha(itemProductoList,nombre,fecha, depositoNombre);
    }
    public List<itemProducto> depositoMayorIngresosFNC(List<itemProducto> itemProductoList,Date fecha, String nombre, String depositoNombre){
        return this.mayorIngresosNombreFecha(itemProductoList,nombre,fecha, depositoNombre);
    }
    public List<itemProducto> depositoKardexDate(List<itemProducto> itemProductoList, Date fechaCliente, String nombreDeposito){
        return this.kardexDate(itemProductoList,fechaCliente,nombreDeposito);
    }
    public List<itemProducto> depositoKardexByOnlyName(List<itemProducto> itemProductoList, String productoNombre, String depositoNombre){
        return this.kardexByOnlyName(itemProductoList,productoNombre,depositoNombre);
    }
    public List<itemProducto> warehouseKardexByNameProduct(List<itemProducto> itemProductoList, Date date){
        return this.kardexProductByNameDate(itemProductoList, date);
    }
    public String verificarParametro(String nombre, String fecha){//el nombre no incluye cambio porque es independiente a las fechas

        if(nombre.equals("")){// es como un filtro
            return "fecha";
        }else if(fecha.equals("")){// no hya fecha asi que no hay dias
            return "nombre";
        }else {
            return "fechaNombre";
        }
    }
    public String verificarParametroOperaciones(String operacion, String fecha){//el nombre no incluye cambio porque es independiente a las fechas

        if(operacion.equals("")){// es como un filtro
            return "fecha";
        }else if(fecha.equals("")){// no hya fecha asi que no hay dias
            return "operacion";
        }else {
            return "fechaOperacion";
        }
    }
}
