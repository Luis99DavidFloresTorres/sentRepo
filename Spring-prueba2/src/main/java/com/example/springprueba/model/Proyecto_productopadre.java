package com.example.springprueba.model;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
//@Entity(name="proyectoproductopadre")
@Data
public class Proyecto_productopadre implements Serializable { //que es precio medio
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "subproducto_id") // direcciona al padre y si el padre tiene un padre
    private Proyecto_subproducto proyecto_subproducto;
   /* @ManyToOne
    @JoinColumn(name = "itemproyecto_id")
    private ItemProyecto itemProyecto;*/
  /*  @ManyToOne
    @JoinColumn(name = "productohijo")
    private producto productoHIjo;   nos llevara a su padre si lo invocamos*/
    private String nombre;
    private Double precio;
}
