package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "cotizacion")
@Data
public class cotizacion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double total;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nota;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String detalle;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String entrega;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String formapago;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer oper;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double totalme;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String validez;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date fecha;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String useract;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nrodoc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String garantia;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer referencia;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String estado;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String impuestos;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private proyecto proyecto;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private cliente cliente;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String operacion;
}
