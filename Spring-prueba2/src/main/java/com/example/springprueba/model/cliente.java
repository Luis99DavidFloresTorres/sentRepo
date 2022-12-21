package com.example.springprueba.model;

import com.example.springprueba.model.codificadores.ciudad;
import com.example.springprueba.model.codificadores.tipoCliente;
import com.example.springprueba.model.codificadores.zona;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Singular;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "cliente")
@Data
public class cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String tipodescto;
    private String direccion;
    private String telefono;
    private String codigo;
    private LocalDate fechaact;
    private String useract;
    @JsonIgnore
    @OneToMany(mappedBy = "cliente")
    @ToString.Exclude
    private List<transactionProduct> transactionProductList;
    @ManyToOne
    @JoinColumn(name = "tipocliente_id")
    private tipoCliente tipocliente;
    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @ToString.Exclude
    private List<proyecto> proyectoList;
    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    @ToString.Exclude
    private List<notaventa> notaventaList;
    @ManyToOne
    @JoinColumn(name ="ciudad_id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ciudad ciudad;
    @ManyToOne
    @JoinColumn(name ="zona_id")
    private zona zona;
}
