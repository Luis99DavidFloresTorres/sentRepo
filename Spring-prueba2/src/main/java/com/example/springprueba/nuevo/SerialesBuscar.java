package com.example.springprueba.nuevo;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoItemProducto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class SerialesBuscar {

    private itemProducto[] tablaHash;

    private RepoItemProducto repoItemProducto;
    private List<itemProducto> seriales;
    public SerialesBuscar(RepoItemProducto repoItemProducto){
        this.repoItemProducto = repoItemProducto;
        this.seriales=repoItemProducto.seriales();
        this.tablaHash = new itemProducto[this.seriales.size()];
        this.armarTablaHash();
    }
    public void armarTablaHash(){
        for(int i = 0 ;i<this.seriales.size();i++){
            if(!Objects.isNull(this.seriales.get(i).getSerial())){
               // System.out.println(this.seriales.get(i).getSerial().hashCode()& 0x7fffffff);
                int hash =  Math.abs(this.seriales.get(i).getSerial().hashCode()& 0x7fffffff) %this.seriales.size();
                if(!Objects.isNull(this.tablaHash[hash])){
                    System.out.println(hash);
                }
                if(hash==430){
                    System.out.println("entra");
                }
                this.tablaHash[hash] = this.seriales.get(i);
            }

        }
    }
    public List<itemProducto> tablaHash(List<String> listaSeriales){
        List<itemProducto> mostrar = new ArrayList();
        for(int i = 0;i<listaSeriales.size();i++){
            int hash = (Math.abs(listaSeriales.get(i).hashCode()& 0x7fffffff))%tablaHash.length;
            System.out.println(hash);
            mostrar.add(this.tablaHash[hash]);
        }
        return mostrar;
    }
}
