package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "activofijo")
@Data
public class activoFijo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double preciome;
    private String nombre;
    private String codigo;
    private Date fechaing;
    private String estado;
    private Double precio;
    private String situacion;
    private String tipo;
    private String useract;
    private String unidad;
    private String detalle;
    private Date fechaact;
}
