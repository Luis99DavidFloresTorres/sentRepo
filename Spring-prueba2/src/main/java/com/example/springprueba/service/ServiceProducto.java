package com.example.springprueba.service;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.unidades;
//import com.example.springprueba.model.codigoProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceProducto{
        private final RepoProducto repo;
        @Autowired
        public ServiceProducto(RepoProducto repoI){
            repo = repoI;
        }
        public producto addProducto(producto productop){
            return  repo.save(productop);
        }

        public List<producto> findAllProductos(){
            return repo.findAll();
        }
        public producto findByName(String nombre){
        return repo.findByNombre(nombre);
    }
        public producto findbyidProducto(Long id){
            producto productoModelo =  repo.findProductoById(id).orElseThrow(()-> new ExceptionGeneral("Producto no encontrado"));
            productoModelo.setUnidadS(productoModelo.getUnidad().getNombre());
            return productoModelo;
        }
        public List<producto> findbySaldoProducto(String tipo){
        return repo.findProductoSaldo(tipo);
    }
        public List<producto> mostrarClienteProducto(){ return repo.clienteMotrarProducto("PRODUCTO");}
        public producto editarZona(producto productop){
            return repo.save(productop);
        }
        public Integer editarSinUrl( String nombre, String modelo, String marca, unidades unidades,Double costo, Integer utilidad,String detalle,String industria, Double desctoa, Double desctob, Double desctoc, Double precio, Long id ){
            return repo.editarProductoSinUrl(nombre, modelo, marca, unidades, costo, utilidad, detalle,industria,desctoa,desctob,desctoc, precio, id).orElseThrow(()-> new ExceptionGeneral("NO SE PUEDO EDITAR PRODUCTO"));
        }
        public Integer editarConUrl(String codigo, String nombre, String modelo, String marca, unidades unidades,Double costo, Integer utilidad,String detalle,String industria, Double desctoa, Double desctob, Double desctoc, Double precio, String ruta_portada, Long id){
            return repo.editarProductoConUrl(codigo,nombre, modelo, marca, unidades, costo, utilidad, detalle,industria,desctoa,desctob,desctoc, precio, ruta_portada, id).orElseThrow(()-> new ExceptionGeneral("NO SE PUEDO EDITAR PRODUCTO"));
        }
        public Integer eliminarProducto(Long id){
            return repo.eliminarProducto(id).orElseThrow(()->new ExceptionGeneral("No se pudo eliminar"));
        }

        public List<String> filtrarCodigos(){
            List<producto> allProductos = this.findAllProductos();
            List<String> codigos = new ArrayList<>();

            for(producto producto : allProductos){
                int verificarDobles = 0;
                String[] palabra = producto.getCodigo().split("-");
                if(palabra.length!=0){
                    for(String codigo:codigos){
                        if(codigo.equals(palabra[0])){
                            verificarDobles = 1;
                        }
                    }
                }
                if(palabra.length!=0){
                    if(verificarDobles==0){
                        codigos.add(palabra[0]);
                    }
                }

            }
            for(String mostrar:codigos){
                System.out.println(mostrar);
            }
            return codigos;
        }
}
