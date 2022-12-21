package com.example.springprueba.controller.codificadores;
/*import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.codificadores.codigo;
import com.example.springprueba.repo.RepoCodigo;
import com.example.springprueba.responsesJson.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/codigo")
public class ControllerCodigo {
    private final RepoCodigo repoCodigo;
    public ControllerCodigo(RepoCodigo repoCodigo){
        this.repoCodigo = repoCodigo;
    }
    @GetMapping
    public ResponseEntity<List<codigo>> codigo(){
        List<codigo> codigoList = repoCodigo.findAll();
        return new ResponseEntity<>(codigoList, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> insertar(@RequestBody codigo codigo){
        codigo.setCodigo(codigo.getCodigo()+'-');
        LoginResponse loginResponse = new LoginResponse();
        repoCodigo.save(codigo);*/
       /* if((repoCodigo.findByCodigo(codigo.getCodigo())==null)){
            codigo codigo2 = new codigo();
            codigo2.setCodigo(codigo.getCodigo());
            codigo2.setNombre(codigo.getNombre());

            loginResponse.setRespuesta("si");
        }else{
            loginResponse.setRespuesta("no");
        }*/
     /*   return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
    @PostMapping("/returnIdProductoCodigo")
    public ResponseEntity<Integer> devolverID(@RequestBody LoginResponse nombreCodigo){
        codigo codigo = new codigo();
        codigo guardar = repoCodigo.save(codigo);
        return new ResponseEntity(guardar.getId(), HttpStatus.OK);
    }
    @GetMapping("/ById/{id}")
    public ResponseEntity<codigo> devolverID( @PathVariable("id") Long id){
        codigo codigo = repoCodigo.findById(id).orElseThrow(()->new ExceptionGeneral("error"));
        return new ResponseEntity(codigo, HttpStatus.OK);
    }
    @PostMapping( "/editar")
    public ResponseEntity<LoginResponse> editar(@RequestBody codigo codigo){
        System.out.println(codigo);
        codigo.setCodigo(codigo.getCodigo()+'-');
        LoginResponse loginResponse = new LoginResponse();
            repoCodigo.save(codigo);
            loginResponse.setRespuesta("si");
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
    @PostMapping("/eliminar")
    public void eliminar(@RequestBody codigo codigo){
        repoCodigo.delete(codigo);
    }
}*/
