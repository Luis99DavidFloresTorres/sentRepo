package com.example.springprueba.repo;

import com.example.springprueba.model.itemdescargo;
import com.example.springprueba.model.notadescargo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoItemDescargo extends JpaRepository<itemdescargo, Long > {
    List<itemdescargo> findByNotadescargo(notadescargo notadescargo);
}
