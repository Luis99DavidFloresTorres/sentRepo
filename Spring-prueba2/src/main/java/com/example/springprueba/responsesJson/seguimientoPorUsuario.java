package com.example.springprueba.responsesJson;

import lombok.Data;

import java.util.Date;
@Data
public class seguimientoPorUsuario {
    private String responsable;
    private Date fecha;
    private String accion;
}
