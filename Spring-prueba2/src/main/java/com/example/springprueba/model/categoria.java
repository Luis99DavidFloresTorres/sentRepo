package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "categoria")
@Data
public class categoria implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
}
