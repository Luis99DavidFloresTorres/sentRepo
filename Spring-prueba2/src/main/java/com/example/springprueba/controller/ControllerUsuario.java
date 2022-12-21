package com.example.springprueba.controller;

import com.example.springprueba.model.*;
import com.example.springprueba.repo.RepoDerechos;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.responsesJson.UsuarioJson;
import com.example.springprueba.service.ServiceUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/usuario")
public class ControllerUsuario {
    private final ServiceUsuario serviceUsuario;
   // private final ServiceNivelUsuario serviceNivelUsuario;
   // private final ServiceDescripcionNivelUsuario descripcionNivelUsuario;
    private final RepoDerechos repoDerechos;
    public ControllerUsuario(ServiceUsuario serviceUsuario, RepoDerechos repoDerechos){//, ServiceNivelUsuario serviceNivelUsuario, ServiceDescripcionNivelUsuario descripcionNivelUsuario1
        this.serviceUsuario = serviceUsuario;
       // this.serviceNivelUsuario = serviceNivelUsuario;
       // this.descripcionNivelUsuario = descripcionNivelUsuario1;
        this.repoDerechos  = repoDerechos;
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> getUsuario(@RequestBody Usuario usuario){
        String cuenta = usuario.getCuenta();
        String contrasena = usuario.getContrasena();

        Usuario userFinded = serviceUsuario.buscarUsuario(cuenta,contrasena);

        String respuesta="";
        if(Objects.isNull(userFinded)){
           respuesta ="incorrecto";
        }else {
            if(Objects.isNull(userFinded.getTipoUsuario())){
                respuesta="vacio";
            }else if(userFinded.getTipoUsuario().getNombre().equals("ADMINISTRADOR2")){
                respuesta="ADMIN";
            }else{
                respuesta="correcto";
            }
        }
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta(respuesta);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    @PostMapping("/buscarSubNivel")
    public ResponseEntity<List<derechos>> getSubNivelUsuario(@RequestBody Usuario usuario){
        String cuenta = usuario.getCuenta();
        String contrasena = usuario.getContrasena();

        Usuario userFinded = serviceUsuario.buscarUsuario(cuenta,contrasena);
        List<derechos> derechos = this.repoDerechos.findByTipoUsuario(userFinded.getTipoUsuario());
            for(derechos derecho: derechos){
                derecho.getModulo().verificarClase();

            }
            for(int i=0;i<derechos.size();i++){
                derechos = crearModulosProducto(derechos.get(i).getModulo().getNombre(),derechos, derechos.get(i).getNivel());;
            }

 //       nivelUsuario usuarioNivel =  userFinded.getNivelUsuario();
        return new ResponseEntity<>(derechos, HttpStatus.OK);
    }

    @PostMapping("/agregarUsuario")
    public ResponseEntity<Usuario> addU(@RequestBody UsuarioJson json){
        System.out.println("entra");
        System.out.println(json);
        String usuario1 = json.getUsuario();
        String contrasena = json.getContrasena();
        Usuario usuarioNew = new Usuario();
        usuarioNew.setCuenta(usuario1);
        usuarioNew.setContrasena(contrasena);
        Usuario usuarioAgregado = serviceUsuario.addUsuario(usuarioNew);

        return new ResponseEntity<>(usuarioAgregado, HttpStatus.OK);
    }
    @GetMapping("/mostrarUsuarios")
    public ResponseEntity<List<Usuario>> getUsuarios() {
        List<Usuario> usuarioList = serviceUsuario.findAllUsuarios();
        return new ResponseEntity<>(usuarioList, HttpStatus.OK);
    }
    public List<derechos> crearModulosProducto(String nombre, List<derechos> derechos, Integer nivel){
        if(!Objects.isNull(nombre)){
            if(nombre.equals("PRODUCTOS")){
                modulo modulo = new modulo();
                modulo modulo2 = new modulo();
                modulo.setNombre("Item Producto");
                modulo.setSubclase("Item Producto");
                modulo.setClase("no");
                modulo2.setSubclase("Consultas por deposito");
                modulo2.setNombre("Consultas por deposito");
                modulo2.setClase("no");
                derechos derechos1 = new derechos();
                derechos derechos2 = new derechos();
                derechos1.setNivel(nivel);
                derechos2.setNivel(nivel);
                derechos1.setModulo(modulo);
                derechos2.setModulo(modulo2);
                derechos.add(derechos1);
                derechos.add(derechos2);
                return derechos;
            }

        }

        return derechos;
    }
}
