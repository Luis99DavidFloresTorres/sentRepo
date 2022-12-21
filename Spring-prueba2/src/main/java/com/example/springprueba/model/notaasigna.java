package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity(name="notaasigna")
@Data
public class notaasigna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsable;
    private Integer solicitud_id;
    private Character estado;
    private Date fecha;
    private String codproyecto;
    private Integer nrodoc;
    private String detalle;
    private Date fechaact;
    private String useract;
}
