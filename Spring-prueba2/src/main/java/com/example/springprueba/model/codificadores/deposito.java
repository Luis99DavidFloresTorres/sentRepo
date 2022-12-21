package com.example.springprueba.model.codificadores;

import com.example.springprueba.model.producto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "deposito")
@Data
public class deposito implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    private String codigo;
    private String direccion;
   /* @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "producto_id",updatable = false)
    @JsonIgnore // ignora en esta clase pero en la clase unidades no la ignora sino que la llama.
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private producto producto;*/
    public deposito(){

    }
    public deposito(String nombre){
        this.nombre = nombre;
    }
}
