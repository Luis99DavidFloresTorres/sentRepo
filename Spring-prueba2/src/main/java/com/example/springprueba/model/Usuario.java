package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name= "usuario")
@Data
public class Usuario implements Serializable { //que es precio medio
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String useract;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String contrasena;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nombre;
    /*@JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String nombreNivel;*/
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String cuenta;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double comision;
   /* @ManyToOne
    @JoinColumn(name = "nivelusuario_id")
    private nivelUsuario nivelUsuario;*/
    @ManyToOne
    @JoinColumn(name = "tipousuario_id")
    private tipoUsuario tipoUsuario;

    public Usuario(){

    }
    public Usuario(String cuenta, String contrasena){
        this.cuenta = cuenta;
        this.contrasena=contrasena;
      //  this.nombreNivel = nombreNivel;
    }

}
