package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name="notasolicitud")
@Data
public class notasolicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String estado;
    private Date fecha;
    private String useract;
    private Integer nrodoc;
    private Double montome;
    private String detalle;
    private Date fechaact;
    private Double monto;
    @ManyToOne
    @JoinColumn(name="proyecto_id")
    private proyecto proyecto;
    private Double montodescargo;
}
