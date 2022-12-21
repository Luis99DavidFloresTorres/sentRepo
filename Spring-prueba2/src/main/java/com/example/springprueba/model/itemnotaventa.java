package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity(name = "itemventa")
@Data
public class itemnotaventa implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double precio;
    private Integer cantidad;
    private Double subtotal;
    private Integer cantidadpend;
    private Double descto;
    @Transient
    private Double precioTotal;
    @Transient
    private Double utilidad;

    @Transient
    private Double impuestoReservado;
    @Transient
    private Double costoTotal;
    @Transient
    private Double totalComision;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "notaventa_id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private notaventa notaventa;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    producto producto;
    public itemnotaventa(){};
    public itemnotaventa(Double precioTotal, Double costo,notaventa nt, Integer cantidad){
        this.precioTotal = precioTotal;
        this.notaventa=nt;
        this.impuestoReservado = 0.0;
        this.cantidad = cantidad;
        this.costoTotal = costo * this.cantidad;
        this.utilidad =0.0;
    };
    public itemnotaventa(Double precioTotal, Double costo,notaventa nt, Integer cantidad, Integer cantpend){
        this.precioTotal = precioTotal;
        this.notaventa=nt;
        this.impuestoReservado = 0.0;
        this.cantidad = cantidad;
        this.costoTotal = costo * this.cantidad;
        this.utilidad =0.0;
    };
    public itemnotaventa(Double precioTotal, producto producto, notaventa nt, Integer cantidad, Double precio){
        this.precio = precio;
        this.precioTotal = precio*cantidad;
        this.notaventa=nt;
        this.producto = producto;
        this.impuestoReservado = this.precioTotal*0.16;
        this.cantidad  = cantidad;

        if(Objects.isNull(this.cantidad)){
            this.cantidad =0;
        }
        this.costoTotal = this.producto.getCosto() * this.cantidad;
        this.utilidad = this.precioTotal-this.costoTotal;
    };

}

