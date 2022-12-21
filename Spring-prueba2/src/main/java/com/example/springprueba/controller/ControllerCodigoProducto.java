package com.example.springprueba.controller;
/*
import com.example.springprueba.functions.codigo.CodigoProducto;
import com.example.springprueba.model.codificadores.codigo;
import com.example.springprueba.model.codigoProducto;
import com.example.springprueba.repo.RepoCodigo;
import com.example.springprueba.repo.RepoCodigoProducto;
import com.example.springprueba.responsesJson.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/codigoProducto")
public class ControllerCodigoProducto {
    private RepoCodigoProducto repoCodigoProducto;
    private RepoCodigo repoCodigo;
    public ControllerCodigoProducto(RepoCodigoProducto repoCodigoProducto, RepoCodigo repoCodigo){
        this.repoCodigoProducto = repoCodigoProducto;
        this.repoCodigo = repoCodigo;
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> insertar(@RequestBody codigoProducto codigo){ // se estructura en el frontend para enviarlo directo a guardar
        LoginResponse loginResponse = new LoginResponse();
        if(repoCodigoProducto.findByCodigo(codigo.getCodigo())==null){
            repoCodigoProducto.save(codigo);
            loginResponse.setRespuesta("si");
        }else{
            loginResponse.setRespuesta("no");
        }
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
    @PostMapping( "/editar")
    public ResponseEntity<LoginResponse> editar(codigoProducto codigo){
        LoginResponse loginResponse = new LoginResponse();
        if(repoCodigoProducto.findByCodigo(codigo.getCodigo())==null) {
            codigo.setCodigo(codigo.getCodigo()+'-');
            repoCodigoProducto.save(codigo);
            loginResponse.setRespuesta("si");
        }else{
            loginResponse.setRespuesta("no");
        }
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
    @PostMapping("/eliminar")
    public void eliminar(@RequestBody codigoProducto codigoProducto){
        repoCodigoProducto.delete(codigoProducto);
    }
    @PostMapping("/returnId")
    public ResponseEntity<LoginResponse> devolverID(@RequestBody LoginResponse loginResponse){
        String codigo = loginResponse.getRespuesta();
        System.out.println("entra");
        System.out.println(codigo);
        codigo codigo1 = repoCodigo.findByCodigo(codigo);
        CodigoProducto codigoProductoFunction = new CodigoProducto(codigo1.getCodigoProductoList());
        Integer numeroMaximo = codigoProductoFunction.retornarNuevoMayorMasUno();
        System.out.println(numeroMaximo);
        codigoProducto codigoProducto = new codigoProducto();
        codigoProducto.setCodigoEntity(codigo1);
        codigoProducto.setCodigo(codigo1.getCodigo()+numeroMaximo);
        //codigoProducto.setCodigo(numeroMaximo);
        codigoProducto result =repoCodigoProducto.save(codigoProducto);
        LoginResponse loginResponse1 = new LoginResponse();
        loginResponse1.setRespuesta(numeroMaximo.toString());
        return new ResponseEntity(loginResponse1, HttpStatus.OK);
    }
    @PostMapping("/returnDisponibles")
    public ResponseEntity<List<codigoProducto>> returnCodigosDisponibles(){

        List<codigoProducto> codigoProductoList = repoCodigoProducto.findAll();

        CodigoProducto codigoProductoFunction = new CodigoProducto(codigoProductoList);
        List<codigoProducto> codigoDiponibles =  codigoProductoFunction.retornarCodigosLibres();
        return new ResponseEntity(codigoDiponibles, HttpStatus.OK);
    }
}
*/
