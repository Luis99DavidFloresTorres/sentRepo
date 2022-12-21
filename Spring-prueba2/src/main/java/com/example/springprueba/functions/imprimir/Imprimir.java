package com.example.springprueba.functions.imprimir;


import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoItemCompra;
import com.example.springprueba.repo.RepoItemnotaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.repo.RepoOrdenCompra;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Component
public class Imprimir {
    public ByteArrayInputStream itemsnotaVenta(Integer nroDoc, RepoNotaVenta repoNotaVenta, RepoItemnotaventa repoItemnotaventa) throws Exception {
        String[] columns = {"CODIGO", "DESCRIPCION", "UNIDAD","CANTIDAD","PRECIO UNITARIO","TOTAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Notaventa");
        Row row = sheet.createRow(8);

        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        notaventa notaventa = repoNotaVenta.findByNrodoc(nroDoc);
        List<itemnotaventa> itemnotaventaList = repoItemnotaventa.findByNotaventa(notaventa);
        int initRow = 9;
        for (itemnotaventa itemnotaventa : itemnotaventaList) {
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(itemnotaventa.getProducto().getCodigo());
            //row.createCell(1).setCellValue(itemnotaventa.getNotaventa().getDetalle());
            row.createCell(2).setCellValue(itemnotaventa.getProducto().getUnidad().getNombre());
            row.createCell(3).setCellValue(itemnotaventa.getCantidad());
            row.createCell(4).setCellValue(itemnotaventa.getProducto().getPrecio());
            row.createCell(5).setCellValue(itemnotaventa.getSubtotal());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream entrada(Integer nroDoc, RepoNotaVenta repoNotaVenta, RepoItemnotaventa repoItemnotaventa) throws Exception {
        String[] columns = {"CODIGO", "DESCRIPCION", "UNIDAD","CANTIDAD","PRECIO UNITARIO","TOTAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Notaventa");
        Row row = sheet.createRow(8);

        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        notaventa notaventa = repoNotaVenta.findByNrodoc(nroDoc);
        List<itemnotaventa> itemnotaventaList = repoItemnotaventa.findByNotaventa(notaventa);
        int initRow = 9;
        for (itemnotaventa itemnotaventa : itemnotaventaList) {
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(itemnotaventa.getProducto().getCodigo());
            //row.createCell(1).setCellValue(itemnotaventa.getNotaventa().getDetalle());
            row.createCell(2).setCellValue(itemnotaventa.getProducto().getUnidad().getNombre());
            row.createCell(3).setCellValue(itemnotaventa.getCantidad());
            row.createCell(4).setCellValue(itemnotaventa.getProducto().getPrecio());
            row.createCell(5).setCellValue(itemnotaventa.getSubtotal());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream ordenCompra(Integer nroDocOrdenCompra, RepoOrdenCompra repoOrdenCompra, RepoItemCompra repoItemCompra) throws Exception {
        ordencompra ordencompra = repoOrdenCompra.findByNrodoc(nroDocOrdenCompra);
        List<itemcompra> itemcompraList = repoItemCompra.findByOrdencompra(ordencompra);

        String[] columns = {"ITEM", "COD PROV", "UNIDAD","CANTIDAD","DETALLE","COSTO U","COSTO TOTAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("OrdenCompra");
        this.cabeceraOrdenCompra(sheet,itemcompraList);
        Row row = sheet.createRow(8);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }

        int initRow = 9;
        int indice = 0;
        for (itemcompra itemcompra : itemcompraList) {
            indice++;
            row = sheet.createRow(initRow);
                row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemcompra.getOrdencompra().getProveedor().getNombre());
            row.createCell(2).setCellValue(itemcompra.getProducto().getUnidad().getNombre());
            row.createCell(3).setCellValue(itemcompra.getCantidad());
            row.createCell(4).setCellValue(itemcompra.getProducto().getDetalle());
            row.createCell(5).setCellValue(itemcompra.getProducto().getCosto());
            double costoTotal = itemcompra.getProducto().getCosto()*itemcompra.getCantidad();
            row.createCell(6).setCellValue(costoTotal);
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public void cabeceraOrdenCompra(Sheet sheet, List<itemcompra> itemcompraList){
        Row row = sheet.createRow(3);
        row.createCell(0).setCellValue("SEÑORES:");
        row.createCell(1).setCellValue(itemcompraList.get(0).getOrdencompra().getProveedor().getNombre());
        row.createCell(4).setCellValue("codigo:");
        row.createCell(5).setCellValue("P-SENT/OC/"+itemcompraList.get(0).getOrdencompra().getNrodoc());


        row = sheet.createRow(4);
        row.createCell(4).setCellValue("fecha:");
        row.createCell(5).setCellValue(itemcompraList.get(0).getOrdencompra().getFecha().toString());
        row = sheet.createRow(5);
        row.createCell(4).setCellValue("Ciudad prov:");
        row.createCell(5).setCellValue(itemcompraList.get(0).getOrdencompra().getCiudad());
        row.createCell(0).setCellValue("DE:");
        row.createCell(1).setCellValue("SYSTEM ENGINEENRING & NETWORK TECHNOLOGY");
        row = sheet.createRow(6);
        row.createCell(4).setCellValue("NRO COTIZ:");
        row.createCell(5).setCellValue(itemcompraList.get(0).getOrdencompra().getNrodoc());
        row.createCell(0).setCellValue("ORIGEN:");
        row.createCell(1).setCellValue(itemcompraList.get(0).getOrdencompra().getOper());

        row = sheet.createRow(7);
        row.createCell(0).setCellValue("OBSERV:");
        System.out.println(itemcompraList.get(0).getOrdencompra().getDetalle());
        row.createCell(1).setCellValue(itemcompraList.get(0).getOrdencompra().getDetalle());
    }
}
