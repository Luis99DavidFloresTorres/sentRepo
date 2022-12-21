package com.example.springprueba.functions.facades;


import com.example.springprueba.functions.ProductsModules;
import com.example.springprueba.functions.factories.FactoryProducto;
import com.example.springprueba.functions.operationRestrict;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Objects;
import java.util.function.DoubleUnaryOperator;

@Service
public class FacadeProducto extends operationRestrict {
    private FactoryProducto factoryProducto;
    private ProductsModules productsModules;
    private RepoProducto repoProducto;
    public FacadeProducto(FactoryProducto factoryProducto, ProductsModules productsModules, RepoProducto repoProducto){
        this.factoryProducto = factoryProducto;
        this.productsModules = productsModules;
        this.repoProducto = repoProducto;
    }
    public List<itemProducto> getIngresos(String nombre, String fecha) throws ParseException {
        String result = productsModules.verificarParametro(nombre, fecha);
        List<itemProducto> listIngresos =  factoryProducto.returnMayorIngresos(result,fecha,nombre);
        return listIngresos;
    }
    public List<itemProducto> getSalidas(String nombre, String fecha) throws ParseException {
        String result = productsModules.verificarParametro(nombre, fecha);

        List<itemProducto> listSalidas =  factoryProducto.returnMayorSalidas(result,fecha,nombre);
        return listSalidas;
    }
    public List<itemProducto> getKardex(String nombre, String fecha) throws ParseException {
        String result = productsModules.verificarParametro(nombre, fecha);
        List<itemProducto> listSalidas =  factoryProducto.returnKardex(result,fecha,nombre);
        return listSalidas;
    }
    public void costoPromedioActualizar(List<itemProducto> itemProducto){
        for (itemProducto item: itemProducto){
            producto producto = item.getProducto();
            Integer oper = item.getTransproducto().getOper();
            if(oper < 320){
                Double entradas = 0.0;
                if(Objects.isNull(producto.getIngresos())){
                    entradas= producto.getIngresos();
                }

                Double salidas = producto.getSalidas();
                Double invinicial = producto.getInvinicial();
                Double saldo = entradas + invinicial - salidas;
                Double costoTotalSinItemCantidad = producto.getCosto()*saldo.intValue();
                Integer nuevaCantidad = item.getCantidad()+ saldo.intValue();
                Double costoTotalItemCantidad = item.getCosto() * item.getCantidad();
                Double costoPromedio=(costoTotalItemCantidad + costoTotalSinItemCantidad) / nuevaCantidad;

                producto.setCosto(costoPromedio);
                producto.setCostome(costoPromedio / 6.96);
                Double precioNuevo =costoPromedio*(producto.getUtilidad()/100);
                producto.setPrecio(precioNuevo);
                producto.setPreciome(precioNuevo/6.96);
                producto.setIngresos(entradas+item.getCantidad());
            }else{
                producto.setSalidas(item.getCantidad()+producto.getSalidas());
            }
            this.repoProducto.save(producto);
        }
    }

}
