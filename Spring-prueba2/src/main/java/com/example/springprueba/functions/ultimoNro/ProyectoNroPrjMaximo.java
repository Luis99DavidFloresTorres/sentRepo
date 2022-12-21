package com.example.springprueba.functions.ultimoNro;

import com.example.springprueba.model.ordencompra;
import com.example.springprueba.model.proyecto;
import com.example.springprueba.repo.RepoOrdenCompra;
import com.example.springprueba.repo.RepoProyecto;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class ProyectoNroPrjMaximo implements INumerosMaximos{
    private RepoProyecto repoProyecto;

    public ProyectoNroPrjMaximo(RepoProyecto repoProyecto) {
        this.repoProyecto = repoProyecto;
    }

    @Override
    public Integer numeroRetornar(int cantidadRevisar) {
        List<proyecto> proyectoList = new ArrayList<>(repoProyecto.findAll(PageRequest.of(0,cantidadRevisar,Sort.by(Sort.Direction.DESC,"nrodoc"))).getContent());
        Collections.reverse(proyectoList);
        int contador = 0;
        int documentoMaximo = 0;
        for (proyecto proyecto : proyectoList) {
            int documento = proyecto.getNroprj();
            if (contador + 1 < cantidadRevisar) {
                contador++;
                if ((documento + 1 != proyectoList.get(contador).getNroprj().intValue()) && (documento != proyectoList.get(contador).getNroprj().intValue())) {
                    return documento + 1;
                }
            }
            documentoMaximo = documento;
        }
        return documentoMaximo + 1;
        //return 1;
    }
}
