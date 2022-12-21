package com.example.springprueba.controller;
import com.example.springprueba.model.cliente;
import com.example.springprueba.repo.RepoCliente;
import com.example.springprueba.responsesJson.LoginResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/cliente")
public class ControllerCliente {
    RepoCliente repoCliente;
    public ControllerCliente(RepoCliente repoCliente){
        this.repoCliente = repoCliente;
    }
    @GetMapping("/all")
    public ResponseEntity<List<cliente>> allCliente(){
        List<cliente> clienteList = repoCliente.findAll(Sort.by(Sort.Direction.ASC,"nombre"));
        return new ResponseEntity<>(clienteList, HttpStatus.OK);
    }
    @PostMapping("/byName")
    public ResponseEntity<cliente> byName(@RequestBody LoginResponse nombre){
        System.out.println(nombre);
        cliente cliente = repoCliente.findByNombre(nombre.getRespuesta());
        System.out.println(cliente);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }


    @GetMapping("/prueba")
    public ResponseEntity<InputStreamResource> buildExcelDocument() throws Exception {
        System.out.println("entra");
        ByteArrayInputStream byteCliente = exportAllData();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"prueba.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }


    public ByteArrayInputStream exportAllData() throws Exception {
        String[] columns = {"Id", "Nombre", "Tipo Descsuento2"};

        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Cliente");
        Row row = sheet.createRow(8);
        this.cabecera(sheet);



        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        List<cliente> clientes = repoCliente.findAll();
        int initRow = 9;
        for (cliente persona : clientes) {
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(persona.getId());
            row.createCell(1).setCellValue(persona.getNombre());
            row.createCell(2).setCellValue(persona.getTipodescto());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public void cabecera(Sheet sheet){
        Row row0 = sheet.createRow(0);
        row0.createCell(0).setCellValue("SYSTEM ENGINEERING & NETWORK TECHNOLOGY");


        Row row1 = sheet.createRow(1);
        row1.createCell(0).setCellValue("CALLE VALENTIN ABECIA #121 -6445846");

        Row row2 = sheet.createRow(2);
        row2.createCell(2).setCellValue("COTIZACION AL CLIENTE");


        Row row5 = sheet.createRow(5);
        row5.createCell(0).setCellValue("Señores");
        row5.createCell(1).setCellValue("ABDEL DURAN JURADoo");
        Row row6 = sheet.createRow(6);
        row6.createCell(0).setCellValue("Proyecto");
        row6.createCell(1).setCellValue("1");
        Row row7 = sheet.createRow(7);
        row7.createCell(0).setCellValue("Detalle");
        row7.createCell(1).setCellValue("2");
    }
}
