package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity(name= "modulo")
@Data
public class modulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String detalle;
    private String codigo;
    @Transient
    private String clase;
    @Transient
    private String subclase;

    public void verificarClase(){
        String[] clases={"CODIFICADORES","ALMACENES","PROYECTOS","PRODUCTOS","CLIENTES","PROVEEDORES","VENTAS","INFORMES","ADMINISTRACION"};
        for(int i=0;i<8;i++){

            if(clases[i].equals(this.nombre)){
               if (this.nombre.equals("CODIFICADORES")){
                    this.subclase="no";
                    this.clase=this.nombre;
                    break;
                }else{
                    this.subclase="no";
                    this.clase="";
                    break;
                }
            }else{
                this.clase = "no";
                this.subclase=this.nombre;
            }
        }
    }

}
