package com.example.springprueba.model.codificadores;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
@Entity(name = "zona")
@Data
public class zona implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
   // private Integer ciudad_id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name ="ciudad_id")
    private ciudad ciudad;
    @Transient
    private String Ciudad3;

    public zona(){}
    public zona(Long id, String codigo, String nombre, String ciudad) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        Ciudad3 = ciudad;
    }

    public zona(Long id, String codigo, String nombre, ciudad ciudad) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.ciudad =ciudad;
        //this.ciudad_id = ciudad_id;
    }

}
