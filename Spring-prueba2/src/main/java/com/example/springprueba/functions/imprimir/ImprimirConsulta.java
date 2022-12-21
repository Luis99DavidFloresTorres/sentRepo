package com.example.springprueba.functions.imprimir;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.itemcompra;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoItemCompra;
import com.example.springprueba.repo.RepoOrdenCompra;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Component
public class ImprimirConsulta {

    public ByteArrayInputStream primeros1000PorFecha(List<itemProducto> itemProductoList) throws Exception {

        String[] columns = {"INDICE","OBSERVACIONES", "FECHA", "CODIGO","DESCRIPCION","CANTIDAD","TIPO TRANSACCION"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Consulta");
        Row row = sheet.createRow(7);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        int initRow = 8;
        int indice = 0;
        for (itemProducto itemProducto : itemProductoList) {
            indice++;
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemProducto.getObservaciones());
            row.createCell(2).setCellValue(itemProducto.getFechaact().toString());
            row.createCell(3).setCellValue(itemProducto.getCodigo());
            row.createCell(4).setCellValue(itemProducto.getNombre());
            row.createCell(5).setCellValue(itemProducto.getCantidad());
            int operacion = itemProducto.getOpe();
            row.createCell(6).setCellValue(this.operacion(operacion));
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream ingresos(List<itemProducto> itemProductoList) throws Exception {

        String[] columns = {"INDICE","FECHA", "NÚMERO DE DOCUMENTO", "TIPO DE TRANSACCIÓN","PROVEEDOR","OBSERVACIONES","INGRESOS","SERIAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("MAYOR INGRESOS");
        Row row = sheet.createRow(7);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        int initRow = 8;
        int indice = 0;
        for (itemProducto itemProducto : itemProductoList) {
            indice++;
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemProducto.getFechaact().toString());
            row.createCell(2).setCellValue(itemProducto.getNrodoc());
            int operacion = itemProducto.getOpe();
            row.createCell(3).setCellValue(this.operacion(operacion));
            row.createCell(4).setCellValue(itemProducto.getProductoNombre());
            row.createCell(5).setCellValue(itemProducto.getObservaciones());

            row.createCell(6).setCellValue(itemProducto.getCantidad());
            row.createCell(7).setCellValue(itemProducto.getSerial());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream salidas(List<itemProducto> itemProductoList) throws Exception {

        String[] columns = {"INDICE","FECHA", "NÚMERO DE DOCUMENTO", "TIPO DE TRANSACCIÓN","CLIENTE","OBSERVACIONES","SALIDAS","SERIAL"};
        Workbook workbook = new HSSFWorkbook();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("MAYOR SALIDAS");
        Row row = sheet.createRow(7);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        int initRow = 8;
        int indice = 0;
        for (itemProducto itemProducto : itemProductoList) {
            indice++;
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemProducto.getFechaact().toString());
            row.createCell(2).setCellValue(itemProducto.getNrodoc());
            int operacion = itemProducto.getOpe();
            row.createCell(3).setCellValue(this.operacion(operacion));
            row.createCell(4).setCellValue(itemProducto.getClienteNombre());
            row.createCell(5).setCellValue(itemProducto.getObservaciones());
            row.createCell(6).setCellValue(itemProducto.getSalidas());
            row.createCell(7).setCellValue(itemProducto.getSerial());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream kardex(List<itemProducto> itemProductoList) throws Exception {
        String[] columns = {"INDICE","CODIGO", "FECHA", "NÚMERO DOCUMENTO","TIPO TRANSASCCIÓN","OBSERVACIONES","SERIAL","SALDO INICIAL","INGRESOS","SALIDAS","SALDO"};
        Workbook workbook = new HSSFWorkbook();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        Sheet sheet = workbook.createSheet("KARDEX");
        Row row = sheet.createRow(7);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        int initRow = 8;
        int indice = 0;
        for (itemProducto itemProducto : itemProductoList) {
            indice++;
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemProducto.getCodigo());
            row.createCell(2).setCellValue(itemProducto.getFechaact().toString());
            row.createCell(3).setCellValue(itemProducto.getNrodoc());
            int operacion = itemProducto.getOpe();
            row.createCell(4).setCellValue(this.operacion(operacion));
            row.createCell(5).setCellValue(itemProducto.getObservaciones());
            row.createCell(6).setCellValue(itemProducto.getSerial());
            row.createCell(7).setCellValue(itemProducto.getInvinicial());
            row.createCell(8).setCellValue(itemProducto.getIngresos());
            row.createCell(9).setCellValue(itemProducto.getSalidas());
            row.createCell(10).setCellValue(itemProducto.getSaldo());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public ByteArrayInputStream productoPeriodo(List<itemProducto> itemProductoList) throws Exception {
        String[] columns = {"INDICE","CODIGO", "DESCRIPCION", "UNIDAD","SALDO INICIAL","INGRESOS","SALIDAS","SALDO"};
        Workbook workbook = new HSSFWorkbook();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        Sheet sheet = workbook.createSheet("PRODUCTO PERIODO");
        Row row = sheet.createRow(7);
        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }
        int initRow = 8;
        int indice = 0;
        for (itemProducto itemProducto : itemProductoList) {
            indice++;
            System.out.println(itemProducto);
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(indice);
            row.createCell(1).setCellValue(itemProducto.getCodigo());
            row.createCell(2).setCellValue(itemProducto.getProducto().getNombre());
            row.createCell(3).setCellValue(itemProducto.getUnidad());
            row.createCell(4).setCellValue(itemProducto.getInvinicial());
            row.createCell(5).setCellValue(itemProducto.getIngresos());
            row.createCell(6).setCellValue(itemProducto.getSalidas());
            row.createCell(7).setCellValue(itemProducto.getSaldo());
            initRow++;
        }
        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
    public String operacion(int value) {
        switch (value) {
            case 311: {
                return value + ":Compra";
            }
            case 312: {
                return value + ":Importacion";

            }
            case 314: {
                return value + ":Cambio";

            }
            case 315: {
                return value + ":Devolucion Proy";

            }
            case 316: {
                return value + ":Devolucion";
            }
            case 317: {
                return value + ":Donacion";
            }
            case 318: {
                return value + ":Traspaso";
            }
            case 319: {
                return value + ":Alta Aud";
            }
            case 321: {
                return value + ":Venta";
            }
            case 322: {
                return value + ":Prestamo";
            }
            case 324: {
                return value + ":Cambio";
            }
            case 325: {
                return value + ":Proyecto";
            }
            case 326: {
                return value + ":Devolucion";
            }
            case 327: {
                return value + ":Donacion";
            }
            case 328: {
                return value + ":Traspaso";
            }
            case 329: {
                return value + ":Baja Aud";
            }
        }
        return "No existe operación";
    }
}
