package com.example.springprueba.functions.facades;
import com.example.springprueba.functions.factories.FactoryNroMaximoDocumentos;
import com.example.springprueba.functions.ultimoNro.INumerosMaximos;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.model.proyecto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoNotaVenta;
import com.example.springprueba.repo.RepoOrdenCompra;
import com.example.springprueba.repo.RepoProyecto;
import com.example.springprueba.repo.RepoTransproducto;
import org.springframework.stereotype.Service;

@Service
public class FacadeNroDocMaximo {
    private final FactoryNroMaximoDocumentos factoryNroMaximoDocumentos;
    private RepoNotaVenta repoNotaVenta;
    private RepoTransproducto transproductoRepo;
    private RepoOrdenCompra repoOrdenCompra;
    private RepoProyecto repoProyecto;
    public FacadeNroDocMaximo(FactoryNroMaximoDocumentos factoryNroMaximoDocumentos, RepoTransproducto repoTransproducto, RepoOrdenCompra repoOrdenCompra, RepoNotaVenta repoNotaVenta, RepoProyecto repoProyecto){
        this.factoryNroMaximoDocumentos =factoryNroMaximoDocumentos;
        this.transproductoRepo = repoTransproducto;
        this.repoOrdenCompra = repoOrdenCompra;
        this.repoNotaVenta = repoNotaVenta;
        this.repoProyecto = repoProyecto;
    }
    public Integer nroMaximoSalidas(){
        INumerosMaximos salidas = this.factoryNroMaximoDocumentos.nombreDocumento("salidas");
        Integer numero = salidas.numeroRetornar(30);
        transactionProduct transproct = new transactionProduct();
        transproct.setNrodoc(numero);
        transproct.setOper(321);
        transproductoRepo.save(transproct);
        return numero;
    }
    public Integer nroMaximoEntradas(){
        INumerosMaximos entradas = this.factoryNroMaximoDocumentos.nombreDocumento("entradas");
        Integer numero = entradas.numeroRetornar(30);
        transactionProduct transproct = new transactionProduct();
        transproct.setNrodoc(numero);
        transproct.setOper(311);
        transproductoRepo.save(transproct);
        return numero;
    }
    public Integer nroMaximoOrdenCompra(){
        INumerosMaximos ordencompra = this.factoryNroMaximoDocumentos.nombreDocumento("ordencompra");
        Integer numero = ordencompra.numeroRetornar(30);
        ordencompra ordenCompra = new ordencompra();
        ordenCompra.setNrodoc(numero);
        ordenCompra.setOper(353);
        repoOrdenCompra.save(ordenCompra);

        return numero;
    }
    public Integer nroMaximoNotaVenta(){
        INumerosMaximos notaventa = this.factoryNroMaximoDocumentos.nombreDocumento("notaventa");
        notaventa nota = new notaventa();
        Integer numero =  notaventa.numeroRetornar(30);
        nota.setNrodoc(numero);
        nota.setEstado('t');
        repoNotaVenta.save(nota);
        return numero;
    }
    public Integer nroMaximoProyecto(){
        INumerosMaximos notaventa = this.factoryNroMaximoDocumentos.nombreDocumento("proyecto");
        proyecto proyecto = new proyecto();
        Integer numero =  notaventa.numeroRetornar(30);
        proyecto.setNroprj(numero);
        repoProyecto.save(proyecto);
        return numero;
    }
    public void eliminarNrodocumento(Integer nroDocumento, String nombreDocumento, Integer oper){
        if((nombreDocumento.equals("salida"))&&(oper>320)){
            transproductoRepo.deleteByNrodocAndOper(nroDocumento,oper);
        }
       if((nombreDocumento.equals("entrada"))&&(oper<320)){
           transproductoRepo.deleteByNrodocAndOper(nroDocumento,oper);
       }
       if(nombreDocumento.equals("ordencompra")){
           repoOrdenCompra.deleteByNrodoc(nroDocumento);
       }
        if(nombreDocumento.equals("notaventa")){
            repoNotaVenta.deleteByNrodoc(nroDocumento);
        }
        if(nombreDocumento.equals("proyecto")){
            repoProyecto.deleteByNroprj(nroDocumento);
        }
    }

}
