package com.example.springprueba.functions.codigo;
/*
import com.example.springprueba.model.codigoProducto;

import java.util.ArrayList;
import java.util.List;

public abstract class AdministrarCodigo {
    private List<codigoProducto> codigoProductoList;
    public AdministrarCodigo(List<codigoProducto> codigoProductoList){
        this.codigoProductoList = codigoProductoList;
    }
    public int returnMayor(){
        int mayor = 0;
        for(codigoProducto codigos : codigoProductoList){
            int guionSpace = 0;

            for (int i = 0; i<codigos.getCodigo().length();i++){
                if(codigos.getCodigo().charAt(i)=='-'){
                    guionSpace = i;
                    System.out.println(i);
                };
            }

            Integer numero =  Integer.parseInt(codigos.getCodigo().substring(guionSpace+1, codigos.getCodigo().length())) ;
            System.out.println(numero);
            int numeroInt = Math.abs(numero.intValue());
            System.out.println(numeroInt);
            if(numeroInt>mayor){
                mayor = numeroInt;
            }
        }
       return mayor+1;
    }
    public List<codigoProducto> codigosLibres(){
        ArrayList<codigoProducto> nulos = new ArrayList<>();

        codigoProductoList.forEach(codigo->{
            if(codigo.getProductos().size()==0){
                nulos.add(codigo);
            }
        });
      return nulos;
    }
}
*/
