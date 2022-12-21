package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity(name = "cotizproducto")
public class cotizProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ciudad;
    private Date fecha;
    private Integer nrodoc;
    private String detalle;
    private Integer oper;
    private String contactopre;
    private String useract;
    @ManyToOne
    @JoinColumn(name="proveedor_id")
    private proveedor proveedor;
    @ManyToOne
    @JoinColumn(name="proyecto_id")
    private proyecto proyecto;

}
