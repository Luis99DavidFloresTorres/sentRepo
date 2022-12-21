package com.example.springprueba.controller;
import com.example.springprueba.functions.ProductsModules;
import com.example.springprueba.model.codificadores.unidades;
//import com.example.springprueba.model.codigoProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.repo.RepoProducto;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.FileSystemStorageService;
import com.example.springprueba.service.ServiceProducto;
import com.example.springprueba.service.codificadores.ServiceUnidad;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/producto")
public class ControllerProducto extends ControllerBase{
    private FileSystemStorageService fileSystemStorageService;
    private final ServiceProducto serviceProducto;
    private final ServiceUnidad serviceUnidad;
    private final ProductsModules productsModules;
    private final RepoProducto repoProducto;
    public ControllerProducto(ServiceProducto serviceProductop, ServiceUnidad ServiceUnidad, ProductsModules productsModules, FileSystemStorageService fileSystemStorageService1, RepoProducto repoProducto){
        this.serviceProducto = serviceProductop;
        serviceUnidad=ServiceUnidad;
        this.productsModules = productsModules;
        this.fileSystemStorageService=fileSystemStorageService1;
        this.repoProducto = repoProducto;
    }
//    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<producto>> getProductos(){
        String tipo ="PRODUCTO";
        List<producto> productoList = serviceProducto.findbySaldoProducto(tipo);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/clienteMostrar")
    public ResponseEntity<List<producto>> mostrarClienteProduct(){
        List<producto> productoList = serviceProducto.mostrarClienteProducto();
        productoList.forEach(producto -> {
            producto.setUrlPortada(this.buildUriString(producto.getRutaPortada()));
        });
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<producto>> getProductosFindAll(){
        List<producto> productoList = serviceProducto.findAllProductos();
        productoList.forEach(producto -> {
           /* if(Objects.isNull(producto.getCodigoProducto())){
                producto.setCodigo("no tiene");
                producto.setCodigoProducto(new codigoProducto());
            }else{
                producto.setCodigo(producto.getCodigoProducto().getCodigo());
            }*/
            producto.setUrlPortada(this.buildUriString(producto.getRutaPortada()));
        });
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/saldo")
    public ResponseEntity<List<producto>> getSaldoProductos(){
        String tipo ="PRODUCTO";
        List<producto> productoList = serviceProducto.findbySaldoProducto(tipo);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/nombre")
    public ResponseEntity<unidades> getUnidades(){
        unidades unidad = this.serviceUnidad.findbyName("METRO");
        return new ResponseEntity<>(unidad, HttpStatus.OK);
    }
    @GetMapping("/productoNombre")
    public ResponseEntity<List<producto>> getNombre(){
        List<producto> productoList = this.productsModules.filterProductosConMovimientos();
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/tipoProductoNombres")
    public ResponseEntity<List<producto>> getproductoPorTipo(){
        List<producto> productoList = this.repoProducto.findAllByTipo("PRODUCTO");
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<producto> getRubroId(@PathVariable("id") Long id){
        producto productoF = serviceProducto.findbyidProducto(id);
        productoF.setUrlPortada(this.buildUriString(productoF.getRutaPortada()));
        return new ResponseEntity<>(productoF, HttpStatus.OK);
    }
    @PostMapping(path = "/byName")
    public ResponseEntity<producto> getName(@RequestBody LoginResponse nombre){
        System.out.printf(nombre.getRespuesta());
        producto producto = repoProducto.findByNombre(nombre.getRespuesta());
        return new ResponseEntity<>(producto, HttpStatus.OK);
    }
    @PostMapping(value = "/add")
    public ResponseEntity<List<producto>> addProducto(@RequestBody producto productop) throws IOException {
        unidades unidad = serviceUnidad.findbyName(productop.getUnidadS());
        productop.setUnidad(unidad);
        productop.getCodigo();
        productop.getRutaPortada();
      //  System.out.println(productop.getCodigoProducto().getCodigo());
       // productop.setCodigo(productop.getCodigoProducto().getCodigo());
        producto productoG = serviceProducto.addProducto(productop);
        return new ResponseEntity(productoG, HttpStatus.CREATED);
    }
    @PostMapping(value = "/editar")
    public ResponseEntity<Integer> editarProducto(@RequestBody producto producto){
        unidades unidad = serviceUnidad.findbyName(producto.getUnidadS());
        producto.setUnidad(unidad);
        repoProducto.save(producto);
        return new ResponseEntity<>(1, HttpStatus.OK);
    }
    @PostMapping(value = "/returnId")
    public ResponseEntity<Integer> devolverId(){
        producto producto = new producto();
        producto save = serviceProducto.addProducto(producto);
        return new ResponseEntity(save.getId(), HttpStatus.OK);
    }
    @GetMapping(value = "/obtenerCodigos")
    public ResponseEntity<List<String>> allCodigos(){

        List<String> codigos = this.serviceProducto.filtrarCodigos();
        return new ResponseEntity(codigos, HttpStatus.OK);
    }
    @PostMapping(value = "/eliminar")
    public ResponseEntity<Integer> eliminarProducto(@RequestBody producto producto){
        Long id = producto.getId();
        Integer resultado = serviceProducto.eliminarProducto(id);
        return new ResponseEntity<>(resultado, HttpStatus.OK);
    }
}
