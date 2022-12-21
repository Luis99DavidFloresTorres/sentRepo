package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import javax.persistence.*;
@Data
@Entity(name = "itemcompra")
public class itemcompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double precio;
    private Integer cantidad;
    private String detalle;
    private Double monto;
    @Transient
    private Double costoTotal;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    producto producto;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "ordencompra_id")
    ordencompra ordencompra;
    public itemcompra(){};
    public itemcompra(ordencompra ordencompra, Double precio, Double monto){
        this.ordencompra=ordencompra;
        this.precio = precio;
        this.monto = monto;
    };
    public itemcompra(ordencompra ordencompra, Double costoTotal){
        this.ordencompra=ordencompra;
        this.costoTotal = costoTotal;
    };
    public itemcompra(ordencompra ordencompra, Double precio, Double monto, Integer cantidad, producto producto){
        this.ordencompra=ordencompra;
        this.precio = precio;
        this.monto = monto;
        this.cantidad = cantidad;
        this.producto = producto;
    };
}
