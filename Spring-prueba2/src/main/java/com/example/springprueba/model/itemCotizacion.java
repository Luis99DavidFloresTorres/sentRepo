package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name="itemcotizacion")
@Data
public class itemCotizacion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer cantidadven;
    private Boolean compracf;
    private Integer cantidadentr;
    private String noparte;
    private Double costo;
    private String detalle;
    private Double utilidad;
    private Double costopoliza;
    private Boolean ventacf;
    private Double taxtransp;
    private Double tc;
    private Integer cantidad;
    private Boolean importa;
    private Double porcimp;
    private Double otrosgastos;
    private Double comisionban;
    private Double comisioncon;
    private Double costofob;
    private Double transporteimp;
    private Double costocompra;
    private Double precioventa;
    private Double monto;
    @ManyToOne
    @JoinColumn(name="producto_id")
    private producto producto;
    @ManyToOne
    @JoinColumn(name="cotizacion_id")
    private cotizacion cotizacion;
    private Double descto;
}
