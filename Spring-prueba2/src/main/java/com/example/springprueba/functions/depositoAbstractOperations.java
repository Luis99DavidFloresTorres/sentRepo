package com.example.springprueba.functions;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public abstract class depositoAbstractOperations {
    public List<itemProducto> mayorIngresosFecha(List<itemProducto> itemProductoList, Date fecha, String depositoNombreRequerido){
        List<itemProducto> fechasItemProduct = itemProductosFechaClienteHaciaDelante(fecha, itemProductoList);
        List<itemProducto> returnList = new ArrayList<>();
        for (itemProducto itemProductoF: fechasItemProduct){
            Integer ope = itemProductoF.getOpe();
            String depositoNombre = itemProductoF.getDepositoNombre();
            if(ope<320 && depositoNombreRequerido.equals(depositoNombre)){
                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setCostoTotal(0.0);
                itemProductoF.setDepositoNombre(null);
                itemProductoF.setIngresos(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }

    public List<itemProducto> mayorIngresosNombre(List<itemProducto> itemProductoList, String nombre, String depositoNombreRequerido){
        List<itemProducto> fechasItemProduct = equalName(nombre, itemProductoList);

        List<itemProducto> returnList = new ArrayList<>();
        for (itemProducto itemProductoF: fechasItemProduct){
            Integer ope = itemProductoF.getOpe();
            String depositoNombre = itemProductoF.getDepositoNombre();
            if(ope<320 && depositoNombreRequerido.equals(depositoNombre)){
                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setCostoTotal(0.0);
                itemProductoF.setIngresos(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }
    public List<itemProducto> restrictProductoIdDatesEntre2Fechas(List<itemProducto> itemProductosP, Date fecha, Date fecha2){
        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Double invinicial = 0.0;
        Double salidas = 0.0;
        Double ingresos = 0.0;
        Long id = itemProductosP.get(0).getProducto().getId();
        fecha2.setHours(23);
        Integer contador = 0;
        for (itemProducto itemProductoF : itemProductosP) {
            Integer operation = itemProductoF.getOpe();
            Long idProd = itemProductoF.getProducto().getId();
            Date fechaTransproducto = itemProductoF.getFechaact();
                if (idProd == id) {
                    if (rangoMenorDeFechas(fecha, fechaTransproducto)) {
                        invinicial = lessThan320Inicial(operation, itemProductoF, invinicial);
                    } else if((fechaTransproducto.before(fecha2)) || (fecha2.equals(fechaTransproducto)) ){
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }

                } else {
                    id = idProd;
                    returnArraylistProduct = saveValuesInvSalIngSald(itemProductosP.get(contador-1), ingresos, salidas, invinicial, returnArraylistProduct);
                    invinicial = 0.0;
                    ingresos = 0.0;
                    salidas = 0.0;
                    if (fecha.after(fechaTransproducto)) {
                        invinicial = lessThan320Inicial(operation, itemProductoF, invinicial);
                    }else if(fechaTransproducto.before(fecha2) || fecha2.equals(fechaTransproducto)){
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }
                }
                contador++;

        }
        //en la ultima iteracion ya no entra al else es por eso que agregamos al final de todo una vez mas

            itemProducto lastItemProduct = itemProductosP.get(contador-1);
            lastItemProduct.setInvinicial(invinicial);
            lastItemProduct.setSalidas(salidas);
            lastItemProduct.setIngresos(ingresos);
            lastItemProduct.setSaldo(ingresos+invinicial-salidas);
            returnArraylistProduct.add(lastItemProduct);
        return returnArraylistProduct;
    }
    public List<itemProducto> mayorIngresosNombreFecha(List<itemProducto> itemProductoList, String nombre, Date fecha, String depositoNombreRequerido){
        List<itemProducto> itemProductos = equalNameDateForward(fecha,nombre,itemProductoList);
        List<itemProducto> returnList = new ArrayList<>();
        for (itemProducto itemProductoF: itemProductos){
            Integer ope = itemProductoF.getOpe();
            if(ope<320){
                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setIngresos(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }
    public List<itemProducto> mayorSalidasNombreFecha(List<itemProducto> itemProductoList, String nombre, Date fecha, String depositoNombreRequerido){
        List<itemProducto> itemProductos = equalNameDateForward(fecha,nombre,itemProductoList);
        List<itemProducto> returnList = new ArrayList<>();
        for (itemProducto itemProductoF: itemProductos){
            Integer ope = itemProductoF.getOpe();
            String depositoNombre = itemProductoF.getDepositoNombre();
            if(ope>320 && depositoNombreRequerido.equals(depositoNombre)){

                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setSalidas(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }
    public List<itemProducto> mayorSalidasFecha(List<itemProducto> itemProductoList, Date fecha, String depositoNombreRequerido){
        List<itemProducto> fechasItemProduct = itemProductosFechaClienteHaciaDelante(fecha, itemProductoList);
        List<itemProducto> returnList = new ArrayList<>();
        for (itemProducto itemProductoF: fechasItemProduct){
            Integer ope = itemProductoF.getOpe();
            String depositoNombre = itemProductoF.getDepositoNombre();
            if(ope>320 && depositoNombreRequerido.equals(depositoNombre)){

                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setSalidas(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }
    public List<itemProducto> saveValuesInvSalIngSald(itemProducto itemProducto, Double ingresos, Double salidas, Double invinicial, List<itemProducto> agregarList) {
        itemProducto.setIngresos(ingresos);
        itemProducto.setSalidas(salidas);
        itemProducto.setInvinicial(invinicial);
        itemProducto.setSaldo(ingresos+invinicial-salidas);

        agregarList.add(itemProducto);
        return agregarList;
    }
    public List<itemProducto> mayorSalidasNombre(List<itemProducto> itemProductoList, String nombre, String depositoNombreRequerido){

        List<itemProducto> fechasItemProduct = equalName(nombre, itemProductoList);
        List<itemProducto> returnList = new ArrayList<>();

        for (itemProducto itemProductoF: fechasItemProduct){
            Integer ope = itemProductoF.getOpe();
            String depositoNombre = itemProductoF.getDepositoNombre();
            if(ope>320 && depositoNombreRequerido.equals(depositoNombre)){
                Double cantidad =Double.valueOf(itemProductoF.getCantidad()) ;
                itemProductoF.setSalidas(cantidad);
                returnList.add(itemProductoF);
            }
        }
        return  returnList;
    }
    public List<itemProducto> kardexByOnlyName(List<itemProducto> itemProductosP, String productoNombre, String depositoNombre) {
        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Double saldo = 0.0;
        for (itemProducto itemProductoF : itemProductosP) {
            Double invinicial = 0.0;
            Double salidas = 0.0;
            Double ingresos = 0.0;
            Integer operation = itemProductoF.getOpe();
            String nombreG= itemProductoF.getNombre();
            String depositoName = itemProductoF.getDepositoNombre();
            if((productoNombre.equals(nombreG))&&(depositoNombre.equals(depositoName)) ){
                ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                itemProductoF.setInvinicial(invinicial);
                itemProductoF.setProducto_id(itemProductoF.getProducto_id());
                itemProductoF.setSalidas(salidas);
                itemProductoF.setIngresos(ingresos);
                saldo +=invinicial+ingresos-salidas;
                itemProductoF.setSaldo(saldo);
                returnArraylistProduct.add(itemProductoF);
            }
        }
        return returnArraylistProduct;
    }
    public List<itemProducto> kardexProductByNameDate(List<itemProducto> itemProductosP, Date fecha){
        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Double saldo = 0.0;
        for (itemProducto itemProductoF : itemProductosP) {
            Double invinicial = 0.0;
            Double salidas = 0.0;
            Double ingresos = 0.0;
            Integer operation = itemProductoF.getOpe();
            Date fechaTransproducto = itemProductoF.getFechaact();
            if (rangoMenorDeFechas(fecha, fechaTransproducto)) {
                invinicial =lessThan320Inicial(operation,itemProductoF,invinicial);
            } else {
                ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
            }
            itemProductoF.setInvinicial(invinicial);
            itemProductoF.setProducto_id(itemProductoF.getProducto_id());
            itemProductoF.setSalidas(salidas);
            itemProductoF.setIngresos(ingresos);
            saldo +=invinicial+ingresos-salidas;
            itemProductoF.setSaldo(saldo);
            returnArraylistProduct.add(itemProductoF);
        }
        return returnArraylistProduct;
    }
    public List<itemProducto> kardexDate(List<itemProducto> itemProductosP, Date fecha, String nombreAlmacen) {
        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Long idP = itemProductosP.get(0).getProducto_id();
        Double saldo = 0.0;
        for (itemProducto itemProductoF : itemProductosP) {
            Double invinicial = 0.0;
            Double salidas = 0.0;
            Double ingresos = 0.0;
            Integer operation = itemProductoF.getOpe();
            Long idProductoFor= itemProductoF.getProducto_id();
            String nombreDeposito = itemProductoF.getDepositoNombre();
            if(nombreAlmacen.equals(nombreDeposito)){
                if(idP.equals(idProductoFor)){
                    Date fechaTransproducto = itemProductoF.getFechaact();
                    if (rangoMenorDeFechas(fecha, fechaTransproducto)) {
                        invinicial =lessThan320Inicial(operation,itemProductoF,invinicial);
                    } else {
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }
                    itemProductoF.setInvinicial(invinicial);
                    itemProductoF.setProducto_id(itemProductoF.getProducto_id());
                    itemProductoF.setSalidas(salidas);
                    itemProductoF.setIngresos(ingresos);
                    saldo +=invinicial+ingresos-salidas;
                    itemProductoF.setSaldo(saldo);
                    returnArraylistProduct.add(itemProductoF);
                }else{
                    saldo=0.0;
                    idP=itemProductoF.getProducto_id();
                    Date fechaTransproducto = itemProductoF.getFechaact();
                    if (rangoMenorDeFechas(fecha, fechaTransproducto)) {
                        invinicial =lessThan320Inicial(operation,itemProductoF,invinicial);
                    } else {
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }
                    itemProductoF.setInvinicial(invinicial);
                    itemProductoF.setProducto_id(itemProductoF.getProducto_id());
                    itemProductoF.setSalidas(salidas);
                    itemProductoF.setIngresos(ingresos);
                    saldo +=invinicial+ingresos-salidas;
                    itemProductoF.setSaldo(saldo);
                    returnArraylistProduct.add(itemProductoF);
                }
            }


        }
        return returnArraylistProduct;
    }
    public List<itemProducto> kardexProductoEntre2F(List<itemProducto> itemProductosP, Date fechaInicio, Date fechaFinal){
           //     nos quedamos aqui, los saldos no se adecuan al resultado de solo fecha, los invinicial se van de ingresos y viceversa

        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Long idP = itemProductosP.get(0).getProducto_id();
        Double saldo = 0.0;
        for (itemProducto itemProductoF : itemProductosP) {
            Double invinicial = 0.0;
            Double salidas = 0.0;
            Double ingresos = 0.0;
            Integer operation = itemProductoF.getOpe();
            Long idProductoFor= itemProductoF.getProducto_id();

            if(idP.equals(idProductoFor)){
                Date fechaTransproducto = itemProductoF.getFechaact();
                if ((fechaTransproducto.before(fechaFinal)|| fechaTransproducto.equals(fechaFinal))&&(fechaTransproducto.equals(fechaInicio)|| fechaInicio.after(fechaTransproducto))) {
                    invinicial =lessThan320Inicial(operation,itemProductoF,invinicial);
                } else {
                    ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                    salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                }
                itemProductoF.setInvinicial(invinicial);
                itemProductoF.setProducto_id(itemProductoF.getProducto_id());
                itemProductoF.setSalidas(salidas);
                itemProductoF.setIngresos(ingresos);
                saldo +=invinicial+ingresos-salidas;
                itemProductoF.setSaldo(saldo);
                returnArraylistProduct.add(itemProductoF);
            }else{
                saldo=0.0;
                idP=itemProductoF.getProducto_id();
                Date fechaTransproducto = itemProductoF.getFechaact();
                if ((fechaTransproducto.before(fechaFinal)|| fechaTransproducto.equals(fechaFinal))&&(fechaTransproducto.equals(fechaInicio)|| fechaTransproducto.after(fechaInicio))) {
                    invinicial =lessThan320Inicial(operation,itemProductoF,invinicial);
                } else {
                    ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                    salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                }
                itemProductoF.setInvinicial(invinicial);
                itemProductoF.setProducto_id(itemProductoF.getProducto_id());
                itemProductoF.setSalidas(salidas);
                itemProductoF.setIngresos(ingresos);
                saldo +=invinicial+ingresos-salidas;
                itemProductoF.setSaldo(saldo);
                returnArraylistProduct.add(itemProductoF);
            }

        }
        return returnArraylistProduct;
    }
    public List<itemProducto> restrictProductoIdDatesEntre2FechasProductos(List<itemProducto> itemProductosP, Date fecha, Date fecha2, String depositoNombre,producto producto){
        List<itemProducto> returnArraylistProduct = new ArrayList<>();
        Double invinicial = 0.0;
        Double salidas = 0.0;
        Double ingresos = 0.0;
        Long id = itemProductosP.get(0).getProducto().getId();
        fecha2.setHours(23);
        Integer contador = 0;
        for (itemProducto itemProductoF : itemProductosP) {
            Integer operation = itemProductoF.getTransproducto().getOper();
            Long idProd = itemProductoF.getProducto().getId();
            Date fechaTransproducto = itemProductoF.getTransproducto().getFecha();
            String nombreDeposito = itemProductoF.getTransproducto().getDeposito().getNombre();
            if(depositoNombre.equals(nombreDeposito)){
                if (idProd == id) {
                    if (rangoMenorDeFechas(fecha, fechaTransproducto) && producto.getId().equals(idProd) ) {
                        invinicial = lessThan320Inicial(operation, itemProductoF, invinicial);
                    } else if(fechaTransproducto.before(fecha2) || fecha2.equals(fechaTransproducto) ){
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }
                } else {
                    id = idProd;
                    returnArraylistProduct = saveValuesInvSalIngSald(itemProductosP.get(contador-1), ingresos, salidas, invinicial, returnArraylistProduct);
                    invinicial = 0.0;
                    ingresos = 0.0;
                    salidas = 0.0;
                    if (fecha.after(fechaTransproducto) && producto.getId().equals(idProd)) {
                        invinicial = lessThan320Inicial(operation, itemProductoF, invinicial);
                    }else if((fechaTransproducto.before(fecha2) || fecha2.equals(fechaTransproducto))&& producto.getId().equals(idProd) ){
                        ingresos = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "ingresos");
                        salidas = lessThan320SalidasIngresos(operation, itemProductoF, ingresos, salidas, "salidas");
                    }

                }
            }

            contador++;
        }
        //en la ultima iteracion ya no entra al else es por eso que agregamos al final de todo una vez mas
        if(depositoNombre.equals(itemProductosP.get(contador-1).getDepositoNombre())){
            itemProducto lastItemProduct = itemProductosP.get(contador-1);
            lastItemProduct.setInvinicial(invinicial);
            lastItemProduct.setSalidas(salidas);
            lastItemProduct.setIngresos(ingresos);
            lastItemProduct.setSaldo(ingresos+invinicial-salidas);
            returnArraylistProduct.add(lastItemProduct);
        }


        return returnArraylistProduct;
    }

    public boolean rangoMenorDeFechas(Date posterior, Date anterior){
        if(posterior.after(anterior)){
            return  true;
        }else {
            return false;
        }
    }
    public List<itemProducto> equalNameDateForward(Date clienteFecha, String nombre, List<itemProducto> vector){
        List<itemProducto> itemProductoList = new ArrayList<>();
        for(itemProducto itemProductoF: vector){
            Date fechaTransproducto = itemProductoF.getFechaact();
            if ((clienteFecha.before(fechaTransproducto) || clienteFecha.equals(fechaTransproducto)) && (nombre.equals(itemProductoF.getNombre()))) {
                itemProductoList.add(itemProductoF);
            }
        }
        return itemProductoList;
    }
    public List<itemProducto> equalName(String nombre, List<itemProducto> vector){

        List<itemProducto> itemProductoList=new ArrayList<>();

        for (itemProducto itemProductoF: vector){

            if(itemProductoF.getNombre().equals(nombre)){
                itemProductoList.add(itemProductoF);
            }
        }

        return itemProductoList;
    }
    public Double lessThan320Inicial(Integer operation, itemProducto itemProductoF, Double invinicial) {
        if (operation < 320) {
            invinicial += itemProductoF.getCantidad();
        } else {
            invinicial -= itemProductoF.getCantidad();
        }
        return invinicial;
    }
    public Double lessThan320SalidasIngresos(Integer operation, itemProducto itemProductoF, Double ingresos, Double salidas, String opcion) {

        if (operation < 320) {
            ingresos += itemProductoF.getCantidad();
        } else {
            salidas += itemProductoF.getCantidad();
        }
        if (opcion.equals("ingresos")) {
            return ingresos;
        } else {
            return salidas;
        }
    }
    public List<itemProducto> operation(Date clienteFecha, String operation, List<itemProducto> vector){
        Integer operationInt = Integer.valueOf(operation);
        List<itemProducto> itemProductoList = new ArrayList<>();
        for(itemProducto itemProductoF: vector){
            Date fechaTransproducto = itemProductoF.getFechaact();
            Integer operationItem = itemProductoF.getOpe();
            if ((clienteFecha.before(fechaTransproducto) || clienteFecha.equals(fechaTransproducto))&&(operationInt.equals(operationItem))) {
                itemProductoList.add(itemProductoF);
            }
        }
        return itemProductoList;
    }
    public List<itemProducto> itemProductosFechaClienteHaciaDelante(Date clienteFecha, List<itemProducto> vector){
        List<itemProducto> arrayFechas = new ArrayList<>();
        for(itemProducto itemProductoF: vector){
            Date fechaTransproducto = itemProductoF.getFechaact();
            if (clienteFecha.before(fechaTransproducto) || clienteFecha.equals(fechaTransproducto)) {

                arrayFechas.add(itemProductoF);
            }
        }
        return arrayFechas;
    }
}
