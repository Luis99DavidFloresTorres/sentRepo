package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name = "itemproyecto")
@Data
public class ItemProyecto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double costo;

    private Double cantidad;

    private Double costocompra;

    private Double precioventa;//venta lo que vendes y compra lo que compras
    private Double entregaanterior;
    private Integer cantidadven;

    private Boolean compracf;

    private Integer cantidadentr;

    private String detalle;

    private Double utilidad;

    private Boolean ventacf;

    private Double taxtransp;

    private Boolean importa;

    private  String origen;

    private Double descto;

    private Double monto;

    private  Double tc;

   // private String nivel;
   // private String nombrePadre; // si es padre
    /*@ManyToOne
    @JoinColumn(name = "proyectoproductoshijos_id")
    private ProyectoProductosHijos proyectoProductosHijos;*/
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private producto producto;
    /*@ManyToOne
    @JoinColumn(name = "proyectoProductopadre_id")
    private Proyecto_productopadre proyecto_productopadre;*/
    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private proyecto proyecto;
    public ItemProyecto(){}
    public ItemProyecto(Long id, Double costo){
        this.id= id;
        this.costo = costo;
    }
    public ItemProyecto(Long id, Double costo, Double cantidad, Double costocompra, Double precioventa) {
        this.id = id;
        this.costo = costo;
        this.cantidad = cantidad;
        this.costocompra = costocompra;
        this.precioventa = precioventa;
    }

}
