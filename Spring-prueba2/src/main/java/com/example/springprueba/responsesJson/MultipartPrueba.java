package com.example.springprueba.responsesJson;

import org.springframework.web.multipart.MultipartFile;

public class MultipartPrueba {
    MultipartFile file;
    String prueba;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getPrueba() {
        return prueba;
    }

    public void setPrueba(String prueba) {
        this.prueba = prueba;
    }
}
