package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name="itemasigna")
@Data
public class itemasigna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fechadev;
    private String estado;
    private Double precio;
    private Double devuelto;
    private Double cantidad;
    private String detalle;
    @ManyToOne
    @JoinColumn(name = "notaasigna_id")
    private notaasigna notaasigna;
    @ManyToOne
    @JoinColumn(name = "activofijo_id")
    private activoFijo activoFijo;
}
