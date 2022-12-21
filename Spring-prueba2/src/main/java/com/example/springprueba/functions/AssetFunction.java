package com.example.springprueba.functions;

import com.example.springprueba.controller.ControllerBase;
import com.example.springprueba.model.producto;
import com.example.springprueba.service.FileSystemStorageService;
import com.example.springprueba.service.ServiceProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class AssetFunction extends ControllerBase {
    @Autowired
    private FileSystemStorageService fileSystemStorageService;
    private ServiceProducto productoService;
    public AssetFunction(ServiceProducto serviceProducto){
        this.productoService = serviceProducto;
    }
    public Map<String, String> insertProductImages(MultipartFile multipartFile, String id){
        Long idFind = Long.valueOf(id);
        producto productoFinded = this.productoService.findbyidProducto(idFind);
        String rutaArchivo = fileSystemStorageService.store(multipartFile);
        String rutaAbsoluta = buildUriString(rutaArchivo);
        Map<String, String> resultado = new HashMap<>();
        productoFinded.setRutaPortada(rutaArchivo);
        productoService.addProducto(productoFinded);
        resultado.put("ruta", rutaArchivo);
        resultado.put("url", rutaAbsoluta);
        return resultado;
    }
}