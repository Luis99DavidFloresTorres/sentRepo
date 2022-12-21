package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;

//@Entity(name = "proyecto_subproducto")
@Data
public class Proyecto_subproducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private producto producto;
    @ManyToOne
    @JoinColumn(name = "proyecto_productopadre_id")
    private Proyecto_productopadre proyecto_productopadre;
    private String nivel;
}
