package com.example.springprueba.model;

import com.example.springprueba.model.codificadores.deposito;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity(name = "transproducto")
@Data
public class transactionProduct implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer oper;
    private Date fecha;
    private Integer notaventa;
    private Integer nrodoc;
    private String detalle;
    private Integer factura;
    private String useract;
    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "proveedor_id")
    private proveedor proveedor;
    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "cliente_id")
    private cliente cliente;

    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "deposito_id")
    private deposito deposito;

    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private proyecto proyecto;
    @OneToMany(mappedBy = "transproducto", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnore
    private List<itemProducto> itemProducto;
    public transactionProduct(){}
    public transactionProduct(Integer oper, Date fecha){
        this.oper=oper;
        this.fecha = fecha;
    }
    public transactionProduct(Integer oper, Date fecha, String detalle){
        this.oper=oper;
        this.fecha = fecha;
        this.detalle= detalle;
    }
    public transactionProduct(Long id, Integer oper, Date fecha, Integer notaventa, Integer nrodoc, String detalle) {
        this.id = id;
        this.oper = oper;
        this.fecha = fecha;
        this.notaventa = notaventa;
        this.nrodoc = nrodoc;
        this.detalle = detalle;
    }
}
