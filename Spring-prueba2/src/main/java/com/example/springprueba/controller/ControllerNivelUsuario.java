package com.example.springprueba.controller;

/*import com.example.springprueba.model.descripcionNivelUsuario;
import com.example.springprueba.model.nivelUsuario;
import com.example.springprueba.responsesJson.AgregarNombresNiveles;
import com.example.springprueba.service.ServiceDescripcionNivelUsuario;
import com.example.springprueba.service.ServiceNivelUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/nivelUsuario")
public class ControllerNivelUsuario {
    private final ServiceNivelUsuario serviceNivelUsuario;
    private final ServiceDescripcionNivelUsuario descripcionNivelUsuario;
    public ControllerNivelUsuario(ServiceNivelUsuario serviceNivelUsuario, ServiceDescripcionNivelUsuario descripcionNivelUsuario){
        this.serviceNivelUsuario = serviceNivelUsuario;
        this.descripcionNivelUsuario = descripcionNivelUsuario;
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<nivelUsuario>> findAll() throws ParseException {
        List<nivelUsuario> nivelUsuario = serviceNivelUsuario.findAll();
        return new ResponseEntity<>(nivelUsuario, HttpStatus.OK);
    }
    @GetMapping("/buscarNiveles")
    public ResponseEntity<List<nivelUsuario>> getNivelUsuario() {
        List<nivelUsuario> nivelUsuarioList = serviceNivelUsuario.findAll();
        return new ResponseEntity<>(nivelUsuarioList, HttpStatus.OK);
    }
    @PostMapping("/addNiveles")
    public ResponseEntity<nivelUsuario> addNiveles(@RequestBody ArrayList<AgregarNombresNiveles> usuario){
        System.out.println(usuario);
        // System.out.println(deserealizarAgregar.getAgregarNombresNivelesArrayList());
        // List<AgregarNombresNiveles> usuario = deserealizarAgregar.getAgregarNombresNivelesArrayList();
        // System.out.println(usuario);
        List<descripcionNivelUsuario> descripcionNivelUsuarioList = new ArrayList<>();
        nivelUsuario nivelUsuarioO = new nivelUsuario();

        usuario.forEach(data->{
            descripcionNivelUsuario descripcion = new descripcionNivelUsuario();
            if(data.getClaseOsubclase().equals("clase")){
                descripcion.setClase(data.getClaseNombre());
                descripcion.setSubclase("no");

            }else if (data.getClaseOsubclase().equals("subclase")){
                descripcion.setSubclase(data.getClaseNombre());
                descripcion.setClase("no");
            }
            descripcion.setNivelUsuario(nivelUsuarioO);
            descripcionNivelUsuarioList.add(descripcion);
        });

        nivelUsuarioO.setDescripcionNivelUsuario(descripcionNivelUsuarioList);
        nivelUsuarioO.setNombre(usuario.get(0).getNivelNombre());
        nivelUsuario nivelUsuario1 =  serviceNivelUsuario.addNivelUsuario(nivelUsuarioO);
        return new ResponseEntity<>(nivelUsuario1, HttpStatus.OK);
    }
    @PostMapping("/editar")
    public ResponseEntity<Integer> editarNiveles(@RequestBody nivelUsuario usuario){

        nivelUsuario nivelUsuarioO = serviceNivelUsuario.findById(usuario.getId());
        List<descripcionNivelUsuario> descripcionNivelUsuarioList = new ArrayList<>();
        usuario.getDescripcionNivelUsuario().forEach(data->{
            descripcionNivelUsuario descripcion;
            System.out.println("id"+data.getId());
            if(data.getId()== 0){
                descripcion = new descripcionNivelUsuario();
                descripcion.setClase(data.getClase());
                descripcion.setSubclase(data.getSubclase());
                descripcion.setNivelUsuario(nivelUsuarioO);
            }else{
                descripcion = descripcionNivelUsuario.buscarPorId(data.getId());
            }
            descripcion.setNivelUsuario(nivelUsuarioO);
            descripcionNivelUsuarioList.add(descripcion);
        });
        descripcionNivelUsuarioList.forEach(data->{
            System.out.println(data.getClase());
            System.out.println(data.getSubclase());
        });
        //nivelUsuarioO.setDescripcionNivelUsuario(descripcionNivelUsuarioList).;
       // nivelUsuarioO.getDescripcionNivelUsuario().clear();
       // nivelUsuarioO.setDescripcionNivelUsuario(descripcionNivelUsuarioList);
        nivelUsuarioO.getDescripcionNivelUsuario().clear();
        nivelUsuarioO.getDescripcionNivelUsuario().addAll(descripcionNivelUsuarioList);*/
      /*  descripcionNivelUsuarioList.forEach(data ->{
            nivelUsuarioO.getDescripcionNivelUsuario().add(data);
        });*/
      //  nivelUsuarioO.setDescripcionNivelUsuario(descripcionNivelUsuarioList);
       // nivelUsuarioO.getDescripcionNivelUsuario().addAll(descripcionNivelUsuarioList);
      /*  nivelUsuarioO.setNombre(usuario.getNombre());
        serviceNivelUsuario.addNivelUsuario(nivelUsuarioO);
        return new ResponseEntity<>(1, HttpStatus.OK);
    }
}*/
