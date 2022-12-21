package com.example.springprueba.model;

import com.example.springprueba.model.codificadores.tipoGasto;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name="itemdescargo")
@Data
public class itemdescargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double preciome;
    private Double precio;
    private String detalle;
    private Integer cantidad;
    private Double monto;
    private Date fecha;

    private String nrofact;
    @ManyToOne
    @JoinColumn(name="notadescargo_id")
    private notadescargo notadescargo;
    @ManyToOne
    @JoinColumn(name="gasto_id")
    private tipoGasto gasto;
}
