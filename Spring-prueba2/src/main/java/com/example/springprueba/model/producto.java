package com.example.springprueba.model;

import com.example.springprueba.model.codificadores.deposito;
import com.example.springprueba.model.codificadores.unidades;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
@Entity(name = "producto")
@Data
@AllArgsConstructor

public class producto implements Serializable { //que es precio medio
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double invinicial;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double costo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double precio;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double preciome;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double costome;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer utilidad;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime fechaact;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String detalle;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String codigo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double ingresos;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String industria;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nombre;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double salidas;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String serial;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String marca;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String color;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String useract;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String tipo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double desctoa;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double desctob;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double desctoc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String modelo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String rutaArchivo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String rutaPortada;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String unidadS;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String urlArchivo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String urlPortada;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private double saldo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private double costoTotal;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private double utilidadInforme;
    @JsonIgnore
    @OneToMany(mappedBy = "producto",fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    List<itemProducto> itemProductosList;
    @JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @OneToMany(mappedBy = "producto",fetch = FetchType.LAZY)
    List<ItemProyecto> itemProyectoList;

    @ManyToOne()
    @JoinColumn(name = "unidad_id")
    //@JsonIgnore // ignora en esta clase pero en la clase unidades no la ignora sino que la llama.
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private unidades unidad;
    /*@JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @OneToMany(mappedBy = "producto",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<deposito> depositoList ;*/
    /*@JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @OneToMany(mappedBy = "producto",fetch = FetchType.LAZY)
    private List<itemnotaventa> itemnotaventas;*/
    public producto(){};
    public producto(String nombre){
        this.nombre = nombre;
    }
    public producto(Long id,String codigo,String unidad,double invinicial, double costo, double costoTotal,String detalle, String marca,String modelo,String useract,String color, String tipo,double desctoa,double desctob, double desctoc, double ingresos, String nombre, double salidas,double saldo) {
        this.id = id;
        this.invinicial = invinicial;
        this.costo = costo;
        this.detalle = detalle;
        this.ingresos = ingresos;
        this.nombre = nombre;
        this.salidas = salidas;
        this.marca = marca;
        this.color = color;
        this.unidadS = unidad;
        this.useract = useract;
        this.costoTotal = costoTotal;
        this.tipo = tipo;
        this.desctoa = desctoa;
        this.desctob = desctob;
        this.desctoc = desctoc;
        this.modelo = modelo;
        this.saldo = saldo;
        this.codigo = codigo;
    }
    public producto(Long id, double invinicial, double costo, String detalle, String codigo, double ingresos, String nombre, double salidas, String marca, String color, String useract, String tipo, double desctoa, double desctob, double desctoc, String modelo, unidades unidad) {
        this.id = id;
        this.invinicial = invinicial;
        this.costo = costo;
        this.detalle = detalle;
        this.codigo = codigo;
        this.ingresos = ingresos;
        this.nombre = nombre;
        this.salidas = salidas;
        this.marca = marca;
        this.color = color;
        this.useract = useract;
        this.tipo = tipo;
        this.desctoa = desctoa;
        this.desctob = desctob;
        this.desctoc = desctoc;
        this.modelo = modelo;
        this.unidad = unidad;
    }
    public producto(Long id, String codigo, String detalle, String marca, String modelo, String color, String tipo, String nombre, String rutaPortada, Double precio){
        this.id= id;
        this.codigo = codigo;
        this.detalle=detalle;
        this.marca = marca;
        this.modelo= modelo;
        this.color = color;
        this.tipo = tipo;
        this.nombre = nombre;
        this.rutaPortada = rutaPortada;
        this.precio = precio;
    }

    @PrePersist
    private void asignarHora(){
        fechaact= LocalDateTime.now();
    }

}
