package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity(name = "proyecto")
@Data
public class proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String observaciones;
    private String detalle;
    private String nombre;
    private Double totalpregastos;
    private String ciudad;
    private Date fecha;
    private Date fechaini;
    private Date fechafin;
    private Double totalutilbruta;
    private Double totaltaxtransporte;
    private Integer ultimacot;
    private Double montome;
    private Integer nroprj;
    private Double tc;
    private Double comisionban;
    private Double comisioncon;
    private String estado;
    private Double totaltributos;
    private Double totalutilneta;
    private Double totalventas;
    private Integer operprj;
    private Double porcsociedad;
    private String responsable;
    private String useract;
    private Date fechaact;
    private Date fecharet;
    private Date fechacob;
    private Double montoret;
    private Double montocob;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private cliente cliente;

    private Boolean perdida;

    private Integer alertaporc;

    private Double ejecucionfisica;

    private Double ejecuciongastos;

    private Double ejecucionproductos;

    private Double ejecucionventas;
    private Double ejecucionfinanciera;
    private String entrega;

    private String impuestos;

    private String validez;

    private String formapago;

    private String garantia;
    private String contactopre;
    @Transient
    private double gastoPrevisto;
    @Transient
    private double impuestoReservado;
    @Transient
    private double gastoEjecutado;
    @Transient
    private double costoTotalCompra;
    @Transient
    private double precioProyecto;
    @Transient
    private double utilidadSupuesto;
    private String nota;
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    @JsonIgnore
    List<cotizacion> cotizacionList;
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    @JsonIgnore
    List<notaventa> notaventaList;
    @OneToMany(mappedBy = "proyecto")
    @JsonIgnore
    List<transactionProduct> transactionProductList;

    public proyecto(){

    }

    public proyecto(String estado){
        this.estado = estado;
    }
    public proyecto(String nombre,int estado, int respon){
        this.nombre = nombre;
    }
    public proyecto(String estado,String responsable){
        this.responsable = responsable;
        this.estado = estado;
    }
}
