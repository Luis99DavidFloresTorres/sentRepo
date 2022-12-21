package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "ordencompra")
public class ordencompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transporte;
    private String ciudad;
    private Date fecha;
    private String nitfacturacion;
    private Integer nrodoc;
    private String detalle;
    private Integer oper    ;
    private String useract;
    private String contactopre;
    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    proveedor proveedor;
    @OneToMany(mappedBy = "ordencompra")
    @JsonIgnore
    @JsonInclude(JsonInclude.Include.NON_NULL)
    List<itemcompra> itemcompraList;
}
