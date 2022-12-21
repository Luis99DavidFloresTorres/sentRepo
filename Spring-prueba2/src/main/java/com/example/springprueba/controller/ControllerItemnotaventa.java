package com.example.springprueba.controller;

import com.example.springprueba.functions.imprimir.Imprimir;
import com.example.springprueba.model.cliente;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoItemnotaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.ServiceItemVenta;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itemnotaventa")
public class ControllerItemnotaventa {
    private RepoNotaVenta repoNotaVenta;
    private RepoItemnotaventa repoItemnotaventa;
    private ServiceItemVenta serviceItemVenta;
    private Imprimir imprimir;
    public ControllerItemnotaventa(RepoNotaVenta repoNotaVenta, RepoItemnotaventa repoItemnotaventa, Imprimir imprimir, ServiceItemVenta serviceItemVenta){
        this.repoNotaVenta = repoNotaVenta;
        this.repoItemnotaventa =repoItemnotaventa;
        this.imprimir = imprimir;
        this.serviceItemVenta = serviceItemVenta;
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> agregar(@RequestBody List<itemnotaventa> itemnotaventaList){
        Long id = repoNotaVenta.findByNrodoc(itemnotaventaList.get(0).getNotaventa().getNrodoc()).getId();
        notaventa notaventa = itemnotaventaList.get(0).getNotaventa();
        Double suma = 0.0;
        for(itemnotaventa data : itemnotaventaList){
            suma += data.getSubtotal();
        }
        notaventa.setId(id);
        notaventa.setTotal(suma);
        notaventa.setTotalme(suma/ notaventa.getTc());
        notaventa nuevoNotaventa = repoNotaVenta.save(notaventa);
        itemnotaventaList.forEach(data->{
            data.setNotaventa(nuevoNotaventa);
        });
        repoItemnotaventa.saveAll(itemnotaventaList);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    /*@GetMapping("/byNotaventa/{id}")
    public ResponseEntity<List<itemnotaventa>> findByNotaventa(@PathVariable("id") Long id){
        System.out.println(id);
        Optional<notaventa> notaventa = repoNotaVenta.findById(id);
        List<itemnotaventa> itemnotaventaList = repoItemnotaventa.findByNotaventa(notaventa.get());
        return new ResponseEntity<>(itemnotaventaList, HttpStatus.OK);
    }*/
    @GetMapping("/imprimir/{nrodoc}")
    public ResponseEntity<InputStreamResource> buildExcelDocument(@PathVariable("nrodoc") Integer nrodoc) throws Exception {
        System.out.println("entra");
        ByteArrayInputStream byteCliente = this.imprimir.itemsnotaVenta(nrodoc,this.repoNotaVenta,this.repoItemnotaventa);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"notaventa.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
    @GetMapping("/fechasP/{fecha1}/{fecha2}/{nombreP}")
    public ResponseEntity<List<itemnotaventa>> entreFechasProducto(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreP") String nombreP) throws Exception {
        System.out.println(nombreP);
       List<itemnotaventa> itemventa = serviceItemVenta.entreFechas(fecha1,fecha2,nombreP);
       return new ResponseEntity<>(itemventa,HttpStatus.OK);
    }
   /* public ByteArrayInputStream exportAllData(Integer idNotaVenta) throws Exception {
        String[] columns = {"CODIGO", "DESCRIPCION", "UNIDAD","CANTIDAD","PRECIO UNITARIO","TOTAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Notaventa");
        Row row = sheet.createRow(8);

        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        notaventa notaventa = repoNotaVenta.findByNrodoc(idNotaVenta);
        List<itemnotaventa> itemnotaventaList = repoItemnotaventa.findByNotaventa(notaventa);
        int initRow = 9;
        for (itemnotaventa itemnotaventa : itemnotaventaList) {
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(itemnotaventa.getProducto().getCodigo());
            row.createCell(1).setCellValue(itemnotaventa.getNotaventa().getDetalle());
            row.createCell(2).setCellValue(itemnotaventa.getProducto().getUnidad().getNombre());
            row.createCell(3).setCellValue(itemnotaventa.getCantidad());
            row.createCell(4).setCellValue(itemnotaventa.getProducto().getPrecio());
            row.createCell(5).setCellValue(itemnotaventa.getSubtotal());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }*/
   @GetMapping("/prueba")
   public ResponseEntity<List<itemnotaventa>> pr(){
       return new ResponseEntity(this.repoItemnotaventa.findAll(), HttpStatus.OK);
   }
}
