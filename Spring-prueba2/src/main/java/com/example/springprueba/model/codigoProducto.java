package com.example.springprueba.model;

//import com.example.springprueba.model.codificadores.codigo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


/*@Entity(name = "codigoProducto")
@Data
public class codigoProducto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    @ManyToOne(cascade =  CascadeType.MERGE) //si le pones All no da y si le pones merge si da
    @JoinColumn(name = "codigo_id")
    codigo codigoEntity;
    @OneToMany(mappedBy = "codigoProducto",fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
    @JsonIgnore
    List<producto> productos;
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}*/
