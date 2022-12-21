package com.example.springprueba.controller;

import com.example.springprueba.functions.facades.FacadeNroDocMaximo;
import com.example.springprueba.functions.ultimoNro.NotaVentaMaximo;
import com.example.springprueba.functions.ultimoNro.Salidas;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoProducto;
import com.example.springprueba.responsesJson.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/ultimoNro")
public class ControllerUltimoNro {
    private final Salidas salidas;
    private final NotaVentaMaximo notaVentaMaximo;
    private final FacadeNroDocMaximo facadeNroDocMaximo;
    private final RepoProducto repoProducto;
    public ControllerUltimoNro(Salidas Salidas, NotaVentaMaximo notaVentaMaximo, FacadeNroDocMaximo facadeNroDocMaximo, RepoProducto repoProducto){
        this.notaVentaMaximo = notaVentaMaximo;
        this.salidas=Salidas;
        this.facadeNroDocMaximo = facadeNroDocMaximo;
        this.repoProducto=repoProducto;
    }
    @GetMapping("/salidasAlmacen")
    public ResponseEntity<LoginResponse> salidas(){
        LoginResponse mandar = new LoginResponse();
        mandar.setRespuesta(Integer.toString(facadeNroDocMaximo.nroMaximoSalidas()));
        // salidas.numeroRetornar(3000);
        return new ResponseEntity<>(mandar, HttpStatus.OK);
    }
    @GetMapping("/entradasAlmacen")
    public ResponseEntity<LoginResponse> entradas(){
        System.out.println("entra");
        LoginResponse mandar = new LoginResponse();
        mandar.setRespuesta(Integer.toString(facadeNroDocMaximo.nroMaximoEntradas()));
        // salidas.numeroRetornar(3000);
        return new ResponseEntity<>(mandar, HttpStatus.OK);
    }
    @GetMapping("/ordencompra")
    public ResponseEntity<LoginResponse> ordencompra(){
        System.out.println("entra");
        LoginResponse mandar = new LoginResponse();
        mandar.setRespuesta(Integer.toString(facadeNroDocMaximo.nroMaximoOrdenCompra()));
        // salidas.numeroRetornar(3000);
        return new ResponseEntity<>(mandar, HttpStatus.OK);
    }
    @GetMapping("/notaventa")
    public ResponseEntity<LoginResponse> notaventa(){
        System.out.println("entra");
        LoginResponse mandar = new LoginResponse();
        mandar.setRespuesta(Integer.toString(facadeNroDocMaximo.nroMaximoNotaVenta()));
        // salidas.numeroRetornar(3000);
        return new ResponseEntity<>(mandar, HttpStatus.OK);
    }
    @GetMapping("/proyecto")
    public ResponseEntity<LoginResponse> proyecto(){
        System.out.println("entra");
        LoginResponse mandar = new LoginResponse();
        mandar.setRespuesta(Integer.toString(facadeNroDocMaximo.nroMaximoProyecto()));
        // salidas.numeroRetornar(3000);
        return new ResponseEntity<>(mandar, HttpStatus.OK);
    }
    @DeleteMapping("/liberarNroDoc/{nro}/{nombre}/{ope}")
    public void eliminarDocumento(@PathVariable("nro") Integer nro,@PathVariable("nombre") String nombre,@PathVariable("ope") Integer operacion){
        System.out.println(nro);
        System.out.println(nombre);
        facadeNroDocMaximo.eliminarNrodocumento(nro,nombre, operacion);
    }
    @GetMapping("/productoCodigo/{codigo}")
    public ResponseEntity<LoginResponse> codigoProducto(@PathVariable("codigo") String codigo){
        String[] nuevoCodigo = codigo.split("-");
        String numero = nuevoCodigo[1];
        if(!numero.matches("[0-9]*")){
            numero = numero.replaceAll( "[^0-9]|.\", \"\"",
            "");
        }
        int numeroInt = Integer.parseInt(numero);
        List<producto> productoCodigos = repoProducto.findAll();

        for(producto productoFor: productoCodigos){
            String[] codigoFor = productoFor.getCodigo().split("-");

            if(codigoFor.length>0){
                String numeroFor = codigoFor[1];
                if(!numeroFor.matches("[0-9]*")){
                    numeroFor = numeroFor.replaceAll( "[^0-9]|.\", \"\"",
                            "");
                }
                int numeroIntFor = Integer.parseInt(numeroFor);
                codigoFor[0] = codigoFor[0].toLowerCase();
                if(codigoFor[0].equals(nuevoCodigo[0])){
                    if(numeroIntFor > numeroInt){
                        numeroInt = numeroIntFor;
                    }
                }
            }
            }
            numeroInt++;
            LoginResponse mandar= new LoginResponse();
            String m = nuevoCodigo[0].toUpperCase()+'-'+numeroInt;
            mandar.setRespuesta(m);
            return new ResponseEntity<>(mandar,HttpStatus.OK);

        /*         maximosValores.put(nuevoCodigo[0],numeroInt);
        maximosValores.put(nuevoCodigo[0],70);
        maximosValores.put("sf",numeroInt);
        System.out.println(maximosValores);
        System.out.println(maximosValores.keySet())*/
    }
}
