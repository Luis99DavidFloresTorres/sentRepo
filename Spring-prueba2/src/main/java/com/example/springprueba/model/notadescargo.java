package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name="notadescargo")
@Data
public class notadescargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String responsable;
    private String estado;
    private Date fecha;
    private Date fechaact;
    private Integer nrodoc;
    private String detalle;
    private String useract;
    @Column(name = "solicitud_id")
    private Integer solicitud;
    private Double montosol;
    @Transient
    private Double montoTotal;
    @ManyToOne
    @JoinColumn(name="proyecto_id")
    private proyecto proyecto;
}
