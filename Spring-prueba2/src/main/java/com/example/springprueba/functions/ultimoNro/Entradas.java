package com.example.springprueba.functions.ultimoNro;

import com.example.springprueba.model.Ultimonro;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoUltimoNro;
import com.example.springprueba.service.ServiceTransproducto;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class Entradas implements INumerosMaximos{
    private RepoUltimoNro repoUltimoNro;
    private ServiceTransproducto serviceTransproducto;
    public Entradas(ServiceTransproducto serviceTransproducto, RepoUltimoNro repoUltimoNro){
        this.serviceTransproducto=serviceTransproducto;
        this.repoUltimoNro = repoUltimoNro;
    }
    @Override
    public  Integer numeroRetornar(int cantidadRevisar) {
        List<transactionProduct> transactionProduct= serviceTransproducto.entradas(cantidadRevisar);

        Collections.reverse(transactionProduct);
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
            Ultimonro ultimoNro = this.repoUltimoNro.findById(4l).get();
            documentoMaximo = ultimoNro.getNrodoc();
        }

        return documentoMaximo+1;
       /* transactionProduct.forEach(data->{

            Integer documento = data.getNrodoc();

            System.out.println(data.getNrodoc());
            System.out.println(data.getFecha());
            System.out.println(data.getDetalle());
            System.out.println(data.getNotaventa());
        });*/
    }
}
