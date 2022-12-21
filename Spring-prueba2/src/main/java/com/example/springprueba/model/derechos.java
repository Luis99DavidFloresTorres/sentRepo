package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;

@Entity(name="derechos")
@Data
public class derechos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer nivel;
    @ManyToOne
    @JoinColumn(name="tipousuario_id")
    private tipoUsuario tipoUsuario;
    @ManyToOne
    @JoinColumn(name="modulo_id")
    private modulo modulo;
}
