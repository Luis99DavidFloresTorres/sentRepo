package com.example.springprueba.service;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.Usuario;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoProducto;
import com.example.springprueba.repo.RepoUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceUsuario {
    private final RepoUsuario repo;
    @Autowired
    public ServiceUsuario(RepoUsuario repoI){
        repo = repoI;
    }
    public Usuario buscarUsuario(String usuarioact, String contrasena){
        Usuario usuario = null;
        List<Usuario> result = repo.findByCuentaAndContrasena(usuarioact,contrasena);
        if(result.size()>1){

           usuario = result.get(0);
           return usuario;
        }else if(result.size()==1){
            usuario = result.get(0);
            return  usuario;
        }else{
            return usuario;
        }
    }
    public List<Usuario> findAllUsuarios(){
        return repo.findAll();
    }
    public Usuario addUsuario (Usuario usuario ){
        return repo.save(usuario);
    }
    public Usuario findById(Long id ){
        return  repo.findById(id).orElseThrow(()-> new ExceptionGeneral("error al agregar"));
    }
}
