package com.example.springprueba.functions.facades;

import com.example.springprueba.functions.DepositoModules;
import com.example.springprueba.functions.factories.DepositoFactoryProducto;
import com.example.springprueba.model.itemProducto;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
@Service
public class DepositoFacade {
    private DepositoFactoryProducto depositoFactoryProducto;
    private DepositoModules depositoModules;
    public DepositoFacade(DepositoFactoryProducto depositoFactoryProducto, DepositoModules depositoModules){
        this.depositoFactoryProducto = depositoFactoryProducto;
        this.depositoModules = depositoModules;
    }
    public List<itemProducto> getIngresos(String nombre, String fecha, String depositoNombre) throws ParseException {
        String result = depositoModules.verificarParametro(nombre, fecha);

        List<itemProducto> listIngresos =  depositoFactoryProducto.returnMayorIngresos(result,fecha,nombre, depositoNombre);
        return listIngresos;
    }
    public List<itemProducto> getIngresosOperaciones(String operaciones, String fecha) throws ParseException {
        String result = depositoModules.verificarParametroOperaciones(operaciones, fecha);
        List<itemProducto> listIngresos =  depositoFactoryProducto.returnMayorIngresosOperaciones(result,fecha,operaciones);
        return listIngresos;
    }
    public List<itemProducto> getSalidas(String nombre, String fecha, String depositoNombre) throws ParseException {
        String result = depositoModules.verificarParametro(nombre, fecha);
        List<itemProducto> listSalidas =  depositoFactoryProducto.returnMayorSalidas(result,fecha,nombre, depositoNombre);
        return listSalidas;
    }
    public List<itemProducto> getKardex(String nombre, String fecha, String depositoNombre) throws ParseException {
        String result = depositoModules.verificarParametro(nombre, fecha);
        List<itemProducto> listSalidas =  depositoFactoryProducto.returnKardex(result,fecha,nombre, depositoNombre);
        return listSalidas;
    }
}
