package com.example.springprueba.model;

import com.example.springprueba.model.codificadores.ciudad;
import com.example.springprueba.model.codificadores.pais;
import com.example.springprueba.model.codificadores.rubro;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "proveedor")
@Data
public class proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String fax;
    private String cuentas;
    private String email;
    private String celular;
    private String direccion;
    private String casilla;
    private String useract;
    private LocalDate fechaact;
    private String contactopre;
    private String codigo;
    private String telefono;
    @OneToMany(mappedBy = "proveedor", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnore
    private List<transactionProduct> transactionProductList;
    @OneToMany(mappedBy = "proveedor", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnore
    private List<ordencompra> ordencompra;
    @ManyToOne
    @JoinColumn(name = "ciudad_id")
    private ciudad ciudad;
    @ManyToOne
    @JoinColumn(name = "rubro_id")
    private rubro rubro;
    @ManyToOne
    @JoinColumn(name = "pais_id")
    private pais pais;
}
