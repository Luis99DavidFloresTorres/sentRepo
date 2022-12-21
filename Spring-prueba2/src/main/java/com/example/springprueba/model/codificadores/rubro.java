package com.example.springprueba.model.codificadores;

import com.example.springprueba.model.producto;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "rubro")
@Data
public class rubro implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String detalle;
    private String nombre;
    @OneToMany(mappedBy = "unidad", fetch = FetchType.LAZY)
    private List<producto> productoList;
}
