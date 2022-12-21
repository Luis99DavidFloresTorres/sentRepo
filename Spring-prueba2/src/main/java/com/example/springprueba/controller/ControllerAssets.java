package com.example.springprueba.controller;

import com.example.springprueba.functions.AssetFunction;
import com.example.springprueba.responsesJson.MultipartPrueba;
import com.example.springprueba.service.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
public class ControllerAssets extends ControllerBase{
    @Autowired
    private FileSystemStorageService fileSystemStorageService;
    private AssetFunction assetFunction;
    public ControllerAssets(AssetFunction assetFunction1){
        assetFunction = assetFunction1;
    }
    @GetMapping("/{filename:.+}")
    Resource getResource(@PathVariable String filename) {
        return fileSystemStorageService.loadAsResource(filename);
    }


    @PostMapping(value = "/upload")
    Map<String, String> subirArchivo(@RequestParam("file") MultipartFile multipartFile,
                                     @RequestParam("id") String id){
        Map<String, String> resultado = assetFunction.insertProductImages(multipartFile,id);
        return resultado;
    }

}
