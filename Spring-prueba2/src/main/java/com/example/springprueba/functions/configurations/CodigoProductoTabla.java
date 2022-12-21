package com.example.springprueba.functions.configurations;
/*
import com.example.springprueba.model.codificadores.codigo;
import com.example.springprueba.model.codigoProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoCodigo;
import com.example.springprueba.repo.RepoCodigoProducto;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CodigoProductoTabla {
    private RepoProducto repoProducto;
    private RepoCodigo repoCodigo;
    private RepoCodigoProducto repoCodigoProducto;

    public CodigoProductoTabla(RepoProducto repoProducto, RepoCodigo repoCodigo, RepoCodigoProducto repoCodigoProducto) {
        this.repoProducto = repoProducto;
        this.repoCodigo = repoCodigo;
        this.repoCodigoProducto = repoCodigoProducto;
    }
    public void guardarCodigosStringtoTable(){
        List<producto> productoList = repoProducto.findAll();

        productoList.forEach(producto -> {

            if(Objects.isNull(producto.getCodigoProducto())){
                String codigoCompleto = producto.getCodigo();
                String codigo = dividirCodigo(codigoCompleto);
                codigo codigo1 = repoCodigo.findByCodigo(codigo);
                codigoProducto codigoProducto = repoCodigoProducto.findByCodigo(codigoCompleto);
                if((Objects.isNull(codigo1))){
                    insertarCodigo(codigo);
                }//tienen que esr separados o si no faltaran codigos porque a veces debe entrar a ambos
                if((Objects.isNull(codigoProducto))){
                    insertarCodigoProducto(codigoCompleto, codigo);
                }
                insertarProducto(codigoCompleto,producto);
            }
        });
    }
    public String dividirCodigo(String codigo){
        String prefijoCodigo="";
        for(int i=0; i<codigo.length();i++){
            if(codigo.charAt(i)=='-'){
                prefijoCodigo = codigo.substring(0,i+1);
            }
        }
        return prefijoCodigo;
    }
    public String dividirCodigoNumeral(String codigo){
        String prefijoCodigo="";
        for(int i=0; i<codigo.length();i++){
            if(codigo.charAt(i)=='-'){
                prefijoCodigo = codigo.substring(i+1,codigo.length());
            }
        }
        String nuevoValor = prefijoCodigo.replaceAll("[^0-9]","");

        return nuevoValor;
    }
    public void insertarCodigo(String codigo){
        codigo codigo1 = new codigo();
        codigo1.setCodigo(codigo);
        repoCodigo.save(codigo1);
    }
    public void insertarCodigoProducto(String codigo, String codigoEntity){
        codigo codigoEncontrado = repoCodigo.findByCodigo(codigoEntity);
        codigoProducto codigoProducto =  new codigoProducto();
        codigoProducto.setCodigo(codigo);
        codigoProducto.setCodigoEntity(codigoEncontrado);
        repoCodigoProducto.save(codigoProducto);
    }
    public void insertarProducto(String codigoProducto, producto producto){
        codigoProducto codigoProducto1 = repoCodigoProducto.findByCodigo(codigoProducto);
        producto.setCodigoProducto(codigoProducto1);
        repoProducto.save(producto);
    }
    public void limpiarDatosNumericos(){
        List<codigoProducto> codigoProductoList = repoCodigoProducto.findAll();
        codigoProductoList.forEach(dato->{
            System.out.println(this.dividirCodigoNumeral(dato.getCodigo()));
            String nuevoCodigo = this.dividirCodigo(dato.getCodigo())+this.dividirCodigoNumeral(dato.getCodigo());
            dato.setCodigo(nuevoCodigo);
            repoCodigoProducto.save(dato);
        });
    }
}
*/
