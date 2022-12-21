package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity(name="tipousuario")
@Data
public class tipoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String detalle;
    private LocalDate fechaact;
   /* @JsonIgnore
    @OneToMany(mappedBy = "cliente")
    private List<cliente> clienteList;*/
}
