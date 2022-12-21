package com.example.springprueba.model.codificadores;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "gasto")
@Data
public class tipoGasto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String codigo;
    private double precio;
    private String tipo;
    private String useract;
    @ManyToOne
    @JoinColumn(name = "unidad_id")
    private unidades unidad;

}
