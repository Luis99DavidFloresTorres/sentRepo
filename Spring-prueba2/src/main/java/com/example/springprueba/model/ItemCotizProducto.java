package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name = "itemcotizprod")
@Data
public class ItemCotizProducto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double precio;
    private Double preciome;
    private Double cantidad;
    private String detalle;
    private Double monto;
    @ManyToOne
    @JoinColumn(name = "cotizproducto_id")
    private cotizProducto cotizProducto;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private producto producto;

    public ItemCotizProducto(){

    }
    public ItemCotizProducto(cotizProducto cotizProducto, producto producto, Double precio, Double cantidad){
        this.cotizProducto = cotizProducto;
        this.producto=producto;
        this.monto=precio*cantidad;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}
