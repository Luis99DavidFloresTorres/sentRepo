package com.example.springprueba.functions;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.service.ServiceItemProducto;
import com.example.springprueba.service.ServiceProducto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;

@Service
public class ProductsModules extends operationRestrict{
    private ServiceItemProducto serviceItemProducto;
    private ServiceProducto serviceProducto;
    public ProductsModules(ServiceItemProducto serviceItemProducto1, ServiceProducto serviceProducto){
        this.serviceItemProducto = serviceItemProducto1;
        this.serviceProducto=serviceProducto;
    }
    public List<itemProducto> productoPeriodoC(List<itemProducto> itemProductosP, Date fecha){

        return this.restrictProductoIdDates(itemProductosP, fecha);
    }
    public List<itemProducto> periodoEntre2Fechas(List<itemProducto> itemProductosP, Date fecha,Date fecha2){

        return this.restrictProductoIdDatesEntre2Fechas(itemProductosP, fecha, fecha2);
    }
    public List<itemProducto> periodoEntre2FechasProducto(List<itemProducto> itemProductosP, Date fecha,Date fecha2, producto producto){

        return this.restrictProductoIdDatesEntre2FechasProductos(itemProductosP, fecha, fecha2, producto);
    }
    public List<itemProducto> kardexProductoEntre2Fechas(List<itemProducto> itemProductosP, Date fecha,Date fecha2){
        List<itemProducto> it = this.kardexProductoEntre2F(itemProductosP, fecha, fecha2);
        return it;
    }
    public List<itemProducto> kardexOnlyDateC(List<itemProducto> itemProductosP, Date fecha) {
        return this.kardexProductoDate(itemProductosP, fecha);
    }
    public List<itemProducto> kardexOnlyNameC(List<itemProducto> itemProductosP, String nombre) {
        List<itemProducto> prueba = this.kardexByOnlyName(itemProductosP, nombre);
        return prueba;
    }
    public List<itemProducto> kardexNameDateC(List<itemProducto> itemProductosP, Date fecha) {
        return this.kardexProductByNameDate(itemProductosP, fecha);
    }
        public List<itemProducto> ivaPreciosValoradoC(Date fecha){
        List<itemProducto> itemProductos = serviceItemProducto.obtenerNormal();
       /* for(itemProducto itemProductoF: itemProductos){
            itemProductoF.setIva(itemProductoF.getSaldo());
        }*/
        return this.ivaFechas(fecha, itemProductos);
    }
    public List<itemProducto> mayorSalidasDC(List<itemProducto> itemProductoList, Date fecha){
        List<itemProducto> resultado = this.mayorSalidasFecha(itemProductoList,fecha);
        return resultado;
    }
    public List<itemProducto> mayorIngresosFC(List<itemProducto> itemProductoList, Date fecha){
        return this.mayorIngresosFecha(itemProductoList,fecha);
    }
    public List<itemProducto> mayorSalidasNC(List<itemProducto> itemProductoList, String nombre){
        return this.mayorSalidasNombre(itemProductoList,nombre);
    }
    public List<itemProducto> mayorIngresosNC(List<itemProducto> itemProductoList, String nombre){
        return this.mayorIngresosNombre(itemProductoList,nombre);
    }public List<itemProducto> mayorSalidasFNC(List<itemProducto> itemProductoList,Date fecha, String nombre){
        return this.mayorSalidasNombreFecha(itemProductoList,nombre,fecha);
    }
    public List<itemProducto> mayorIngresosFNC(List<itemProducto> itemProductoList,Date fecha, String nombre){
        return this.mayorIngresosNombreFecha(itemProductoList,nombre,fecha);
    }
    public List<itemProducto> informesEntradasProductos(Date fechaDesde, Date fechaHasta, List<itemProducto> all){
        return this.informesEntradasProductos(all, fechaDesde, fechaHasta);
    }
    public List<itemProducto> informesEntradasProductosSinFactura(Date fechaDesde, Date fechaHasta, List<itemProducto> all){
        return this.informesEntradasProductosSinFactura(all, fechaDesde, fechaHasta);
    }
    public List<itemProducto> informesEntradasProductosConFactura(Date fechaDesde, Date fechaHasta, List<itemProducto> all){
        return this.informesEntradasProductosConFactura(all, fechaDesde, fechaHasta);
    }
    /*public void verificarDias(String dias){
        if(dias.equals("no")){
            verificarParametro()
        }else {

        }
    }
    public String verificarConDias(String fecha, String nombre){
        if(fecha.equals()){

        }
    }*/
    public String verificarParametro(String nombre, String fecha){//el nombre no incluye cambio porque es independiente a las fechas

        if(nombre.equals("")){// es como un filtro
            return "fecha";
        }else if(fecha.equals("")){// no hya fecha asi que no hay dias
            return "nombre";
        }else {
            return "fechaNombre";
        }
    }
    public List<producto> filterProductosConMovimientos(){
        List<itemProducto> itemProductoList = serviceItemProducto.productosConMovimientos();
        List<producto> productoList = new ArrayList<>();
       for (itemProducto itemProductoF: itemProductoList){
           producto producto = new producto();
           producto.setNombre(itemProductoF.getProductoNombre());
           productoList.add(producto);
       }
       return productoList;
    }
}
