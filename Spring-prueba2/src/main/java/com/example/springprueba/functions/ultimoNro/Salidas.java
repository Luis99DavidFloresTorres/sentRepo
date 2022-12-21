package com.example.springprueba.functions.ultimoNro;

import com.example.springprueba.model.Ultimonro;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoUltimoNro;
import com.example.springprueba.service.ServiceItemProducto;
import com.example.springprueba.service.ServiceTransproducto;
import org.springframework.stereotype.Service;

import javax.print.attribute.SetOfIntegerSyntax;
import java.util.Collections;
import java.util.List;
@Service
public class Salidas implements INumerosMaximos{
    private ServiceTransproducto serviceTransproducto;
    private RepoUltimoNro repoUltimoNro;
    public Salidas(ServiceTransproducto serviceTransproducto, RepoUltimoNro repoUltimoNro){
        this.serviceTransproducto=serviceTransproducto;
        this.repoUltimoNro = repoUltimoNro;
    }
    @Override
    public  Integer numeroRetornar(int cantidadRevisar) {
        List<transactionProduct> transactionProduct= serviceTransproducto.salidas(cantidadRevisar);
        System.out.println(transactionProduct.get(0).getNrodoc());
        Collections.reverse(transactionProduct);
        System.out.println(transactionProduct.get(0).getNrodoc());
        int contador = 0;
        int documentoMaximo=0;
        for (transactionProduct transactionproduct: transactionProduct){
            int documento= transactionproduct.getNrodoc();
            if(documento>10){
                if(contador+1<cantidadRevisar){
                    contador++;
                    if((documento+1 != transactionProduct.get(contador).getNrodoc().intValue())&& (documento!= transactionProduct.get(contador).getNrodoc().intValue())){
                        return documento+1;
                    }
                }
                documentoMaximo = documento;
            }
        }
        if(transactionProduct.size()==1){
            Ultimonro ultimoNro = this.repoUltimoNro.findById(5l).get();
            documentoMaximo = ultimoNro.getNrodoc();
        }
        return documentoMaximo+1;
    }
}
