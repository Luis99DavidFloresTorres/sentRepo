package com.example.springprueba.model.codificadores;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "ciudad")
@Data
public class ciudad implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String codigo;
    @ManyToOne//donde se encuentra el muchos un pais muchas ciudades
    @JoinColumn(name = "pais_id")
    private pais pais;
    @JsonIgnore
    @OneToMany(mappedBy = "ciudad")
    List<zona> zonas;
}
