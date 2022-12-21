package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/*@Entity(name ="nivelUsuario")
@Data
public class nivelUsuario  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String nombre;

    @OneToMany(mappedBy = "nivelUsuario",fetch = FetchType.LAZY, cascade =CascadeType.ALL, orphanRemoval = true)//relacion nivel usuario
    List<descripcionNivelUsuario> descripcionNivelUsuario;
}*/
