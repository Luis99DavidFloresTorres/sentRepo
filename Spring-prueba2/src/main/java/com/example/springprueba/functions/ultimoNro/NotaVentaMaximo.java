package com.example.springprueba.functions.ultimoNro;

import com.example.springprueba.model.notaventa;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.service.ServiceNotaVenta;
import com.example.springprueba.service.ServiceTransproducto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class NotaVentaMaximo implements INumerosMaximos{
    private ServiceNotaVenta serviceNotaVenta;
    public NotaVentaMaximo(ServiceNotaVenta serviceNotaVenta){
        this.serviceNotaVenta=serviceNotaVenta;
    }

    @Override
    public Integer numeroRetornar(int cantidadRevisar) {
        List<notaventa> notaventaList= new ArrayList<>(serviceNotaVenta.ventasNroDoc(cantidadRevisar));
        Collections.reverse(notaventaList);
        int contador = 0;
        int documentoMaximo = 0;
        for (notaventa notaventaF: notaventaList){
            int documento= notaventaF.getNrodoc();
            if(contador+1<cantidadRevisar){
                contador++;
                if((documento+1 != notaventaList.get(contador).getNrodoc().intValue())&& (documento!= notaventaList.get(contador).getNrodoc().intValue())){
                   return documento+1;
                }
            }
            documentoMaximo = documento;
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
