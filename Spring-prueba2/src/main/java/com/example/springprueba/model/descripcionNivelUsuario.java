package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/*@Entity(name = "descripcionNivelUsuario")
@Data
public class descripcionNivelUsuario  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clase;
    private String subclase;
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH, CascadeType.REFRESH})//profundizar
    @JsonIgnore
    @JoinColumn(name = "nivelusuario_id")
    nivelUsuario nivelUsuario;
    public descripcionNivelUsuario(){}
    public descripcionNivelUsuario(Long id, String clase, String subclase){
        this.id = id;
        this.clase = clase;
        this.subclase = subclase;
    }
}*/
