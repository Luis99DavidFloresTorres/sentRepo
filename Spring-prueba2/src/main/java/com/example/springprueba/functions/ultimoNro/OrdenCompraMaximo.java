package com.example.springprueba.functions.ultimoNro;

import com.example.springprueba.model.Ultimonro;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoOrdenCompra;
import com.example.springprueba.repo.RepoUltimoNro;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class OrdenCompraMaximo implements INumerosMaximos{
    private RepoOrdenCompra repoOrdenCompra;
    private RepoUltimoNro repoUltimoNro;
    public OrdenCompraMaximo(RepoOrdenCompra repoOrdenCompra, RepoUltimoNro repoUltimoNro) {
        this.repoOrdenCompra = repoOrdenCompra;
        this.repoUltimoNro = repoUltimoNro;
    }

    @Override
    public Integer numeroRetornar(int cantidadRevisar) {
        List<ordencompra> ordencompraFind = repoOrdenCompra.findAll(PageRequest.of(0,cantidadRevisar,Sort.by(Sort.Direction.DESC,"nrodoc"))).getContent();
        System.out.println(ordencompraFind.size());
        System.out.println(ordencompraFind.get(0).getNrodoc());
        System.out.println(ordencompraFind.get(1).getNrodoc());
        System.out.println(ordencompraFind.get(2).getNrodoc());
        List<ordencompra> ordencompraList = new ArrayList<>(ordencompraFind);

        if(ordencompraList.size()!=0){
            Collections.reverse(ordencompraList);
        }
        int contador = 0;
        int documentoMaximo = 0;
        for (ordencompra ordencompra : ordencompraList) {
            int documento = ordencompra.getNrodoc();

            if (contador + 1 < cantidadRevisar) {
                contador++;
                System.out.println(documento);
                if ((documento + 1 != ordencompraList.get(contador).getNrodoc().intValue()) && (documento != ordencompraList.get(contador).getNrodoc().intValue())) {
                    return documento + 1;
                }
            }
            documentoMaximo = documento;
        }
        if(ordencompraList.size()==0){
            Ultimonro ultimoNro = this.repoUltimoNro.findById(8l).get();
            documentoMaximo = ultimoNro.getNrodoc();
        }
        return documentoMaximo + 1;
        //return 1;
    }
}
