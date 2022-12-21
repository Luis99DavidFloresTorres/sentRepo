package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "empleado")
@Data

public class empleado  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nombre;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String codigo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String direccion;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer telefono;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String cargo;
  /*  @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonIgnore
    List<cotizacion> cotizacionList;
    @ManyToOne
    @JoinColumn(name = "empleado_id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private empleado empleado;
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonIgnore
    List<notaventa> notaventaList;*/
}
