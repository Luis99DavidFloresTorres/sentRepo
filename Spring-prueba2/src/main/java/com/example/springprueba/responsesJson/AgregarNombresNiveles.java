package com.example.springprueba.responsesJson;


import java.util.List;

public class AgregarNombresNiveles {
    private Long id;
    private String claseOsubclase;
    private String claseNombre;
    private String nivelNombre;
    private Long idNivel;
    public String getClaseOsubclase() {
        return claseOsubclase;
    }

    public void setClaseOsubclase(String claseOsubclase) {
        this.claseOsubclase = claseOsubclase;
    }

    public String getClaseNombre() {
        return claseNombre;
    }

    public void setClaseNombre(String claseNombre) {
        this.claseNombre = claseNombre;
    }

    public String getNivelNombre() {
        return nivelNombre;
    }

    public void setNivelNombre(String nivelNombre) {
        this.nivelNombre = nivelNombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdNivel() {
        return idNivel;
    }

    public void setIdNivel(Long idNivel) {
        this.idNivel = idNivel;
    }
}
