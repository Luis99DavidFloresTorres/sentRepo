package com.example.springprueba.model.codificadores;

import com.example.springprueba.model.producto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "unidad")
@Data
public class unidades implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    @OneToMany(mappedBy = "unidad", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<producto> productoList;
    @OneToMany(mappedBy = "unidad", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<tipoGasto> gastoList;
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getNombre() {
        return nombre;
    }
    public String getCodigo() {
        return codigo;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public unidades(){}
    public unidades(Long id, String codigo, String nombre) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
    }

}
