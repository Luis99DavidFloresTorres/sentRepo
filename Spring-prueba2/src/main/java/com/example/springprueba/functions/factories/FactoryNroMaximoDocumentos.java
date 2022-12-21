package com.example.springprueba.functions.factories;

import com.example.springprueba.functions.ultimoNro.*;
import org.springframework.stereotype.Service;

@Service
public class FactoryNroMaximoDocumentos {
    private NotaVentaMaximo notaVentaMaximo;
    private Salidas salidas;
    private Entradas entradas;
    private OrdenCompraMaximo ordenCompraMaximo;
    private ProyectoNroPrjMaximo proyectoNroPrjMaximo;
    public FactoryNroMaximoDocumentos(NotaVentaMaximo notaVentaMaximo, Salidas salidas, Entradas entrada, OrdenCompraMaximo ordenCompra, ProyectoNroPrjMaximo proyectoNroPrjMaximo){
        this.notaVentaMaximo = notaVentaMaximo;
        this.salidas = salidas;
        this.entradas = entrada;
        this.ordenCompraMaximo = ordenCompra;
        this.proyectoNroPrjMaximo = proyectoNroPrjMaximo;
    }
    public INumerosMaximos nombreDocumento(String nombreDocumento){
        if(nombreDocumento.equals("salidas")){
            return salidas;
        }else if(nombreDocumento.equals("notaventa")){
            return notaVentaMaximo;
        }else if(nombreDocumento.equals("entradas")){
            return entradas;
        }else if(nombreDocumento.equals("ordencompra")){
            return ordenCompraMaximo;
        }else if(nombreDocumento.equals("proyecto")){
            return proyectoNroPrjMaximo;
        }
        else{
            return null;
        }

    }
}
