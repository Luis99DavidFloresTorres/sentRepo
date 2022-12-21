package com.example.springprueba.repo;

import com.example.springprueba.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepoUsuario extends JpaRepository<Usuario, Long> {

    List<Usuario> findByCuentaAndContrasena(String usuario, String contrasena);
    @Query(value = "SELECT new com.example.springprueba.model.Usuario(u.cuenta,u.contrasena) from usuario u ")
    List<Usuario> encontrarContrasenaNombrenivel();
    Usuario findByNombre(String nombre);
}
